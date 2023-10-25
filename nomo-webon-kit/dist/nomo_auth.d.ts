/**
 * An internal function used by nomoAuthHttp
 */
export declare function nomoAuthFetch(args: {
    url: string;
    method?: "GET" | "POST";
    headers?: {
        [key: string]: string;
    };
    body?: string;
} | string): Promise<{
    statusCode: number;
    response: string;
}>;
/**
 * This is a browser-simulation of the Nomo-Auth-Protocol.
 */
export declare function simulateNomoAuthHttp(args: {
    url: string;
    method?: "GET" | "POST";
    headers?: {
        [key: string]: string;
    };
    body?: string;
}): Promise<{
    statusCode: number;
    response: string;
}>;
