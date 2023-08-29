import { invokeNomoFunction, isFallbackModeActive } from "./dart_interface";

/**
 * nomoLocalStorage provides a mechanism for sharing data between plugins.
 * If a plugin_id is passed to nomoLocalStorage.getItem, then it tries to read data from another plugin with the given plugin_id.
 * nomoLocalStorage can also be used as an alternative to the regular localStorage.
 */
export const nomoLocalStorage = {
  getItem: async function (
    key: string,
    options?: { plugin_id: string }
  ): Promise<String | null> {
    if (isFallbackModeActive()) {
      return localStorage.getItem(key);
    }
    const rawResult = await invokeNomoFunction("nomoGetItem", { key, options });
    return rawResult.value;
  },
  setItem: async function (key: string, value: string): Promise<void> {
    if (isFallbackModeActive()) {
      localStorage.setItem(key, value);
      return;
    }
    await invokeNomoFunction("nomoSetItem", { key, value });
  },
  removeItem: async function (key: string): Promise<void> {
    if (isFallbackModeActive()) {
      localStorage.removeItem(key);
      return;
    }
    await invokeNomoFunction("nomoRemoveItem", { key });
  },
};

/**
 * The nomo-object exposes plugin-functions in an easy-to-use way.
 * The nomo-object can be used with only one import and supports the auto-completion of IDEs.
 */
export const nomo = {
  signEvmTransaction: nomoSignEvmTransaction,
  signEvmMessage: nomoSignEvmMessage,
  getPlatformInfo: nomoGetPlatformInfo,
  getMessengerAddress: nomoGetMessengerAddress,
  getWalletAddresses: nomoGetWalletAddresses,
  injectQRCode: nomoInjectQRCode,
  takePicture: nomoTakePicture,
  pickFromGallery: nomoPickFromGallery,
  getTheme: nomoGetTheme,
  authHttp: nomoAuthHttp,
  sendAssets: nomoSendAssets,
  nativeLog: nomoNativeLog,
  localStorage: nomoLocalStorage,
};

const originalConsoleLog = console.log;
const originalConsoleInfo = console.info;
const originalConsoleWarn = console.warn;
const originalConsoleError = console.error;

/**
 * A set of logging-functions to enable debugging with the Nomo dev mode.
 * You should not need to call this directly, since it will be called automatically when calling
 * console.log/console.error/console.warn/console.info.
 */
export const nomoConsole = {
  log: function (...args: any[]) {
    originalConsoleLog(...args);
    nomoNativeLog("LOG", args);
  },
  info: function (...args: any[]) {
    originalConsoleInfo(...args);
    nomoNativeLog("INFO", args);
  },
  warn: function (...args: any[]) {
    originalConsoleWarn(...args);
    nomoNativeLog("WARN", args);
  },
  error: function (...args: any[]) {
    originalConsoleError(...args);
    nomoNativeLog("ERROR", args);
  },
};

export let consoleOverwriten: boolean = false;
function overwriteConsole() {
  if (!consoleOverwriten) {
    consoleOverwriten = true;
    console.log("overwriting console-functions to enable mobile dev mode...");
    console.log = nomoConsole.log;
    console.info = nomoConsole.info;
    console.warn = nomoConsole.warn;
    console.error = nomoConsole.error;
  }
}
overwriteConsole();

function nomoNativeLog(
  severity: "LOG" | "INFO" | "WARN" | "ERROR",
  args: any[]
) {
  if (isFallbackModeActive()) {
    return;
  }
  try {
    const argsArray = args.map((arg) => JSON.stringify(arg));
    invokeNomoFunction("nomoNativeLog", { argsArray, severity });
  } catch (e) {
    originalConsoleError(e);
  }
}

/**
 * Creates a signature for an EVM-based transaction.
 * See EthersjsNomoSigner for an example on how to use this function.
 */
export async function nomoSignEvmTransaction(args: {
  messageHex: string;
}): Promise<{ sigHex: string }> {
  // a fallback mode is implemented in EthersjsNomoSigner
  return await invokeNomoFunction("nomoSignEvmTransaction", args);
}

/**
 * Creates an Ethereum-styled message signature.
 * The resulting signature is not usable for submitting transactions,
 * but it can be used as a proof that the user controls a wallet.
 */
export async function nomoSignEvmMessage(args: {
  message: string;
}): Promise<{ sigHex: string }> {
  if (isFallbackModeActive()) {
    return {
      sigHex:
        "0x1e8fccc1f75eda4ee82adb9b3b0ae8243b418bd8810873b6df696d240267a223105e265189bd2ea0677bfa42f5d9cbba50622d91ef4e4805cd81f9f8715e38101b",
    };
  }
  return await invokeNomoFunction("nomoSignEvmMessage", args);
}

/**
 * Returns both the NOMO-version and the operating system where the plugin runs.
 * Can be used for implementing platform-specific functionality.
 * See https://nomo.app/ for an overview of supported platforms.
 */
export async function nomoGetPlatformInfo(): Promise<{
  version: string;
  buildNumber: string;
  appName: string;
  clientName: string;
  operatingSystem: string;
}> {
  if (isFallbackModeActive()) {
    return {
      version: "0.2.0",
      buildNumber: "123400",
      appName: "Not in Nomo app!",
      clientName: "Not in Nomo app!",
      operatingSystem: "unknown",
    };
  }
  return await invokeNomoFunction("nomoGetPlatformInfo", null);
}

/**
 * Can be used for chatting with other NOMO-users, but also for push-notifications or chat-bots.
 */
