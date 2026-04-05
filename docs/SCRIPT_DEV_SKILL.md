---
name: SandboxPackage_DEV
description: 用于 Operit Sandbox Package 开发。
---

# SandboxPackage_DEV

## 第一部分：安装与更新

这个 skill 的原则只有一条：先把资料下载到本地 skill 目录，再按需检索；不要直接整份读取远程 guide，也不要直接整份读取本地大文件。

安装完成后，本地目录应当长这样：

```text
skills/SandboxPackage_DEV/
  SKILL.md
  references/
    SCRIPT_DEV_GUIDE.md
  types/
    index.d.ts
    core.d.ts
    ...
```

首次安装时，按下面顺序做：

1. 先创建 `skills/SandboxPackage_DEV/`、`skills/SandboxPackage_DEV/references/`、`skills/SandboxPackage_DEV/types/`
2. 用 `download_file` 下载 `https://cdn.jsdelivr.net/gh/AAswordman/Operit@main/docs/SCRIPT_DEV_SKILL.md`，保存为 `skills/SandboxPackage_DEV/SKILL.md`
3. 用 `download_file` 下载 `https://cdn.jsdelivr.net/gh/AAswordman/Operit@main/docs/SCRIPT_DEV_GUIDE.md`，保存为 `skills/SandboxPackage_DEV/references/SCRIPT_DEV_GUIDE.md`
4. 用 `download_file` 逐个下载 `types` 文件，分别保存到 `skills/SandboxPackage_DEV/types/<文件名>`

类型文件名如下：

`android.d.ts` `chat.d.ts` `compose-dsl.d.ts` `compose-dsl.material3.generated.d.ts` `core.d.ts` `cryptojs.d.ts` `ffmpeg.d.ts` `files.d.ts` `index.d.ts` `java-bridge.d.ts` `jimp.d.ts` `memory.d.ts` `network.d.ts` `okhttp.d.ts` `pako.d.ts` `quickjs-runtime.d.ts` `results.d.ts` `software_settings.d.ts` `system.d.ts` `tasker.d.ts` `tool-types.d.ts` `toolpkg.d.ts` `ui.d.ts` `workflow.d.ts`

`types` 的下载基础地址是：

`https://cdn.jsdelivr.net/gh/AAswordman/Operit@main/examples/types/`

也就是说，实际下载时要按“基础地址 + 文件名”逐个下载。例如：

- `https://cdn.jsdelivr.net/gh/AAswordman/Operit@main/examples/types/index.d.ts` -> `skills/SandboxPackage_DEV/types/index.d.ts`
- `https://cdn.jsdelivr.net/gh/AAswordman/Operit@main/examples/types/core.d.ts` -> `skills/SandboxPackage_DEV/types/core.d.ts`

不要把 `examples/types/` 当成一个可直接下载的文件夹地址去读，它不是单文件。

更新时按下面规则处理：

1. 每次正式开始新的 Sandbox Package 开发任务前，优先重新下载一次 `types/`
2. 如果怀疑工作流、文档说明或目录结构已经变化，再重新下载 `SKILL.md` 和 `SCRIPT_DEV_GUIDE.md`
3. 如果本地 skill 目录缺文件、文件名不对、或者内容明显陈旧，就按首次安装流程补齐或覆盖

下载完以后，查资料时默认这样做：

1. 先用 `grep_code` 在 `skills/SandboxPackage_DEV/` 里搜关键字
2. 再用 `read_file_part` 读取命中的具体片段
3. 只有片段不够时才扩大范围

不要默认直接读取整个 `SCRIPT_DEV_GUIDE.md` 或整个 `types` 文件，原因是：

- 它们内容比较大，容易把上下文撑爆
- 先下载再检索的方式更稳
- 本地 skill 可以长期复用，但 `types` 最容易过时，所以需要高频更新

## 第二部分：Sandbox Package 撰写

撰写 Sandbox Package 时，不要凭记忆硬写，先查本地 skill 资料。

推荐的查阅顺序：

1. 先查 `types/index.d.ts`，确认全局入口和主要能力
2. 再查 `types/core.d.ts`、`types/java-bridge.d.ts`，确认运行时与桥接接口
3. 查 `types/results.d.ts`，确认常见返回结构
4. 查 `types/software_settings.d.ts`、`types/toolpkg.d.ts`，确认设置类与包相关类型
5. 需要脚本格式、元数据、示例写法时，再查 `references/SCRIPT_DEV_GUIDE.md`

推荐的撰写流程：

1. 先判断这次要写的是普通 `.js` Sandbox Package，还是 `ToolPkg`
2. 用 `grep_code` 在 `SCRIPT_DEV_GUIDE.md` 里搜索 `METADATA`、`tool`、`execute`、`package` 等关键字
3. 用 `read_file_part` 读取相关段落，确认脚本结构与元数据写法
4. 用 `types/` 里的定义约束参数、返回值、可调用能力和结果结构
5. 开始写包时，优先遵循最新本地 types，不要依赖旧记忆

如果写到一半发现本地类型和实际需求对不上，先不要硬猜，先重新下载一次 `types/`，再继续写。
