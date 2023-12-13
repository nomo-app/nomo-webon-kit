/**
 * Decodes data from the native Nomo layer.
 */
function decodeBase64UTF16(base64EncodedString) {
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
export function isFallbackModeActive() {
    return !getDartBridge();
}
/**
 * A low-level function that aims to be compatible with multiple webviews
 */
function getDartBridge() {
    var _a;
    if (typeof window === "undefined") {
        return null; // fallback mode in server-side rendering
    }
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
const nomoFunctionCache = {};
/**
 * A cached wrapper on top of "invokeNomoFunction".
 * For idempotent functions, this cache prevents unnecessary calls to the native layer.
 */
export async function invokeNomoFunctionCached(functionName, args) {
    const key = functionName;
    if (!nomoFunctionCache[key]) {
        nomoFunctionCache[key] = await invokeNomoFunction(functionName, args);
    }
    return nomoFunctionCache[key];
}
let invocationCounter = 0;
/**
 * By assigning a random moduleID, we guard against duplicate instances of nomo-webon-kit.
 */
const moduleID = Array.from({ length: 8 }, () => String.fromCharCode(Math.floor(Math.random() * 26) + 97)).join("");
/**
 * A low-level function used by other Nomo APIs.
 * This is the main entry point into the native layer.
 */
export async function invokeNomoFunction(functionName, args) {
    invocationCounter++;
    const invocationID = invocationCounter.toString() + "_" + functionName + "_" + moduleID;
    const payload = JSON.stringify({
        functionName,
        invocationID,
        args,
    });
    if (typeof window === "undefined") {
        return Promise.reject(`the function ${functionName} does not work in NodeJS/CommonJS.`);
    }
    try {
        const nomoPromise = new Promise(function (resolve, reject) {
            window.nomoResolvePromises[invocationID] = resolve;
            window.nomoRejectPromises[invocationID] = reject;
        });
        const dartBridge = getDartBridge();
        if (dartBridge) {
            dartBridge(payload);
        }
        else {
            return Promise.reject(`the function ${functionName} does not work outside of the NOMO-app.`);
        }
        return nomoPromise;
    }
    catch (e) {
        // @ts-ignore
        return Promise.reject(e.message);
    }
}
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
        fulfillFunction = window.nomoResolvePromises[invocationID];
    }
    else {
        fulfillFunction = window.nomoRejectPromises[invocationID];
    }
    // clean up promises to avoid potential duplicate invocations
    window.nomoResolvePromises[invocationID] = null;
    window.nomoRejectPromises[invocationID] = null;
    if (!fulfillFunction) {
        console.error("Failed to fulfill the promise with invocationID " + invocationID); // should never ever happen
        return "FAIL";
    }
    fulfillFunction(result); // fulfill or reject the promise
    return "OK";
};
try {
    if (window.fulfillPromiseFromFlutter) {
        console.error("Duplicate instances of nomo-webon-kit detected! This can trigger promises that never fulfill, please deduplicate your dependencies!");
    }
    window.fulfillPromiseFromFlutter = fulfillPromiseFromFlutter;
    if (!window.nomoResolvePromises) {
        window.nomoResolvePromises = {};
    }
    if (!window.nomoRejectPromises) {
        window.nomoRejectPromises = {};
    }
}
catch (e) { }
