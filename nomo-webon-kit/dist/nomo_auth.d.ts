/**
 * A special http-function that implements the Nomo-Auth-Protocol.
 * Moreover, even if you do not use Nomo-Auth, you can still use this function for bypassing CORS/Same-Origin-Policy.
 * At a lower level, Nomo-Auth works by injecting a few HTTP-headers into the request.
 */
export declare function nomoAuthHttp(args: {
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
