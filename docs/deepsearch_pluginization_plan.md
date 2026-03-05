# DeepSearch 插件化改造计划（对齐版）

## 背景与问题
当前实现中，深度搜索是否启用（`isDeepSearchEnabled`）和是否接管消息，仍由 `AIMessageManager` 直接判断；`plan` 的渲染入口也存在硬编码路径，插件化边界不够清晰。

本计划目标是：
1. `AIMessageManager` 不再判断深度搜索开关与命中条件，只调用 hook。
2. `plan`（含 XML/流式计划块）渲染走注册机制。
3. 深度搜索相关实现统一放入 `plugins/deepsearching`。

## 目标范围
- 仅改造深度搜索（DeepSearch）链路。
- 仅做插件化与注册化，不新增业务功能。
- 未发布版本，允许彻底迁移并清理旧实现。

## 非目标
- 不引入兼容旧路径的回退逻辑。
- 不改动与深度搜索无关的工具/模型/记忆功能。

## 目录与模块规划
新增并固定为以下结构：
- `app/src/main/java/com/ai/assistance/operit/plugins/deepsearching/`
  - `DeepSearchPluginRegistry.kt`
  - `PlanModeManager.kt`
  - `TaskExecutor.kt`
  - `PlanParser.kt`
  - `PlanModels.kt`
  - `PlanExecutionRenderer.kt`

## 架构方案

### 1) 消息处理 hook 化
由插件注册表提供统一 hook，例如：
- `tryHandleMessage(...)` / `buildExecutionIfMatched(...)`

职责下沉到插件：
- 读取开关（原 `enableAiPlanningFlow`）
- 判断消息是否命中深度搜索
- 构建并返回执行流（含 `PlanModeManager`）

`AIMessageManager` 仅做：
- 调用 hook
- 若插件接管则透传流并维护生命周期
- 未接管则走普通发送逻辑

### 2) 菜单选项注册化
由 `DeepSearchPluginRegistry` 提供菜单定义（title/desc/state/toggle）。
- `ClassicChatSettingsBar` 与 `AgentChatInputSection` 不再硬编码“深度搜索开关”条目。
- 菜单渲染改为遍历注册项。

### 3) Plan 渲染注册化
把 `PlanExecutionRenderer` 放到插件目录，并通过注册表暴露渲染入口：
- UI 渲染层（如 `CanvasMarkdownNodeRenderer`）只调用 registry，不直接绑定具体渲染器实现。
- `PLAN_EXECUTION`（含 `<plan>` / `<graph>` / `<update>` 流）走插件渲染实现。

## 具体改造步骤
1. 在 `plugins/deepsearching` 建立统一插件注册表接口。
2. 将深度搜索核心类全部迁入插件目录并改包名。
3. 将“开关判断 + 命中判断 + 执行流构建”迁移到插件 hook。
4. `AIMessageManager` 删除 `isDeepSearchEnabled` 直接判断逻辑，改为调用 hook。
5. 菜单（Classic/Agent）改为读取 registry 的深度搜索菜单项。
6. `PLAN_EXECUTION` 渲染改为 registry 分发，渲染实现放插件目录。
7. 删除旧 `api/chat/plan` 路径与旧渲染直连代码。
8. 全局检索确认无旧包残留引用。

## 验收标准
- `AIMessageManager` 中不再出现 `isDeepSearchEnabled` 直接判断逻辑。
- 深度搜索是否接管完全由插件 hook 决定。
- 深度搜索菜单项来自注册表（Classic/Agent 一致）。
- `PLAN_EXECUTION` 渲染通过注册入口调用，具体实现位于 `plugins/deepsearching`。
- 代码中不再引用 `com.ai.assistance.operit.api.chat.plan.*`。

## 风险与关注点
- 生命周期管理：插件接管后，取消/清理回调必须与主链路一致。
- 渲染状态：`plan` 图形渲染的缩放/拖拽状态不能因注册化丢失。
- 菜单状态：开关值与 `ApiPreferences` 同步需保持单一数据源。

## 交付方式
- 先完成结构迁移与 hook 接口。
- 再改 UI 菜单与 plan 渲染注册。
- 最后做引用清理与一致性检查。
