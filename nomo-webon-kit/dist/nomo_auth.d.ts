/**
 * Returns address/signature-pairs for the Nomo-Auth-Protocol.
 * This is a primitive that can be used for customized authentication.
 * For example, the address/signature-pairs can be put into an HTTP-header.
 *
 * Needs nomo.permission.SIGN_EVM_MESSAGE.
 */
export declare function nomoSignAuthMessage(args: {
    message: string;
    url: string;
}): Promise<{
    ethAddress: string;
    ethSig: string;
    authAddress: string;
    authSig: string;
}>;
/**
 * A browser-implementation of the Nomo-Auth-Protocol.
 * It is similar to nomoAuthHttp, but it is implemented in JavaScript instead of the native layer.
 * Therefore, is much easier to debug or modify, although it cannot bypass CORS.
 */
export declare function nomoAuthFetch(args: {
    url: string;
    method?: "GET" | "POST";
    headers?: {
        [key: string]: string;
    };
    body?: string;
    signer?: typeof nomoSignAuthMessage;
}): Promise<{
    statusCode: number;
    response: string;
}>;
/**
 * A native implementation of the Nomo-Auth-Protocol.
 * Moreover, even if you do not use Nomo-Auth, you can still use this function for bypassing CORS.
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
