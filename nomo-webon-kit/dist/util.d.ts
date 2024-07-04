/**
 * A low-level function. We recommend calling "hasMinimumNomoVersion" instead.
 */
export declare function compareSemanticVersions(versionA: string, versionB: string): 0 | 1 | -1;
/**
 * An alternative to JSON.stringify
 */
export declare function stringifyWithBigInts(obj: any): string;
/**
 * Converts URLSearchParams to a (nested) JS-object.
 */
export declare function urlSearchParamsToJson(params: URLSearchParams): Record<string, any>;
/**
 * An asynchronous sleep function.
 * @param ms The number of milliseconds to sleep.
 * @returns A promise that resolves after the specified sleep duration.
 */
export declare function sleep(ms: number): Promise<void>;
