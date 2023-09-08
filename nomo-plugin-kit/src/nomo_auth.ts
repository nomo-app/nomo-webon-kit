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
 * This is a browser-simulation of the Nomo-Auth-Protocol.
 */
export async function simulateNomoAuthHttp(args: {
  url: string;
  method?: "GET" | "POST";
  headers?: { [key: string]: string };
  body?: string;
}) {
  const injectedHeaders: { [key: string]: string } = {
    "nomo-auth-version": "1.0.0",
    "nomo-auth-addr": "cNpBzxornzED1MsBKDupMbwqZnkFtoUVGD",
  };
  let res = await fetch(args.url, {
    method: args.method,
    headers: { ...injectedHeaders, ...args.headers },
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
    injectedHeaders["Authorization"] = "Bearer " + jwt;
    injectedHeaders["nomo-sig"] =
      "HCaJ9SEvzyRXGbtDmtvZxErBLgyiOGWtAjBwavyWqhaBFsQB4MzjiHgaF9Ia2MA9IOfZ5W/fUC56UXzE96IN6nk=";
    res = await fetch(args.url, {
      method: args.method,
      headers: { ...injectedHeaders, ...args.headers },
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
