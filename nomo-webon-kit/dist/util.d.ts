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
