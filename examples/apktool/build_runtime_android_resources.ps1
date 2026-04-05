$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

$repoRoot = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
$exampleRoot = Join-Path $repoRoot "examples\apktool"
$tempRoot = Join-Path $repoRoot "temp\apk-reverse-runtime"
$resourceDir = Join-Path $exampleRoot "resources\apktool"
$apktoolPatchSourceRoot = Join-Path $exampleRoot "runtime_patch_src"
$helperProjectDir = Join-Path $exampleRoot "runtime_helper"
$localPropertiesPath = Join-Path $repoRoot "local.properties"
$javaBinDir = "D:\Program Files\Zulu\zulu-21\bin"
$gradleWrapperPath = Join-Path $repoRoot "gradlew.bat"
$javacPath = Join-Path $javaBinDir "javac.exe"
$jarToolPath = Join-Path $javaBinDir "jar.exe"
$javaPath = Join-Path $javaBinDir "java.exe"
$r8JarPath = Join-Path $tempRoot "r8.jar"
$apktoolCliJarPath = Join-Path $tempRoot "apktool-cli-3.0.1.jar"
$patchedApktoolCliJarPath = Join-Path $tempRoot "apktool-cli-3.0.1-patched.jar"
$jadxCoreJarPath = Join-Path $tempRoot "jadx-1.5.2-all.jar"
$jadxCoreJvmJarPath = Join-Path $tempRoot "jadx-1.5.2-jvm.jar"
$apktoolCliUrl = "https://repo1.maven.org/maven2/org/apktool/apktool-cli/3.0.1/apktool-cli-3.0.1.jar"
$jadxCoreUrl = "https://github.com/skylot/jadx/releases/download/v1.5.2/jadx-1.5.2-all.jar"
$r8Url = "https://dl.google.com/dl/android/maven2/com/android/tools/r8/9.0.32/r8-9.0.32.jar"
$apktoolRuntimeJarPath = Join-Path $resourceDir "apktool-runtime-android.jar"
$jadxRuntimeJarPath = Join-Path $resourceDir "jadx-runtime-android.jar"
$helperRuntimeJarPath = Join-Path $resourceDir "apk-reverse-helper-runtime-android.jar"

function Require-File([string] $path) {
    if (-not (Test-Path $path -PathType Leaf)) {
        throw "Required file not found: $path"
    }
}

function Ensure-CleanDirectory([string] $path) {
    if (Test-Path $path) {
        Remove-Item -Recurse -Force $path
    }
    New-Item -ItemType Directory -Path $path | Out-Null
}

function Ensure-Download([string] $url, [string] $path) {
    if (-not (Test-Path $path -PathType Leaf)) {
        Invoke-WebRequest -UseBasicParsing $url -OutFile $path
    }
}

