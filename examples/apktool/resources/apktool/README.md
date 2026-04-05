# APK Reverse Toolkit Runtime Resources

- Runtime jars:
  - `apktool-runtime-android.jar`
  - `android-framework.jar`
  - `jadx-runtime-android.jar`
  - `apk-reverse-helper-runtime-android.jar`
- Load mode: `ToolPkg.readResource(...)` + `Java.loadJar(..., { childFirstPrefixes: [...] })`
- Runtime policy: no CLI entrypoints, no terminal subprocesses, no `runJar`; JS only coordinates parameters, resource extraction, and result shaping
- Packaging rule: every runtime jar must be an Android-loadable dex-jar containing `classes.dex`
- Expected layers:
  - `apktool-runtime-android.jar` carries `brut.androlib.*`
  - `jadx-runtime-android.jar` carries `jadx.api.*`
  - `apk-reverse-helper-runtime-android.jar` carries the stable helper facade and native-analysis helpers
- Resource generation is handled by `examples/apktool/build_runtime_android_resources.ps1`
- If `jadx-runtime-android.jar` or `apk-reverse-helper-runtime-android.jar` are missing, related tools should fail clearly instead of falling back to terminal execution
