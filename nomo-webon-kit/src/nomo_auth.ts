import { invokeNomoFunction, isFallbackModeActive } from "./dart_interface";
import { nomoGetManifest } from "./nomo_multi_webons";
import { isHexString, sha256 } from "./util";

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
export async function nomoSignAuthMessage(args: {
  message: string;
  url: string;
}): Promise<{
  ethAddress: string;
  ethSig: string;
  authAddress: string;
  authSig: string;
}> {
  if (isFallbackModeActive()) {
    // Instead of those hardcoded address/signature-pairs, you could pass a custom signer to "nomoAuthFetch"
    return {
      ethAddress: "0xF1cA9cb74685755965c7458528A36934Df52A3EF",
      ethSig:
        "0x67d10b371a75ac6d20c2af83c9e14edec60567b3bc181b0b971bbea1888146e87e0b0dd6ca45453749171ec99522ffd061ccebeafff89ed9d95d6a3f8da3660b1b",
      authAddress: "cNpBzxornzED1MsBKDupMbwqZnkFtoUVGD",
      authSig:
        "HCaJ9SEvzyRXGbtDmtvZxErBLgyiOGWtAjBwavyWqhaBFsQB4MzjiHgaF9Ia2MA9IOfZ5W/fUC56UXzE96IN6nk=",
    };
  }
  return await invokeNomoFunction("nomoSignAuthMessage", args);
}

/**
 * A browser-implementation of the Nomo-Auth-Protocol.
 * It is similar to nomoAuthHttp, but it is implemented in JavaScript instead of the native layer.
 * Therefore, is much easier to debug or modify, although it cannot bypass CORS.
 */
export async function nomoAuthFetch(args: {
  url: string;
  method?: "GET" | "POST";
  headers?: { [key: string]: string };
  body?: string | { [key: string]: any };
  signer?: typeof nomoSignAuthMessage;
}): Promise<{
  statusCode: number;
  response: string;
}> {
  fillMissingArgs(args);

  const signer: typeof nomoSignAuthMessage = args.signer ?? nomoSignAuthMessage;

  const headers: { [key: string]: string } = args.headers ?? {};
  await _injectNomoAuthHeaders({
    signer,
    url: args.url,
    headers,
  });

  let res = await fetch(args.url, {
    method: args.method,
    headers,
    body: typeof args.body === "string" ? args.body : JSON.stringify(args.body),
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
    await _injectNomoAuthHeaders({
      signer,
      url: args.url,
      headers,
    });
    res = await fetch(args.url, {
      method: args.method,
      headers,
      body:
        typeof args.body === "string" ? args.body : JSON.stringify(args.body),
    });
    statusCode = res.status;
    resBody = await res.json();
  }
  return {
    statusCode,
    response: JSON.stringify(resBody),
  };
}

async function _injectNomoAuthHeaders({
  signer,
  url,
  headers,
}: {
  signer: typeof nomoSignAuthMessage;
  url: string;
  headers: { [key: string]: string };
}) {
  const domain = new URL(url).hostname;
  const jwt = localStorage.getItem(domain) ?? null;
  const messageToSign = jwt ?? "dummyMessage";
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
export async function nomoAuthHttp(
  args:
    | {
        url: string;
        method?: "GET" | "POST";
        headers?: { [key: string]: string };
        body?: string | { [key: string]: any };
      }
    | string
): Promise<{
  statusCode: number;
  response: string;
}> {
  if (typeof args === "string") {
    args = { url: args };
  }
  fillMissingArgs(args);
  if (isFallbackModeActive()) {
    return await nomoAuthFetch(args);
  }
  return await invokeNomoFunction("nomoAuthHttp", args);
}

function fillMissingArgs(args: {
  url: string;
  method?: "GET" | "POST";
  headers?: { [key: string]: string };
  body?: string | { [key: string]: any };
}) {
  if (!args.method) {
    args.method = "GET";
  }
  if (!args.headers) {
    args.headers = {};
  }
}

/**
 * Some API-endpoints require this proof-of-work in order to make denial-of-service attacks more expensive.
 */
export async function nomoProofOfWork(args: {
  shaInputPrefix: string;
  challenge: string;
}): Promise<{ shaInput: string }> {
  if (!args.shaInputPrefix) {
    throw new Error("shaInputPrefix must not be empty");
  }
  args.challenge = args.challenge.replace("0x", "");
  if (!isHexString(args.challenge)) {
    throw new Error("challenge must be a hex string");
  }
  if (args.challenge.length > 8) {
    throw new Error("challenge must not short enough to keep it fast enough");
  }
  if (isFallbackModeActive()) {
    for (let n = 0; ; n++) {
      const shaInput = args.shaInputPrefix + n.toString();
      const digest = await sha256(shaInput);
      if (digest.toLowerCase().startsWith(args.challenge.toLowerCase())) {
        return { shaInput };
      }
    }
  }
  return await invokeNomoFunction("nomoProofOfWork", args);
}