function Find-AndroidJar {
    if (Test-Path $localPropertiesPath -PathType Leaf) {
        $sdkDirLine = Get-Content $localPropertiesPath | Where-Object { $_ -like 'sdk.dir=*' } | Select-Object -First 1
        if ($sdkDirLine) {
            $sdkDir = $sdkDirLine.Substring('sdk.dir='.Length).Replace('\:', ':').Replace('\\', '\')
            $platformsDir = Join-Path $sdkDir "platforms"
            if (Test-Path $platformsDir -PathType Container) {
                $androidJar = Get-ChildItem $platformsDir -Recurse -Filter android.jar -ErrorAction SilentlyContinue |
                    Sort-Object FullName -Descending |
                    Select-Object -First 1 -ExpandProperty FullName
                if ($androidJar) {
                    return $androidJar
                }
            }
        }
    }

    $androidJar = Get-ChildItem "$env:USERPROFILE\.gradle\caches" -Recurse -Filter android.jar -ErrorAction SilentlyContinue |
        Select-Object -First 1 -ExpandProperty FullName
    if (-not $androidJar) {
        throw "android.jar not found in local.properties sdk.dir or Gradle caches"
    }
    return $androidJar
}

function Ensure-LocalArtifact([string[]] $candidatePaths, [string] $targetPath, [string] $downloadUrl) {
    if (Test-Path $targetPath -PathType Leaf) {
        return
    }
    foreach ($candidate in $candidatePaths) {
        if ($candidate -and (Test-Path $candidate -PathType Leaf)) {
            Copy-Item $candidate $targetPath -Force
            return
        }
    }
    Ensure-Download $downloadUrl $targetPath
}

function New-ClassOnlyJarFromJar([string] $inputJarPath, [string] $outputJarPath) {
    Add-Type -AssemblyName System.IO.Compression
    Add-Type -AssemblyName System.IO.Compression.FileSystem
    if (Test-Path $outputJarPath -PathType Leaf) {
        Remove-Item $outputJarPath -Force
    }
    $inputStream = [System.IO.File]::OpenRead($inputJarPath)
    $outputStream = [System.IO.File]::Create($outputJarPath)
    $inputZip = New-Object System.IO.Compression.ZipArchive($inputStream, [System.IO.Compression.ZipArchiveMode]::Read, $false)
    $outputZip = New-Object System.IO.Compression.ZipArchive($outputStream, [System.IO.Compression.ZipArchiveMode]::Create, $false)
    try {
        foreach ($entry in $inputZip.Entries) {
            $name = $entry.FullName
            if ($name -match '(^|/).+\.dex$') {
                continue
            }
            if ($name -like 'META-INF/*') {
                continue
            }
            $newEntry = $outputZip.CreateEntry($name, [System.IO.Compression.CompressionLevel]::Optimal)
            if ($name.EndsWith('/')) {
                continue
            }
            $source = $entry.Open()
            $target = $newEntry.Open()
            try {
                $source.CopyTo($target)
            } finally {
                $target.Dispose()
                $source.Dispose()
            }
        }
    } finally {
        $outputZip.Dispose()
        $inputZip.Dispose()
        $outputStream.Dispose()
        $inputStream.Dispose()
    }
}

function Copy-NonClassResourcesFromJar([string] $inputJarPath, [string] $outputDir) {
    Add-Type -AssemblyName System.IO.Compression
    Add-Type -AssemblyName System.IO.Compression.FileSystem
    $inputStream = [System.IO.File]::OpenRead($inputJarPath)
    $inputZip = New-Object System.IO.Compression.ZipArchive($inputStream, [System.IO.Compression.ZipArchiveMode]::Read, $false)
    try {
        foreach ($entry in $inputZip.Entries) {
            $name = $entry.FullName
            if (-not $name -or $name.EndsWith('/')) {
                continue
            }
            if ($name -match '(^|/).+\.dex$') {
                continue
            }
            if ($name -match '(^|/).+\.class$') {
                continue
            }
            if ($name -match '^META-INF/[^/]+\.(SF|DSA|RSA|EC)$') {
                continue
            }
            $targetPath = Join-Path $outputDir ($name -replace '/', '\')
            $targetParent = Split-Path -Parent $targetPath
            if ($targetParent -and -not (Test-Path $targetParent)) {
                New-Item -ItemType Directory -Path $targetParent -Force | Out-Null
            }
            $source = $entry.Open()
            $target = [System.IO.File]::Create($targetPath)
            try {
                $source.CopyTo($target)
            } finally {
                $target.Dispose()
                $source.Dispose()
            }
        }
    } finally {
        $inputZip.Dispose()
        $inputStream.Dispose()
    }
}

function New-DexJarFromInputJar(
    [string] $inputJarPath,
    [string] $outputJarPath,
    [string] $androidJarPath,
    [string[]] $classpathJars = @()
) {
    $workRoot = Join-Path $tempRoot ([IO.Path]::GetFileNameWithoutExtension($outputJarPath))
    $d8OutputDir = Join-Path $workRoot "d8-output"
    $runtimeWorkDir = Join-Path $workRoot "runtime-jar"
    Ensure-CleanDirectory $workRoot
    Ensure-CleanDirectory $d8OutputDir
    Ensure-CleanDirectory $runtimeWorkDir

    $d8Args = @(
        "-cp", $r8JarPath,
        "com.android.tools.r8.D8",
        "--release",
        "--min-api", "26",
        "--output", $d8OutputDir,
        "--lib", $androidJarPath
    )
    foreach ($classpathJar in $classpathJars) {
        $d8Args += @("--classpath", $classpathJar)
    }
    $d8Args += $inputJarPath

    & $javaPath @d8Args

    $dexFiles = Get-ChildItem $d8OutputDir -Filter "classes*.dex" -File | Sort-Object Name
    if (-not $dexFiles) {
        throw "No classes*.dex produced by D8 for $inputJarPath"
    }
    foreach ($dexFile in $dexFiles) {
        Copy-Item $dexFile.FullName (Join-Path $runtimeWorkDir $dexFile.Name)
    }
    Copy-NonClassResourcesFromJar -inputJarPath $inputJarPath -outputDir $runtimeWorkDir
    if (Test-Path $outputJarPath -PathType Leaf) {
        Remove-Item $outputJarPath -Force
    }
    Push-Location $runtimeWorkDir
    try {
        & $jarToolPath cf $outputJarPath .
    } finally {
        Pop-Location
    }
}

function Build-ApktoolRuntime([string] $androidJarPath) {
    $compileDir = Join-Path $tempRoot "apktool-compiled"
    Ensure-CleanDirectory $compileDir
    Copy-Item $apktoolCliJarPath $patchedApktoolCliJarPath -Force

    & $javacPath `
        -encoding UTF-8 `
        -source 8 `
        -target 8 `
        -cp "$apktoolCliJarPath;$androidJarPath" `
        -d $compileDir `
        (Join-Path $apktoolPatchSourceRoot "brut\androlib\res\decoder\ResNinePatchStreamDecoder.java")

    Push-Location $compileDir
    try {
        & $jarToolPath uf $patchedApktoolCliJarPath "brut/androlib/res/decoder/ResNinePatchStreamDecoder.class"
    } finally {
        Pop-Location
    }

    New-DexJarFromInputJar `
        -inputJarPath $patchedApktoolCliJarPath `
        -outputJarPath $apktoolRuntimeJarPath `
        -androidJarPath $androidJarPath `
        -classpathJars @($patchedApktoolCliJarPath)
}

function Build-JadxRuntime([string] $androidJarPath) {
    New-ClassOnlyJarFromJar $jadxCoreJarPath $jadxCoreJvmJarPath
    New-DexJarFromInputJar `
        -inputJarPath $jadxCoreJvmJarPath `
        -outputJarPath $jadxRuntimeJarPath `
        -androidJarPath $androidJarPath `
        -classpathJars @($jadxCoreJvmJarPath)
}

function Build-HelperRuntime([string] $androidJarPath) {
    if (-not (Test-Path $helperProjectDir -PathType Container)) {
        throw "Helper runtime Gradle project not found: $helperProjectDir"
    }
    Require-File $gradleWrapperPath

    $helperJvmJarPath = Join-Path $helperProjectDir "build\libs\apk-reverse-helper-runtime-jvm.jar"
    if (Test-Path $helperJvmJarPath -PathType Leaf) {
        Remove-Item $helperJvmJarPath -Force
    }

    & $gradleWrapperPath -p $helperProjectDir runtimeFatJar --no-daemon
    Require-File $helperJvmJarPath

    New-DexJarFromInputJar `
        -inputJarPath $helperJvmJarPath `
        -outputJarPath $helperRuntimeJarPath `
        -androidJarPath $androidJarPath `
        -classpathJars @($helperJvmJarPath)
}

Require-File $gradleWrapperPath
Require-File $javacPath
Require-File $jarToolPath
Require-File $javaPath

New-Item -ItemType Directory -Path $tempRoot -Force | Out-Null
New-Item -ItemType Directory -Path $resourceDir -Force | Out-Null
Ensure-LocalArtifact @(
    (Join-Path $repoRoot "temp\apktool-cli-3.0.1.jar"),
    (Join-Path $repoRoot "temp\apktool-runtime-patch\apktool-cli-3.0.1.jar")
) $apktoolCliJarPath $apktoolCliUrl
Ensure-LocalArtifact @(
    (Join-Path $repoRoot "temp\jadx\jadx-bin\lib\jadx-1.5.2-all.jar")
) $jadxCoreJarPath $jadxCoreUrl
Ensure-LocalArtifact @(
    (Join-Path $repoRoot "temp\apktool-runtime-patch\r8.jar")
) $r8JarPath $r8Url

$androidJarPath = Find-AndroidJar

Build-ApktoolRuntime -androidJarPath $androidJarPath
Build-JadxRuntime -androidJarPath $androidJarPath
Build-HelperRuntime -androidJarPath $androidJarPath

Get-Item $apktoolRuntimeJarPath, $jadxRuntimeJarPath, $helperRuntimeJarPath |
    Select-Object FullName, Length, LastWriteTime
