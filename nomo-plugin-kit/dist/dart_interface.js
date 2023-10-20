import { decodeBase64UTF16 } from "./util";
export function isFallbackModeActive() {
    return !getDartBridge();
}
/**
 * A low-level function that aims to be compatible with multiple webviews
 */
function getDartBridge() {
    var _a;
    if (window.webkit) {
        // legacy macOS
        return (payload) => window.webkit.messageHandlers.NOMOJSChannel.postMessage(payload);
    }
    else if (window.NOMOJSChannel) {
        // mobile + macos
        return (payload) => window.NOMOJSChannel.postMessage(payload);
    }
    else if ((_a = window.chrome) === null || _a === void 0 ? void 0 : _a.webview) {
        //windows
        return (payload) => window.chrome.webview.postMessage(payload);
    }
    else {
        return null; // fallback mode
    }
}
let invocationCounter = 0;
export async function invokeNomoFunction(functionName, args) {
    invocationCounter++;
    const invocationID = invocationCounter.toString();
    const payload = JSON.stringify({
        functionName,
        invocationID,
        args,
    });
    // first create a Promise
    const promise = new Promise(function (resolve, reject) {
        pendingPromisesResolve[invocationID] = resolve;
        pendingPromisesReject[invocationID] = reject;
    });
    try {
        const dartBridge = getDartBridge();
        if (dartBridge) {
            dartBridge(payload);
        }
        else {
            return Promise.reject(`the function ${functionName} does not work outside of the NOMO-app.`);
        }
    }
    catch (e) {
        // @ts-ignore
        return Promise.reject(e.message);
    }
    return promise;
}
const pendingPromisesResolve = {};
const pendingPromisesReject = {};
const fulfillPromiseFromFlutter = function (base64FromFlutter) {
    const jsonFromFlutter = decodeBase64UTF16(base64FromFlutter);
    const obj = JSON.parse(jsonFromFlutter);
    const invocationID = obj.invocationID;
    const status = obj.status;
    const result = obj.result;
    if (!invocationID) {
        return "missing invocationID!";
    }
    if (!status) {
        return "missing status!";
    }
    let fulfillFunction;
    if (status === "resolve") {
        fulfillFunction = pendingPromisesResolve[invocationID];
    }
    else {
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
}
catch (e) { }
