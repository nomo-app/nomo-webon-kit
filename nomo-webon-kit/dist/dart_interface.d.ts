declare global {
    interface Window {
        [key: string]: any;
    }
}
export declare function isFallbackModeActive(): boolean;
export declare function invokeNomoFunction(functionName: string, args: object | null): Promise<any>;
