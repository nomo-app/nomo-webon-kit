import { invokeNomoFunction, isFallbackModeActive } from "./dart_interface";
/**
 * An internal function used by nomoAuthHttp
 */
export async function nomoAuthFetch(args) {
    if (typeof args === "string") {
        args = { url: args };
    }
    if (!args.method) {
        args.method = "GET";
    }
    if (!args.headers) {
        args.headers = {};
    }
    if (isFallbackModeActive()) {
        return await simulateNomoAuthHttp(args);
    }
    return await invokeNomoFunction("nomoAuthHttp", args);
}
/**
 * a map from nomo-auth-addr to JWT
 */
const _cachedJWTs = {};
function _injectNomoAuthHeaders({ nomoAuthAddress, url, headers, }) {
    headers["nomo-auth-addr"] = nomoAuthAddress;
    headers["nomo-auth-version"] = "1.0.0";
    headers["nomo-webon"] = "WebOnName/WebOnVersion";
    const jwt = _cachedJWTs[nomoAuthAddress];
    if (jwt) {
        headers["nomo-sig"] = _nomoSignMessageSimulation({ jwt, url });
        headers["Authorization"] = `Bearer ${jwt}`;
    }
}
function _nomoSignMessageSimulation({ jwt, url, }) {
    console.log("Nomo-Auth: simulate signature for url " + url);
    // nomoSignMessage is not implemented in simulation-mode, therefore we return a hardcoded signature
    return "HCaJ9SEvzyRXGbtDmtvZxErBLgyiOGWtAjBwavyWqhaBFsQB4MzjiHgaF9Ia2MA9IOfZ5W/fUC56UXzE96IN6nk=";
}
/**
 * This is a browser-simulation of the Nomo-Auth-Protocol.
 */
export async function simulateNomoAuthHttp(args) {
    var _a;
    // We hardcode "nomo-auth-addr" for the simulation mode.
    // In the real Nomo-App, "nomo-auth-addr" is different for each domain.
    const nomoAuthAddress = "cNpBzxornzED1MsBKDupMbwqZnkFtoUVGD";
    const headers = (_a = args.headers) !== null && _a !== void 0 ? _a : {};
    _injectNomoAuthHeaders({ nomoAuthAddress, url: args.url, headers });
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
        _cachedJWTs[nomoAuthAddress] = jwt;
        _injectNomoAuthHeaders({ nomoAuthAddress, url: args.url, headers });
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
