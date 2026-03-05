"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerToolPkg = registerToolPkg;
exports.onApplicationCreate = onApplicationCreate;
exports.onMessageProcessing = onMessageProcessing;
exports.onXmlRender = onXmlRender;
exports.onInputMenuToggle = onInputMenuToggle;
function registerToolPkg() {
    console.log("[deepsearching] registerToolPkg start");
    console.log("[deepsearching] exposed", JSON.stringify({
        hasToolPkg: typeof ToolPkg !== "undefined",
        registerToolboxUiModule: typeof (ToolPkg === null || ToolPkg === void 0 ? void 0 : ToolPkg.registerToolboxUiModule),
        registerAppLifecycleHook: typeof (ToolPkg === null || ToolPkg === void 0 ? void 0 : ToolPkg.registerAppLifecycleHook),
        registerMessageProcessingPlugin: typeof (ToolPkg === null || ToolPkg === void 0 ? void 0 : ToolPkg.registerMessageProcessingPlugin),
        registerXmlRenderPlugin: typeof (ToolPkg === null || ToolPkg === void 0 ? void 0 : ToolPkg.registerXmlRenderPlugin),
        registerInputMenuTogglePlugin: typeof (ToolPkg === null || ToolPkg === void 0 ? void 0 : ToolPkg.registerInputMenuTogglePlugin),
    }));
    console.log("[deepsearching] skip: registerToolboxUiModule");
    ToolPkg.registerAppLifecycleHook({
        id: "deepsearching_app_create",
        event: "application_on_create",
        function: onApplicationCreate,
    });
    console.log("[deepsearching] registered: registerAppLifecycleHook");
    ToolPkg.registerMessageProcessingPlugin({
        id: "deepsearching_message_plugin",
        function: onMessageProcessing,
    });
    console.log("[deepsearching] registered: registerMessageProcessingPlugin");
    ToolPkg.registerXmlRenderPlugin({
        id: "deepsearching_xml_plugin",
        tag: "deepsearching",
        function: onXmlRender,
    });
    console.log("[deepsearching] registered: registerXmlRenderPlugin");
    ToolPkg.registerInputMenuTogglePlugin({
        id: "deepsearching_input_menu_toggle",
        function: onInputMenuToggle,
    });
    console.log("[deepsearching] registered: registerInputMenuTogglePlugin");
    console.log("[deepsearching] registerToolPkg done");
    return true;
}
function onApplicationCreate() {
    console.log("[deepsearching] onApplicationCreate");
    return { ok: true, from: "onApplicationCreate" };
}
function onMessageProcessing(input) {
    console.log("[deepsearching] onMessageProcessing", JSON.stringify(input !== null && input !== void 0 ? input : null));
    return { ok: true, from: "onMessageProcessing" };
}
function onXmlRender(input) {
    console.log("[deepsearching] onXmlRender", JSON.stringify(input !== null && input !== void 0 ? input : null));
    return { ok: true, from: "onXmlRender" };
}
function onInputMenuToggle(input) {
    console.log("[deepsearching] onInputMenuToggle", JSON.stringify(input !== null && input !== void 0 ? input : null));
    return { ok: true, from: "onInputMenuToggle" };
}
