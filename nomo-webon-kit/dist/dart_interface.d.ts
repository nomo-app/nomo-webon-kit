declare global {
    interface Window {
        [key: string]: any;
    }
}
export declare function isFallbackModeActive(): boolean;
/**
 * For idempotent functions, this cache prevents unnecessary calls to the native layer.
 */
export declare function invokeNomoFunctionCached(functionName: string, args: object | null): Promise<any>;
export declare function invokeNomoFunction(functionName: string, args: object | null): Promise<any>;
