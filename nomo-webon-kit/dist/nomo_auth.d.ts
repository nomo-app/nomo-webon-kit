/**
 * Returns address/signature-pairs for the Nomo-Auth-Protocol.
 * This is a primitive that can be used for customized authentication.
 * For example, the address/signature-pairs can be put into HTTP-headers.
 * See https://github.com/nomo-app/nomo-auth for more information.
 *
 * param message: A message to sign.
 * param url: By hardcoding your own url, you can create authAddress/authSig-pairs that cannot be tracked across different services.
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
 * If instantAuth is set to true, then it will sign a timestamp instead of doing the full Nomo-Auth-Protocol.
 */
export declare function nomoAuthFetch(args: {
    url: string;
    method?: "GET" | "POST";
    headers?: {
        [key: string]: string;
    };
    body?: string | {
        [key: string]: any;
    };
    signer?: typeof nomoSignAuthMessage;
    instantAuth?: boolean;
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
    body?: string | {
        [key: string]: any;
    };
} | string): Promise<{
    statusCode: number;
    response: string;
}>;
/**
 * Some API-endpoints require this proof-of-work in order to make denial-of-service attacks more expensive.
 */
export declare function nomoProofOfWork(args: {
    shaInputPrefix: string;
    challenge: string;
}): Promise<{
    shaInput: string;
}>;
