import { invokeNomoFunction, isFallbackModeActive } from "./dart_interface";
import { nomoGetManifest } from "./nomo_multi_webons";
/**
 * Returns address/signature-pairs for the Nomo-Auth-Protocol.
 * This is a primitive that can be used for customized authentication.
 * For example, the address/signature-pairs can be put into HTTP-headers.
 *
 * Needs nomo.permission.SIGN_EVM_MESSAGE.
 */
export async function nomoSignAuthMessage(args) {
    if (isFallbackModeActive()) {
        // We hardcode "authAddr" for the fallback-mode.
        // In the real Nomo-App, "authAddr" will be different for each domain.
        // In contrast, "ethAddress" is the same for all domains and only depend on the wallet.
        return {
            ethAddress: "0xF1cA9cb74685755965c7458528A36934Df52A3EF",
            ethSig: "0x67d10b371a75ac6d20c2af83c9e14edec60567b3bc181b0b971bbea1888146e87e0b0dd6ca45453749171ec99522ffd061ccebeafff89ed9d95d6a3f8da3660b1b",
            authAddress: "cNpBzxornzED1MsBKDupMbwqZnkFtoUVGD",
            authSig: "HCaJ9SEvzyRXGbtDmtvZxErBLgyiOGWtAjBwavyWqhaBFsQB4MzjiHgaF9Ia2MA9IOfZ5W/fUC56UXzE96IN6nk=",
        };
    }
    return await invokeNomoFunction("nomoSignAuthMessage", args);
}
/**
 * A browser-implementation of the Nomo-Auth-Protocol.
 * It is similar to nomoAuthHttp, but it is implemented in JavaScript instead of the native layer.
 * Therefore, is much easier to debug or modify, although it cannot bypass CORS.
 */
export async function nomoAuthFetch(args) {
    var _a, _b;
    args = fillMissingArgs(args);
    const signer = (_a = args.signer) !== null && _a !== void 0 ? _a : nomoSignAuthMessage;
    const headers = (_b = args.headers) !== null && _b !== void 0 ? _b : {};
    _injectNomoAuthHeaders({
        signer,
        url: args.url,
        headers,
    });
    let res = await fetch(args.url, {
        method: args.method,
        headers,
        body: args.body,
    });
    let statusCode = res.status;
    let resBody = await res.json();
    if (statusCode === 403) {
        // 403-case: special statusCode for NOMO-Auth protocol
        // repeat the request with even more injected headers
        const jwt = resBody.jwt;
        if (!jwt) {
            return Promise.reject("got 403 but missing JWT");
        }
        const domain = new URL(args.url).hostname;
        localStorage.set(domain, jwt);
        _injectNomoAuthHeaders({
            signer,
            url: args.url,
            headers,
        });
        res = await fetch(args.url, {
            method: args.method,
            headers,
            body: args.body,
        });
        statusCode = res.status;
        resBody = await res.json();
    }
    return {
        statusCode,
        response: JSON.stringify(resBody),
    };
}
async function _injectNomoAuthHeaders({ signer, url, headers, }) {
    var _a;
    const domain = new URL(url).hostname;
    const jwt = (_a = localStorage.getItem(domain)) !== null && _a !== void 0 ? _a : null;
    const messageToSign = jwt !== null && jwt !== void 0 ? jwt : "dummyMessage";
    const sigResult = await signer({ message: messageToSign, url });
    const manifest = await nomoGetManifest();
    headers["nomo-auth-addr"] = sigResult.authAddress;
    headers["nomo-eth-addr"] = sigResult.ethAddress;
    headers["nomo-auth-version"] = "1.1.0";
    headers["nomo-webon"] = manifest.webon_name + "/" + manifest.webon_version;
    if (jwt) {
        headers["nomo-sig"] = sigResult.authSig;
        headers["nomo-eth-sig"] = sigResult.ethSig;
        headers["Authorization"] = `Bearer ${jwt}`;
    }
}
/**
 * A native implementation of the Nomo-Auth-Protocol.
 * Moreover, even if you do not use Nomo-Auth, you can still use this function for bypassing CORS.
 * At a lower level, Nomo-Auth works by injecting a few HTTP-headers into the request.
 */
export async function nomoAuthHttp(args) {
    args = fillMissingArgs(args);
    if (isFallbackModeActive()) {
        return await nomoAuthFetch(args);
    }
    return await invokeNomoFunction("nomoAuthHttp", args);
}
function fillMissingArgs(args) {
    var _a, _b;
    if (typeof args === "string") {
        args = { url: args };
    }
    return {
        url: args.url,
        method: (_a = args.method) !== null && _a !== void 0 ? _a : "GET",
        headers: (_b = args.headers) !== null && _b !== void 0 ? _b : {},
        body: args.body,
    };
}