export async function nomoGetMessengerAddress(): Promise<{
  messengerAddress: string;
  inviteLink: string;
}> {
  if (isFallbackModeActive()) {
    return {
      messengerAddress: "0x3f0e8cf0c6eb9789348541d9d0ce4ac847277e9b",
      inviteLink:
        "https://nomo.id/@0x6b65b7eadc7544dcf04869136466ba6224e799a2:zeniq.chat",
    };
  }
  return await invokeNomoFunction("nomoGetMessengerAddress", null);
}

/**
 * Returns blockchain-addresses of the NOMO-user.
 */
export async function nomoGetWalletAddresses(): Promise<{
  walletAddresses: Record<string, string>;
}> {
  if (isFallbackModeActive()) {
    return {
      walletAddresses: {
        ETH: "0xF1cA9cb74685755965c7458528A36934Df52A3EF",
        ZENIQ: "meXd5DAdJYadrgssPVY9sTu1Z1YNJGH9R3",
      },
    };
  }
  return await invokeNomoFunction("nomoGetWalletAddresses", null);
}

/**
 * Injecting QRCodes is useful for multiple purposes.
 * For example, new chats can be opened by injecting a chat-invitation-link.
 * Also the NOMO-ID protocol works by injecting QRCodes.
 */
export async function nomoInjectQRCode(args: {
  qrCode: string;
  navigateBack: boolean;
}): Promise<void> {
  return await invokeNomoFunction("nomoInjectQRCode", args);
}

const imagePrefix = "data:image/png;base64,";
const fallbackImage =
  imagePrefix +
  "iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAIAAAD/gAIDAAAAE0lEQVR4nGP4wAAgkwB5Bh0pBAAAAABJRU5ErkJggg==";
/**
 * Opens the camera and returns a picture in base64-encoding.
 * The promise rejects if the user chooses to cancel.
 */
export async function nomoTakePicture(): Promise<{
  path: string;
  imageBase64: string;
}> {
  if (isFallbackModeActive()) {
    return {
      path: "/data/user/0/app.nomo.debug/cache/6098a97a-e556-4711-a069-4809d3db0aeb5994719432468143068.jpg",
      imageBase64: fallbackImage,
    };
  }
  const rawRes = await invokeNomoFunction("nomoTakePicture", null);
  return {
    ...rawRes,
    imageBase64: imagePrefix + rawRes.imageBase64,
  };
}

/**
 * Opens an image-picker and returns an image in base64-encoding.
 * The promise rejects if the user chooses to cancel.
 */
export async function nomoPickFromGallery(): Promise<{
  path: string;
  imageBase64: string;
}> {
  if (isFallbackModeActive()) {
    return {
      path: "/data/user/0/app.nomo.debug/cache/6098a97a-e556-4711-a069-4809d3db0aeb5994719432468143068.jpg",
      imageBase64: fallbackImage,
    };
  }
  const rawRes = await invokeNomoFunction("nomoPickFromGallery", null);
  return {
    ...rawRes,
    imageBase64: imagePrefix + rawRes.imageBase64,
  };
}

/**
 * Returns the current theme of the NOMO app.
 */
export async function nomoGetTheme(): Promise<{
  name: string;
  displayName: string;
  colors: {
    primary: string;
    onPrimary: string;
    primaryContainer: string;
    secondary: string;
    onSecondary: string;
    secondaryContainer: string;
    background: string;
    surface: string;
    foreground1: string;
    foreground2: string;
    foreground3: string;
    snackBarColor: string;
    disabledColor: string;
    error: string;
    settingsTileColor: string;
    settingsColumnColor: string;
  };
}> {
  if (isFallbackModeActive()) {
    return {
      name: "LIGHT",
      displayName: "Nomo Light",
      colors: {
        primary: "0xffbca570",
        onPrimary: "0xffffffff",
        primaryContainer: "0xfffcfaf7",
        secondary: "0xffd1af72",
        onSecondary: "0xff000000",
        secondaryContainer: "0xffe6d0a3",
        background: "0xfff5f5f5",
        surface: "0xffffffff",
        foreground1: "0xcf000000",
        foreground2: "0xdf000000",
        foreground3: "0xef000000",
        snackBarColor: "0xfffff7e5",
        disabledColor: "0xffe0e0e0",
        error: "0xffff5252",
        settingsTileColor: "0xffffffff",
        settingsColumnColor: "0xffededed",
      },
    };
  }
  return await invokeNomoFunction("nomoGetTheme", null);
}

/**
 * This is a client-simulation of what the Nomo-app will do.
 * See the repo nomo-plugins/nomo-auth-backend-example for a server-example.
 */
async function simulateNomoAuthHttp(args: {
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

/**
 * A special http-function that implements the NOMO-Auth-Protocol.
 * NOMO-Auth allows a seamless authentication for supported backends.
 * Moreover, even if you do not use NOMO-Auth, you can still use this function for bypassing CORS/Same-Origin-Policy.
 * At a lower level, NOMO-Auth works by injecting the following http-headers into the request:
 * Authorization: "Bearer JWT"
 * nomo-sig: "Signature of JWT"
 * nomo-auth-addr: "an address derived by the NOMO-wallet"
 * nomo-auth-version: "version of NOMO-Auth"
 */
export async function nomoAuthHttp(
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
 * Opens a confirmation-dialog to send assets away from the NOMO-wallet.
 * Assets are only sent if the user confirms the dialog.
 */
export async function nomoSendAssets(args: {
  assetSymbol: string;
  targetAddress: string;
  amount: string;
}) {
  return await invokeNomoFunction("nomoSendAssets", args);
}
