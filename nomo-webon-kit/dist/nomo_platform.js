import { invokeNomoFunction, invokeNomoFunctionCached, isFallbackModeActive, } from "./dart_interface";
import { compareSemanticVersions, stringifyWithBigInts } from "./util";
/**
 * Returns true if the code is running within a Nomo App WebView.
 */
export function runsAsWebOn() {
    return !isFallbackModeActive();
}
/**
 * This function checks at runtime if the Nomo App has a minimum version.
 * It is also possible to require a minimum Nomo App version in the manifest.
 */
export async function hasMinimumNomoVersion(args) {
    const plaformInfo = await nomoGetPlatformInfo();
    const nomoVersion = plaformInfo.version;
    const c = compareSemanticVersions(args.minVersion, nomoVersion);
    if (c > 0) {
        return { minVersionFulfilled: false, nomoVersion };
    }
    else {
        return { minVersionFulfilled: true, nomoVersion };
    }
}
/**
 * Returns both the NOMO-version and the operating system where the WebOn runs.
 * Can be used for implementing platform-specific functionality.
 * See https://nomo.app/ for an overview of supported platforms.
 */
export async function nomoGetPlatformInfo() {
    if (isFallbackModeActive()) {
        return {
            version: "0.9.0",
            buildNumber: "123400",
            appName: "Not in Nomo app!",
            clientName: "Not in Nomo app!",
            operatingSystem: "unknown",
        };
    }
    return await invokeNomoFunctionCached("nomoGetPlatformInfo", null);
}
/**
 * Gets details about the execution environment of the WebOn.
 * See the advanced docs for more details about execution modes: https://github.com/nomo-app/nomo-webon-kit/tree/main/advanced-docs
 */
export async function nomoGetExecutionMode() {
    if (isFallbackModeActive()) {
        return {
            executionMode: "FALLBACK",
            hostingMode: null,
            webView: "not_in_nomo_app",
            cardMode: null,
        };
    }
    return await invokeNomoFunctionCached("nomoGetExecutionMode", null);
}
/**
 * Returns a comma-separated list of device hashes.
 * Can be used for fingerprinting devices.
 *
 * Needs nomo.permission.DEVICE_FINGERPRINTING.
 */
export async function nomoGetDeviceHashes() {
    if (isFallbackModeActive()) {
        return {
            deviceHashes: "b6Qz6EEKg,m2wAyKypQ,d67rq8zvw,pHcGGpnD5,iBFGnwEoE,vBhmQwyos,aGGJKq2QG,o9q6MhCeA,s9KLx6CVa,f7nin76st,rF3JVtwjV,u3txrGJEW",
        };
    }
    return await invokeNomoFunctionCached("nomoGetDeviceHashes", null);
}
/**
 * Returns a human-readable name of the device.
 *
 * Needs nomo.permission.DEVICE_FINGERPRINTING.
 */
export async function nomoGetDeviceName() {
    if (isFallbackModeActive()) {
        return {
            deviceName: "Browser fallback mode: No device name outside of Nomo app",
        };
    }
    return await invokeNomoFunctionCached("nomoGetDeviceName", null);
}
/**
 * Returns the currently selected language of the Nomo App.
 */
export async function nomoGetLanguage() {
    if (isFallbackModeActive()) {
        return { language: "en" };
    }
    return await invokeNomoFunction("nomoGetLanguage", {});
}
/**
 * This will show a dialog to the user if an update is available.
 * If you need to customize this dialog, then you could re-implement the same functionality in JavaScript.
 * Nevertheless, the Nomo App will automatically check for updates even if you never invoke "nomoCheckForWebOnUpdate".
 */
export async function nomoCheckForWebOnUpdate() {
    return await invokeNomoFunction("nomoCheckForWebOnUpdate", {});
}
/**
 * Registers a callback that will be called every time when the WebOn gets visible within the Nomo App.
 * For example, this can be used to refresh themes or languages when re-opening a WebOn after a pause.
 */
export async function nomoRegisterOnWebOnVisible(callback) {
    window.onWebOnVisible = callback;
    if (isFallbackModeActive()) {
        return;
    }
    return await invokeNomoFunctionCached("nomoEnableOnWebOnVisible", {});
}
const originalConsoleLog = console.log;
const originalConsoleInfo = console.info;
const originalConsoleWarn = console.warn;
const originalConsoleError = console.error;
/**
 * A set of logging-functions to enable debugging with the Nomo dev mode.
 * You should not need to call this directly, since it will be called automatically when calling
 * console.log/console.error/console.warn/console.info.
 */
export const nomoConsole = {
    log: function (...args) {
        originalConsoleLog(...args);
        nomoNativeLog("LOG", args);
    },
    info: function (...args) {
        originalConsoleInfo(...args);
        nomoNativeLog("INFO", args);
    },
    warn: function (...args) {
        originalConsoleWarn(...args);
        nomoNativeLog("WARN", args);
    },
    error: function (...args) {
        originalConsoleError(...args);
        nomoNativeLog("ERROR", args);
    },
};
let consoleOverwriten = false;
/**
 * After calling this function, console logs are visible in the
 * mobile DevDev-mode of the Nomo App.
 * For the Desktop DevDev-mode, this function is not necessary.
 */
export async function nomoEnableMobileConsoleDebugging() {
    const { executionMode } = await nomoGetExecutionMode();
    if (executionMode !== "DEV_DEV") {
        return;
    }
    if (!consoleOverwriten) {
        consoleOverwriten = true;
        console.log("overwriting console-functions to enable mobile dev mode...");
        console.log = nomoConsole.log;
        console.info = nomoConsole.info;
        console.warn = nomoConsole.warn;
        console.error = nomoConsole.error;
    }
}
function nomoNativeLog(severity, args) {
    if (isFallbackModeActive()) {
        return;
    }
    try {
        const argsArray = args.map((arg) => stringifyWithBigInts(arg));
        invokeNomoFunction("nomoNativeLog", { argsArray, severity });
    }
    catch (e) {
        originalConsoleError(e);
    }
}
/**
 * Summons the platform's share sheet to share a text.
 * If no text is provided, then it will share the deeplink of the WebOn.
 *
 * Wraps the platform's native share dialog. Can share a text and/or a URL.
 * It uses the `ACTION_SEND` Intent on Android and `UIActivityViewController` on iOS.
 *
 * The optional [subject] parameter can be used to populate a subject if the user chooses to send an email.
 */
export async function nomoShare(args) {
    if (!runsAsWebOn()) {
        navigator.share({ text: args.text });
        return;
    }
    return await invokeNomoFunction("nomoShare", args);
}
