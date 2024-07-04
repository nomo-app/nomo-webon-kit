declare global {
    interface Window {
        [key: string]: any;
    }
}
/**
 * Returns true if the code is not running within a Nomo App WebView.
 */
export declare function isFallbackModeActive(): boolean;
/**
 * Returns true if the code is running within an iframe.
 */
export declare function isRunningInHub(): boolean;
/**
 * A cached wrapper on top of "invokeNomoFunction".
 * For idempotent functions, this cache prevents unnecessary calls to the native layer.
 */
export declare function invokeNomoFunctionCached(functionName: string, args: object | null): Promise<any>;
/**
 * A low-level function used by other Nomo APIs.
 * This is the main entry point into the native layer.
 */
export declare function invokeNomoFunction(functionName: string, args: object | null): Promise<any>;
