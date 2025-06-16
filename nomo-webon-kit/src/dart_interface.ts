declare global {
  interface Window {
    [key: string]: any;
  }
}

if (isRunningInHub()) {
  let focusedElement: HTMLInputElement | HTMLTextAreaElement | null = null;

  const handleFocusIn = async (event: any) => {
    const tagName = event.target.tagName.toLowerCase();
    const inputType = event.target.type?.toLowerCase();

    if (
      (tagName === "input" &&
        (inputType === "text" ||
          inputType === "password" ||
          inputType === "email" ||
          inputType === "number")) ||
      tagName === "textarea"
    ) {
      const target = event.target as HTMLInputElement | HTMLTextAreaElement;
      focusedElement = target;
      const args = {
        currentValue: target.value,
      };
      await invokeNomoFunction("nomoOpenExternalKeyboard", args);
    }
  };

  const handleFocusOut = async (event: any) => {
    const tagName = event.target.tagName.toLowerCase();
    const inputType = event.target.type?.toLowerCase();

    if (
      (tagName === "input" &&
        (inputType === "text" ||
          inputType === "password" ||
          inputType === "email" ||
          inputType === "number")) ||
      tagName === "textarea"
    ) {
      const target = event.target as HTMLInputElement | HTMLTextAreaElement;
      focusedElement = target;
      await invokeNomoFunction("nomoCloseExternalKeyboard", {});
    }
  };

  const postMessageWebOnActivity = () => {
    const message = {
      type: "webOnActivity",
    };
    window.parent.postMessage(message, "http://localhost:3009");
  };

  window.addEventListener("focusin", handleFocusIn);
  window.addEventListener("focusout", handleFocusOut);

  // handle other types of input to detect activity
  window.addEventListener("touchstart", postMessageWebOnActivity);
  window.addEventListener("touchend", postMessageWebOnActivity);
  window.addEventListener("touchcancel", postMessageWebOnActivity);

  window.addEventListener("message", function (event) {
    if (event.origin === "http://localhost:3009") {
      try {
        const { status, invocationID, result } = JSON.parse(event.data);

        if (status === "input") {
          if (focusedElement) {
            focusedElement.value = result.value;
            focusedElement.dispatchEvent(new Event("input"));
            focusedElement.dispatchEvent(new Event("input", { bubbles: true }));
            // Trigger React onChange event separately
            const tracker = (focusedElement as any)._valueTracker;
            if (tracker) {
              tracker.setValue("tempinputtemp");
            }
            focusedElement.dispatchEvent(
              new Event("change", { bubbles: true })
            );
          }
        } else {
          const resultMap = {
            status: status,
            invocationID: invocationID,
            result: result,
          };
          const responseJson = JSON.stringify(resultMap);
          const responseBytes = new TextEncoder().encode(responseJson);
          const responseBase64 = btoa(String.fromCharCode(...responseBytes));
          fulfillPromiseFromFlutter(responseBase64);
        }
      } catch (error) {
        console.error(error);
      }
    }
  });
}

/**
 * Decodes data from the native Nomo layer.
 */
function decodeBase64UTF16(base64EncodedString: string): string {
  const binaryString = atob(base64EncodedString);
  const bytes = new Uint8Array(binaryString.length);

  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  const decodedString = new TextDecoder("utf-8").decode(bytes);
  return decodedString;
}

/**
 * Returns true if the code is not running within a Nomo App WebView.
 */
export function isFallbackModeActive(): boolean {
  return !getDartBridge();
}

/**
 * Returns true if the code is running within an iframe.
 */
export function isRunningInHub(): boolean {
  if (typeof window === "undefined") {
    return false; // fallback mode in server-side rendering
  }
  return !!window && window.parent && window.parent !== window;
}

/**
 * A low-level function that aims to be compatible with multiple webviews
 */
function getDartBridge(): ((arg0: string) => void) | null {
  if (typeof window === "undefined") {
    return null; // fallback mode in server-side rendering
  }
  if (window.webkit?.messageHandlers?.NOMOJSChannel) {
    // legacy macOS
    return (payload: string) =>
      window.webkit.messageHandlers.NOMOJSChannel.postMessage(payload);
  } else if (window.NOMOJSChannel) {
    // mobile + macos
    return (payload: string) => window.NOMOJSChannel.postMessage(payload);
  } else if (window.chrome?.webview) {
    //windows
    return (payload: string) => window.chrome.webview.postMessage(payload);
  } else if (isRunningInHub()) {
    // parent window
    return (payload: string) => window.parent.postMessage(payload, "*");
  } else {
    return null; // fallback mode
  }
}

