type DeepSearchingHookName =
  | "onApplicationCreate"
  | "onMessageProcessing"
  | "onXmlRender"
  | "onInputMenuToggle";

interface DeepSearchingHookResult<TEvent> {
  ok: true;
  from: DeepSearchingHookName;
  eventName: string;
  event: TEvent;
}

export function registerToolPkg(): boolean {
  console.log("deepsearching registerToolPkg start");
  console.log(
    "deepsearching exposed",
    JSON.stringify({
      hasToolPkg: typeof ToolPkg !== "undefined",
      registerToolboxUiModule: typeof ToolPkg?.registerToolboxUiModule,
      registerAppLifecycleHook: typeof ToolPkg?.registerAppLifecycleHook,
      registerMessageProcessingPlugin: typeof ToolPkg?.registerMessageProcessingPlugin,
      registerXmlRenderPlugin: typeof ToolPkg?.registerXmlRenderPlugin,
      registerInputMenuTogglePlugin: typeof ToolPkg?.registerInputMenuTogglePlugin,
    })
  );
  console.log("deepsearching skip: registerToolboxUiModule");

  ToolPkg.registerAppLifecycleHook({
    id: "deepsearching_app_create",
    event: "application_on_create",
    function: onApplicationCreate,
  });
  console.log("deepsearching registered: registerAppLifecycleHook");

  ToolPkg.registerMessageProcessingPlugin({
    id: "deepsearching_message_plugin",
    function: onMessageProcessing,
  });
  console.log("deepsearching registered: registerMessageProcessingPlugin");

  ToolPkg.registerXmlRenderPlugin({
    id: "deepsearching_xml_plugin",
    tag: "deepsearching",
    function: onXmlRender,
  });
  console.log("deepsearching registered: registerXmlRenderPlugin");

  ToolPkg.registerInputMenuTogglePlugin({
    id: "deepsearching_input_menu_toggle",
    function: onInputMenuToggle,
  });
  console.log("deepsearching registered: registerInputMenuTogglePlugin");

  console.log("deepsearching registerToolPkg done");
  return true;
}

export function onApplicationCreate(
  input: ToolPkgAppLifecycleHookEvent
): DeepSearchingHookResult<ToolPkgAppLifecycleEventPayload> {
  console.log("deepsearching onApplicationCreate", JSON.stringify(input ?? null));
  return {
    ok: true,
    from: "onApplicationCreate",
    eventName: input.eventName,
    event: input.eventPayload,
  };
}

export function onMessageProcessing(
  input: ToolPkgMessageProcessingHookEvent
): DeepSearchingHookResult<ToolPkgMessageProcessingEventPayload> {
  console.log("deepsearching onMessageProcessing", JSON.stringify(input ?? null));
  return {
    ok: true,
    from: "onMessageProcessing",
    eventName: input.eventName,
    event: input.eventPayload,
  };
}

export function onXmlRender(
  input: ToolPkgXmlRenderHookEvent
): DeepSearchingHookResult<ToolPkgXmlRenderEventPayload> {
  console.log("deepsearching onXmlRender", JSON.stringify(input ?? null));
  return {
    ok: true,
    from: "onXmlRender",
    eventName: input.eventName,
    event: input.eventPayload,
  };
}

export function onInputMenuToggle(
  input: ToolPkgInputMenuToggleHookEvent
): DeepSearchingHookResult<ToolPkgInputMenuToggleEventPayload> {
  console.log("deepsearching onInputMenuToggle", JSON.stringify(input ?? null));
  return {
    ok: true,
    from: "onInputMenuToggle",
    eventName: input.eventName,
    event: input.eventPayload,
  };
}
