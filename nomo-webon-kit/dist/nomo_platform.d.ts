export type NomoExecutionMode = "PRODUCTION" | "DEV" | "DEV_DEV" | "FALLBACK";
export type NomoHostingMode = "NOMO_INTEGRATED_HOSTING" | "EXTERNAL_HOSTING";
export type NomoWebView = "webview_flutter" | "webview_cef" | "not_in_nomo_app";
/**
 * This function checks at runtime if the Nomo App has a minimum version.
 * It is also possible to require a minimum Nomo App version in the manifest.
 */
export declare function hasMinimumNomoVersion(args: {
    minVersion: string;
}): Promise<{
    minVersionFulfilled: boolean;
    nomoVersion: string;
}>;
/**
 * Returns both the NOMO-version and the operating system where the WebOn runs.
 * Can be used for implementing platform-specific functionality.
 * See https://nomo.app/ for an overview of supported platforms.
 */
export declare function nomoGetPlatformInfo(): Promise<{
    version: string;
    buildNumber: string;
    appName: string;
    clientName: string;
    operatingSystem: string;
}>;
/**
 * Gets details about the execution environment of the WebOn.
 * See the advanced docs for more details about execution modes: https://github.com/nomo-app/nomo-webon-kit/tree/main/advanced-docs
 */
export declare function nomoGetExecutionMode(): Promise<{
    executionMode: NomoExecutionMode;
    hostingMode: NomoHostingMode | null;
    webView: NomoWebView;
    cardMode: boolean | null;
}>;
/**
 * Returns a comma-separated list of device hashes.
 * Can be used for fingerprinting devices.
 *
 * Needs nomo.permission.DEVICE_FINGERPRINTING.
 */
export declare function nomoGetDeviceHashes(): Promise<{
    deviceHashes: string;
}>;
/**
 * Returns a human-readable name of the device.
 *
 * Needs nomo.permission.DEVICE_FINGERPRINTING.
 */
export declare function nomoGetDeviceName(): Promise<{
    deviceName: string;
}>;
/**
 * Returns the currently selected language of the Nomo App.
 */
export declare function nomoGetLanguage(): Promise<{
    language: string;
}>;
/**
 * This will show a dialog to the user if an update is available.
 * If you need to customize this dialog, then you could re-implement the same functionality in JavaScript.
 * Nevertheless, the Nomo App will automatically check for updates even if you never invoke "nomoCheckForWebOnUpdate".
 */
export declare function nomoCheckForWebOnUpdate(): Promise<void>;
/**
 * Registers a callback that will be called every time when the WebOn gets visible within the Nomo App.
 * For example, this can be used to refresh themes or languages when re-opening a WebOn after a pause.
 */
export declare function nomoRegisterOnWebOnVisible(callback: (args: {
    cardMode: boolean;
}) => void): Promise<void>;
/**
 * A set of logging-functions to enable debugging with the Nomo dev mode.
 * You should not need to call this directly, since it will be called automatically when calling
 * console.log/console.error/console.warn/console.info.
 */
export declare const nomoConsole: {
    log: (...args: any[]) => void;
    info: (...args: any[]) => void;
    warn: (...args: any[]) => void;
    error: (...args: any[]) => void;
};
/**
 * After calling this function, console logs are visible in the
 * mobile DevDev-mode of the Nomo App.
 * For the Desktop DevDev-mode, this function is not necessary.
 */
export declare function nomoEnableMobileConsoleDebugging(): Promise<void>;