const nomoFunctionCache: Record<string, any> = {};

/**
 * A cached wrapper on top of "invokeNomoFunction".
 * For idempotent functions, this cache prevents unnecessary calls to the native layer.
 */
export async function invokeNomoFunctionCached(
  functionName: string,
  args: object | null
): Promise<any> {
  const key = functionName;
  if (!nomoFunctionCache[key]) {
    nomoFunctionCache[key] = await invokeNomoFunction(functionName, args);
  }
  return nomoFunctionCache[key];
}

let invocationCounter: number = 0;

/**
 * By assigning a random moduleID, we guard against duplicate instances of nomo-webon-kit.
 */
const moduleID: string = Array.from({ length: 8 }, () =>
  String.fromCharCode(Math.floor(Math.random() * 26) + 97)
).join("");

/**
 * Installs a hook for errors that are thrown by the native Nomo layer.
 */
export async function nomoInstallErrorHook(hook: (e: any) => void) {
  window.nomoErrorHook = hook;
}

/**
 * A low-level function used by other Nomo APIs.
 * This is the main entry point into the native layer.
 */
export async function invokeNomoFunction(
  functionName: string,
  args: object | null
): Promise<any> {
  invocationCounter++;
  const invocationID =
    invocationCounter.toString() + "_" + functionName + "_" + moduleID;
  const payload: string = JSON.stringify({
    functionName,
    invocationID,
    args,
  });

  if (typeof window === "undefined") {
    return Promise.reject(
      `the function ${functionName} does not work in NodeJS/CommonJS.`
    );
  }

  try {
    const nomoPromise = new Promise((resolve, reject) => {
      window.nomoResolvePromises[invocationID] = resolve;
      window.nomoRejectPromises[invocationID] = reject;
    });
    window.nomo[invocationID] = { args: args, status: "pending" };

    const dartBridge = getDartBridge();
    if (dartBridge) {
      dartBridge(payload);
    } else {
      return Promise.reject(
        `the function ${functionName} does not work outside of the NOMO-app.`
      );
    }
    return nomoPromise;
  } catch (e: any) {
    // Assuming e is an Error object
    if (e.message) {
      return Promise.reject(e.message);
    } else {
      throw e; // rethrow unknown errors
    }
  }
}

const fulfillPromiseFromFlutter = function (base64FromFlutter: string) {
  const jsonFromFlutter = decodeBase64UTF16(base64FromFlutter);
  const obj = JSON.parse(jsonFromFlutter);

  const invocationID: string = obj.invocationID;
  const status: "resolve" | "reject" = obj.status;
  const result = obj.result;
  if (!invocationID) {
    return "missing invocationID!";
  }
  if (!status) {
    return "missing status!";
  }
  let fulfillFunction: null | ((value: any) => void);
  if (status === "resolve") {
    fulfillFunction = window.nomoResolvePromises[invocationID];
  } else {
    fulfillFunction = window.nomoRejectPromises[invocationID];
    if (window.nomoErrorHook) {
      try {
        window.nomoErrorHook(result);
      } catch (e) {
        console.error("nomoErrorHook failed", e);
      }
    }
  }
  // clean up promises to avoid potential duplicate invocations
  window.nomoResolvePromises[invocationID] = null;
  window.nomoRejectPromises[invocationID] = null;

  if (!fulfillFunction) {
    console.error(
      "Failed to fulfill the promise with invocationID " + invocationID
    ); // should never ever happen
    return "FAIL";
  }
  fulfillFunction(result); // fulfill or reject the promise
  window.nomo[invocationID]["result"] = result;
  window.nomo[invocationID]["status"] = status;
  return "OK";
};
try {
  if (window.fulfillPromiseFromFlutter) {
    console.error(
      "Duplicate instances of nomo-webon-kit detected! This can trigger promises that never fulfill, please deduplicate your dependencies!"
    );
  }
  window.fulfillPromiseFromFlutter = fulfillPromiseFromFlutter;
  if (!window.nomoResolvePromises) {
    window.nomoResolvePromises = {};
  }
  if (!window.nomoRejectPromises) {
    window.nomoRejectPromises = {};
  }
  if (!window.nomo) {
    window.nomo = {};
  }
} catch (e) {}
