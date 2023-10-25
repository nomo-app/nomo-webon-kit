import { decodeBase64UTF16 } from "./util";

declare global {
  interface Window {
    [key: string]: any;
  }
}

export function isFallbackModeActive(): boolean {
  return !getDartBridge();
}

/**
 * A low-level function that aims to be compatible with multiple webviews
 */
function getDartBridge(): ((arg0: string) => void) | null {
  if (window.webkit) {
    // legacy macOS
    return (payload: string) =>
      window.webkit.messageHandlers.NOMOJSChannel.postMessage(payload);
  } else if (window.NOMOJSChannel) {
    // mobile + macos
    return (payload: string) => window.NOMOJSChannel.postMessage(payload);
  } else if (window.chrome?.webview) {
    //windows
    return (payload: string) => window.chrome.webview.postMessage(payload);
  } else {
    return null; // fallback mode
  }
}

let invocationCounter: number = 0;

export async function invokeNomoFunction(
  functionName: string,
  args: object | null
): Promise<any> {
  invocationCounter++;
  const invocationID = invocationCounter.toString();
  const payload: string = JSON.stringify({
    functionName,
    invocationID,
    args,
  });

  // first create a Promise
  const promise = new Promise(function (
    resolve: (value: unknown) => void,
    reject: (reason?: any) => void
  ) {
    pendingPromisesResolve[invocationID] = resolve;
    pendingPromisesReject[invocationID] = reject;
  });

  try {
    const dartBridge = getDartBridge();
    if (dartBridge) {
      dartBridge(payload);
    } else {
      return Promise.reject(
        `the function ${functionName} does not work outside of the NOMO-app.`
      );
    }
  } catch (e) {
    // @ts-ignore
    return Promise.reject(e.message);
  }
  return promise;
}

const pendingPromisesResolve: Record<
  string,
  null | ((value: unknown) => void)
> = {};
const pendingPromisesReject: Record<string, null | ((reason?: any) => void)> =
  {};

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
    fulfillFunction = pendingPromisesResolve[invocationID];
  } else {
    fulfillFunction = pendingPromisesReject[invocationID];
  }
  // clean up promises to avoid potential duplicate invocations
  pendingPromisesResolve[invocationID] = null;
  pendingPromisesReject[invocationID] = null;

  if (!fulfillFunction) {
    return "unexpected invocationID";
  }
  fulfillFunction(result); // fulfill or reject the promise
  return "OK";
};
try {
  window.fulfillPromiseFromFlutter = fulfillPromiseFromFlutter;
} catch (e) {}
