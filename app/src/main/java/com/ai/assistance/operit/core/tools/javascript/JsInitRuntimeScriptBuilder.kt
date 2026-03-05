package com.ai.assistance.operit.core.tools.javascript

import org.json.JSONObject

internal fun buildInitRuntimeScript(
    operitDownloadDir: String,
    operitCleanOnExitDir: String,
    asyncPromiseTimeoutSeconds: Long,
    toolPkgRegistrationBridgeScript: String,
    jsToolsDefinition: String,
    composeDslContextBridgeDefinition: String,
    javaClassBridgeDefinition: String,
    jsThirdPartyLibraries: String,
    cryptoJsBridgeScript: String,
    jimpJsBridgeScript: String,
    uiNodeJsScript: String,
    androidUtilsJsScript: String,
    okHttp3JsScript: String,
    pakoJsBridgeScript: String
): String {
    val safeAsyncTimeoutSeconds = if (asyncPromiseTimeoutSeconds <= 0L) 1L else asyncPromiseTimeoutSeconds
    val safeAsyncTimeoutMs = safeAsyncTimeoutSeconds * 1000L

    return """
        (function() {
            function hasNative(methodName) {
                return (
                    typeof NativeInterface !== 'undefined' &&
                    NativeInterface &&
                    typeof NativeInterface[methodName] === 'function'
                );
            }

            function callNative(methodName) {
                if (!hasNative(methodName)) {
                    throw new Error("NativeInterface." + methodName + " is unavailable");
                }
                var args = Array.prototype.slice.call(arguments, 1);
                return NativeInterface[methodName].apply(NativeInterface, args);
            }

            function callNativeOptional(methodName) {
                if (!hasNative(methodName)) {
                    return undefined;
                }
                var args = Array.prototype.slice.call(arguments, 1);
                try {
                    return NativeInterface[methodName].apply(NativeInterface, args);
                } catch (_e) {
                    return undefined;
                }
            }

            function asString(value) {
                if (value === null || value === undefined) {
                    return '';
                }
                return String(value);
            }

            function installGlobal(name, value) {
                var key = asString(name).trim();
                if (!key || value === undefined) {
                    return;
                }
                try {
                    globalThis[key] = value;
                } catch (_globalError) {
                }
                try {
                    window[key] = value;
                } catch (_windowError) {
                }
            }

            function installIfResolvable(name, resolver) {
                try {
                    installGlobal(name, resolver());
                } catch (_resolveError) {
                }
            }

            function safeSerialize(value) {
                try {
                    return JSON.stringify(value);
                } catch (e) {
                    return JSON.stringify({
                        error: "Failed to serialize value",
                        message: asString(e && e.message ? e.message : e),
                        value: asString(value).substring(0, 1000)
                    });
                }
            }

            window.__operitBuildRuntimeContext = function() {
                try {
                    var mapping = [
                        ["__operit_last_exec_stage", "stage"],
                        ["__operit_last_exec_function", "function"],
                        ["__operit_last_module_path", "module"],
                        ["__operit_last_require_request", "require"],
                        ["__operit_last_require_from", "from"],
                        ["__operit_last_require_resolved", "resolved"]
                    ];
                    var contextParts = [];
                    for (var i = 0; i < mapping.length; i += 1) {
                        var key = mapping[i][0];
                        var label = mapping[i][1];
                        var value = window[key];
                        if (value !== null && value !== undefined && asString(value).trim().length > 0) {
                            contextParts.push(label + "=" + asString(value));
                        }
                    }
                    return contextParts.join(", ");
                } catch (_e) {
                    return "";
                }
            };

            function runtimeContextSuffix() {
                var context = '';
                if (typeof window.__operitBuildRuntimeContext === 'function') {
                    context = asString(window.__operitBuildRuntimeContext()).trim();
                }
                if (!context) {
                    return "\nRuntime Context: unavailable (error happened before runtime stage markers)";
                }
                return "\nRuntime Context: " + context;
            }

            function emitFatalError(message) {
                if (window._hasCompleted) {
                    return;
                }
                window._hasCompleted = true;
                var finalMessage = asString(message || "Unknown error");
                callNativeOptional("setError", finalMessage);
            }

            window.formatErrorDetails = function(error) {
                var name = asString(error && error.name ? error.name : "Error");
                var message = asString(error && error.message ? error.message : error);
                var stack = asString(error && error.stack ? error.stack : "No stack trace");
                var lineNumber = 0;
                var fileName = "";

                if (stack) {
                    var stackMatch = stack.match(/at\s+.*?\s+\((.+):(\d+):(\d+)\)/);
                    if (stackMatch) {
                        fileName = asString(stackMatch[1]);
                        lineNumber = Number(stackMatch[2]) || 0;
                    }
                }

                return {
                    formatted: name + ": " + message + "\nStack: " + stack,
                    details: {
                        name: name,
                        message: message,
                        stack: stack,
                        fileName: fileName,
                        lineNumber: lineNumber
                    }
                };
            };

            window.reportDetailedError = function(error, context) {
                var details = window.formatErrorDetails(error);
                var title = asString(context || "unknown");
                callNativeOptional(
                    "reportError",
                    asString(details.details.name || "Error"),
                    asString(details.details.message || ""),
                    Number(details.details.lineNumber) || 0,
                    asString(details.details.stack || "")
                );
                return {
                    formatted: "Context: " + title + "\n" + details.formatted,
                    details: details.details
                };
            };

            window.onerror = function(message, source, lineno, colno, error) {
                var msg = asString(message || "Unknown error");
                var sourceText = asString(source || "unknown");
                var line = Number(lineno) || 0;
                var column = Number(colno) || 0;
                var stack = asString(error && error.stack ? error.stack : "No stack trace");

                var hasSource = sourceText.trim().length > 0 && sourceText !== "unknown";
                var hasLine = line > 0;
                var hasColumn = column > 0;
                var hasStack = stack.trim().length > 0 && stack !== "No stack trace";
                var isOpaqueScriptError =
                    msg.trim() === "Script error." &&
                    !hasSource &&
                    !hasLine &&
                    !hasColumn &&
                    !hasStack;

                if (isOpaqueScriptError) {
                    emitFatalError(
                        "JavaScript Error: Script error. at line 0, column 0 in unknown\nStack: No stack trace" +
                            runtimeContextSuffix()
                    );
                    return true;
                }

                emitFatalError(
                    "JavaScript Error: " +
                        msg +
                        " at line " +
                        line +
                        ", column " +
                        column +
                        " in " +
                        sourceText +
                        "\nStack: " +
                        stack +
                        runtimeContextSuffix()
                );
                return true;
            };

            window.onunhandledrejection = function(event) {
                var reason = event ? event.reason : "Unknown promise rejection";
                var report = window.reportDetailedError(reason, "Unhandled Promise Rejection");
                emitFatalError(
                    JSON.stringify({
                        error: "Promise rejection",
                        details: report.details,
                        formatted: report.formatted
                    })
                );
                return true;
            };

            (function installConsoleBridge() {
                if (window.__operit_console_bridge_installed) {
                    return;
                }
                window.__operit_console_bridge_installed = true;

                var original = {
                    log: console.log ? console.log.bind(console) : function() {},
                    info: console.info ? console.info.bind(console) : function() {},
                    warn: console.warn ? console.warn.bind(console) : function() {},
                    error: console.error ? console.error.bind(console) : function() {}
                };

                function stringifyArgs(argsLike) {
                    var textParts = [];
                    for (var i = 0; i < argsLike.length; i += 1) {
                        var value = argsLike[i];
                        if (typeof value === 'string') {
                            textParts.push(value);
                        } else {
                            try {
                                textParts.push(JSON.stringify(value));
                            } catch (_e) {
                                textParts.push(asString(value));
                            }
                        }
                    }
                    return textParts.join(' ');
                }

                function forwardToNative(level, message) {
                    if (level === "ERROR") {
                        callNativeOptional("logError", message);
                    } else {
                        callNativeOptional("logInfo", message);
                    }
                }

                function install(levelName, targetLevel, nativeLevel) {
                    console[levelName] = function() {
                        try {
                            original[targetLevel].apply(console, arguments);
                        } catch (_e) {
                        }
                        try {
                            forwardToNative(nativeLevel, stringifyArgs(arguments));
                        } catch (_e2) {
                        }
                    };
                }

                install("log", "log", "LOG");
                install("info", "info", "LOG");
                install("warn", "warn", "LOG");
                install("error", "error", "ERROR");
            })();

            function clonePlainObject(value) {
                if (!value || typeof value !== 'object' || Array.isArray(value)) {
                    return {};
                }
                var copy = {};
                var keys = Object.keys(value);
                for (var i = 0; i < keys.length; i += 1) {
                    copy[keys[i]] = value[keys[i]];
                }
                return copy;
            }

            function parseToolCallArguments(rawArgs) {
                var type = "default";
                var name = "";
                var params = {};

                if (rawArgs.length === 1 && typeof rawArgs[0] === 'object') {
                    type = asString(rawArgs[0].type || "default");
                    name = asString(rawArgs[0].name || "");
                    params = clonePlainObject(rawArgs[0].params);
                } else if (rawArgs.length === 1 && typeof rawArgs[0] === 'string') {
                    name = asString(rawArgs[0]);
                } else if (rawArgs.length === 2 && typeof rawArgs[1] === 'object') {
                    name = asString(rawArgs[0]);
                    params = clonePlainObject(rawArgs[1]);
                } else {
                    type = asString(rawArgs[0] || "default");
                    name = asString(rawArgs[1] || "");
                    params = clonePlainObject(rawArgs[2]);
                }

                return {
                    type: type || "default",
                    name: name,
                    params: params
                };
            }

            function parseToolResult(result, isError) {
                if (isError) {
                    if (result && typeof result === 'object' && result.success === false) {
                        throw new Error(asString(result.error || "Unknown error"));
                    }
                    throw new Error(typeof result === 'string' ? result : safeSerialize(result));
                }

                if (result && typeof result === 'object') {
                    if (Object.prototype.hasOwnProperty.call(result, "success")) {
                        if (result.success) {
                            return result.data;
                        }
                        throw new Error(asString(result.error || "Unknown error"));
                    }
                    return result;
                }

                if (typeof result === 'string' && result.length > 1) {
                    var first = result.charAt(0);
                    if (first === '{' || first === '[') {
                        try {
                            var parsed = JSON.parse(result);
                            if (parsed && typeof parsed === 'object' && Object.prototype.hasOwnProperty.call(parsed, "success")) {
                                if (parsed.success) {
                                    return parsed.data;
                                }
                                throw new Error(asString(parsed.error || "Unknown error"));
                            }
                            return parsed;
                        } catch (_e) {
                            return result;
                        }
                    }
                }
                return result;
            }

            function nextToolCallbackId() {
                return "_tc_" + Date.now() + "_" + Math.random().toString(36).slice(2, 11);
            }

            function toolCall(toolType, toolName, toolParams) {
                var rawArgs = arguments;
                return new Promise(function(resolve, reject) {
                    try {
                        var parsed = parseToolCallArguments(rawArgs);
                        var callbackId = nextToolCallbackId();
                        var paramsJson = safeSerialize(parsed.params);

                        window[callbackId] = function(result, isError) {
                            delete window[callbackId];
                            try {
                                resolve(parseToolResult(result, !!isError));
                            } catch (e) {
                                reject(e);
                            }
                        };

                        callNative("callToolAsync", callbackId, parsed.type, parsed.name, paramsJson);
                    } catch (error) {
                        reject(error);
                    }
                });
            }
            installGlobal("toolCall", toolCall);

            function getEnv(key) {
                var name = asString(key).trim();
                if (!name) {
                    return undefined;
                }
                var value = callNativeOptional("getEnv", name);
                if (value === null || value === undefined || value === "") {
                    return undefined;
                }
                return asString(value);
            }
            installGlobal("getEnv", getEnv);

            function readWindowContext(key, fallbackValue) {
                try {
                    var value = window[key];
                    if (value === null || value === undefined || value === "") {
                        return fallbackValue;
                    }
                    return asString(value);
                } catch (_e) {
                    return fallbackValue;
                }
            }

            function getState() { return readWindowContext("__operit_package_state", undefined); }
            function getLang() { return readWindowContext("__operit_package_lang", "en"); }
            function getCallerName() { return readWindowContext("__operit_package_caller_name", undefined); }
            function getChatId() { return readWindowContext("__operit_package_chat_id", undefined); }
            function getCallerCardId() { return readWindowContext("__operit_package_caller_card_id", undefined); }

            installGlobal("getState", getState);
            installGlobal("getLang", getLang);
            installGlobal("getCallerName", getCallerName);
            installGlobal("getChatId", getChatId);
            installGlobal("getCallerCardId", getCallerCardId);

            ${toolPkgRegistrationBridgeScript}

            var OPERIT_DOWNLOAD_DIR = ${JSONObject.quote(operitDownloadDir)};
            var OPERIT_CLEAN_ON_EXIT_DIR = ${JSONObject.quote(operitCleanOnExitDir)};
            installGlobal("OPERIT_DOWNLOAD_DIR", OPERIT_DOWNLOAD_DIR);
            installGlobal("OPERIT_CLEAN_ON_EXIT_DIR", OPERIT_CLEAN_ON_EXIT_DIR);

            ${jsToolsDefinition}
            installIfResolvable("Tools", function() { return Tools; });

            ${composeDslContextBridgeDefinition}
            installIfResolvable("OperitComposeDslRuntime", function() { return OperitComposeDslRuntime; });

            ${javaClassBridgeDefinition}

            function complete(result) {
                if (window._hasCompleted) {
                    return;
                }
                window._hasCompleted = true;
                try {
                    clearTimeout(window._safetyTimeout);
                    clearTimeout(window._safetyTimeoutFinal);
                } catch (_e) {
                }
                var payload = safeSerialize(result);
                if (!hasNative("setResult")) {
                    callNativeOptional("setError", "NativeInterface.setResult is unavailable");
                    return;
                }
                try {
                    callNative("setResult", payload);
                } catch (e) {
                    callNativeOptional(
                        "setError",
                        "Error in complete function: " + asString(e && e.message ? e.message : e)
                    );
                }
            }
            installGlobal("complete", complete);

            function sendIntermediateResult(result) {
                if (window._hasCompleted) {
                    return;
                }
                callNativeOptional("sendIntermediateResult", safeSerialize(result));
            }
            installGlobal("sendIntermediateResult", sendIntermediateResult);

            ${jsThirdPartyLibraries}
            installIfResolvable("_", function() { return _; });
            installIfResolvable("dataUtils", function() { return dataUtils; });

            ${cryptoJsBridgeScript}
            ${jimpJsBridgeScript}
            ${uiNodeJsScript}
            ${androidUtilsJsScript}
            ${okHttp3JsScript}
            ${pakoJsBridgeScript}

            function __handleAsync(possiblePromise) {
                if (!possiblePromise || typeof possiblePromise.then !== 'function') {
                    return false;
                }

                var timeoutToken = setTimeout(function() {
                    if (!window._hasCompleted) {
                        complete({
                            warning: "Operation timeout",
                            result: "Promise did not resolve within the time limit (${safeAsyncTimeoutSeconds} seconds)"
                        });
                    }
                }, $safeAsyncTimeoutMs);

                Promise.resolve(possiblePromise)
                    .then(function(result) {
                        clearTimeout(timeoutToken);
                        if (!window._hasCompleted) {
                            complete(result);
                        }
                    })
                    .catch(function(error) {
                        clearTimeout(timeoutToken);
                        if (window._hasCompleted) {
                            return;
                        }
                        var report = window.reportDetailedError(error, "Async Promise Rejection");
                        emitFatalError(
                            JSON.stringify({
                                error: "Promise rejection",
                                details: report.details,
                                formatted: report.formatted
                            })
                        );
                    });
                return true;
            }
            installGlobal("__handleAsync", __handleAsync);
        })();
    """.trimIndent()
}
