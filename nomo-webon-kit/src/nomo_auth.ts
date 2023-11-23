import { invokeNomoFunction, isFallbackModeActive } from "./dart_interface";

/**
 * An internal function used by nomoAuthHttp
 */
export async function nomoAuthFetch(
  args:
    | {
        url: string;
        method?: "GET" | "POST";
        headers?: { [key: string]: string };
        body?: string;
      }
    | string
): Promise<{
  statusCode: number;
  response: string;
}> {
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
const _cachedJWTs: Record<string, string> = {};

function _injectNomoAuthHeaders({
  nomoAuthAddress,
  nomoEthAddress,
  url,
  headers,
}: {
  nomoAuthAddress: string;
  nomoEthAddress: string;
  url: string;
  headers: { [key: string]: string };
}) {
  headers["nomo-auth-addr"] = nomoAuthAddress;
  headers["nomo-eth-addr"] = nomoEthAddress;
  headers["nomo-auth-version"] = "1.1.0";
  headers["nomo-webon"] = "WebOnName/WebOnVersion";
  const jwt = _cachedJWTs[nomoAuthAddress];
  if (jwt) {
    const { authSig, ethSig } = _nomoSignMessageSimulation({ jwt, url });
    headers["nomo-sig"] = authSig;
    headers["nomo-eth-sig"] = ethSig;
    headers["Authorization"] = `Bearer ${jwt}`;
  }
}

function _nomoSignMessageSimulation({
  jwt,
  url,
}: {
  jwt: string;
  url: string;
}): { authSig: string; ethSig: string } {
  console.log("Nomo-Auth: simulate signatures for url " + url);
  // signing is not implemented in simulation-mode, therefore we return a hardcoded signatures
  return {
    authSig:
      "HCaJ9SEvzyRXGbtDmtvZxErBLgyiOGWtAjBwavyWqhaBFsQB4MzjiHgaF9Ia2MA9IOfZ5W/fUC56UXzE96IN6nk=",
    ethSig:
      "0x67d10b371a75ac6d20c2af83c9e14edec60567b3bc181b0b971bbea1888146e87e0b0dd6ca45453749171ec99522ffd061ccebeafff89ed9d95d6a3f8da3660b1b",
  };
}

/**
 * This is a browser-simulation of the Nomo-Auth-Protocol.
 */
export async function simulateNomoAuthHttp(args: {
  url: string;
  method?: "GET" | "POST";
  headers?: { [key: string]: string };
  body?: string;
}) {
  // We hardcode "nomo-auth-addr" for the simulation mode.
  // In the real Nomo-App, "nomo-auth-addr" will be different for each domain.
  // In contrast, "nomo-eth-addr" will be the same for all domains and only depend on the wallet.
  const nomoAuthAddress = "cNpBzxornzED1MsBKDupMbwqZnkFtoUVGD";
  const nomoEthAddress = "0xF1cA9cb74685755965c7458528A36934Df52A3EF";

  const headers: { [key: string]: string } = args.headers ?? {};
  _injectNomoAuthHeaders({
    nomoAuthAddress,
    nomoEthAddress,
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
    _cachedJWTs[nomoAuthAddress] = jwt;
    _injectNomoAuthHeaders({
      nomoAuthAddress,
      nomoEthAddress,
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
