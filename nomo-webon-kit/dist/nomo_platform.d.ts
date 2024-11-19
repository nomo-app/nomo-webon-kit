export type NomoExecutionMode = "PRODUCTION" | "DEV" | "DEV_DEV" | "FALLBACK";
export type NomoHostingMode = "NOMO_INTEGRATED_HOSTING" | "EXTERNAL_HOSTING";
export type NomoWebView = "webview_flutter" | "webview_cef" | "not_in_nomo_app";
/**
 * Returns true if the code is running within a Nomo App WebView.
 */
export declare function runsAsWebOn(): boolean;
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
 * Returns the currently selected language of the Nomo App as well as the systemLanguage of the underlying device.
 */
export declare function nomoGetLanguage(): Promise<{
    language: string;
    systemLanguage: string;
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
export declare function nomoRegisterOnWebOnVisible(callback: () => void): Promise<void>;
/**
 * Reads a text from the user's clipboard.
 * Might open a dialog to ask for permission to access the clipboard.
 */
export declare function nomoGetClipboard(): Promise<{
    clipboard: string | null;
}>;
/**
 * Stores a text into the user's clipboard.
 */
export declare function nomoSetClipboard(args: {
    text: string;
}): Promise<void>;
/**
 * Summons the platform's share sheet to share a text.
 * If no text is provided, then it will share the deeplink of the WebOn.
 *
 * Wraps the platform's native share dialog. Can share a text and/or a URL.
 * It uses the `ACTION_SEND` Intent on Android and `UIActivityViewController` on iOS.
 *
 * The optional [subject] parameter can be used to populate a subject if the user chooses to send an email.
 */
export declare function nomoShare(args: {
    text?: string;
    subject?: string;
}): Promise<void>;
