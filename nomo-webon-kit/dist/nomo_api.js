import { invokeNomoFunction, isFallbackModeActive } from "./dart_interface";
import { nomoAuthFetch } from "./nomo_auth";
import { compareSemanticVersions } from "./util";
/**
 * Gets details about the execution environment of the WebOn.
 * See the advanced docs for more details about execution modes: https://github.com/nomo-app/nomo-webon-kit/tree/main/advanced-docs
 *
 * Since Nomo App 0.3.4.
 */
export async function nomoGetExecutionMode() {
    if (isFallbackModeActive()) {
        return {
            executionMode: "FALLBACK",
            hostingMode: null,
            webView: "not_in_nomo_app",
            cardMode: null,
        };
    }
    return await invokeNomoFunction("nomoGetExecutionMode", null);
}
/**
 * nomoLocalStorage provides a mechanism for sharing data between WebOns.
 * If a webon_id is passed to nomoLocalStorage.getItem, then it tries to read data from another WebOn with the given webon_id.
 * nomoLocalStorage can also be used as an alternative to the regular localStorage.
 */
export const nomoLocalStorage = {
    getItem: async function (key, options) {
        if (isFallbackModeActive()) {
            return localStorage.getItem(key);
        }
        const rawResult = await invokeNomoFunction("nomoGetItem", { key, options });
        return rawResult.value;
    },
    setItem: async function (key, value) {
        if (isFallbackModeActive()) {
            localStorage.setItem(key, value);
            return;
        }
        await invokeNomoFunction("nomoSetItem", { key, value });
    },
    removeItem: async function (key) {
        if (isFallbackModeActive()) {
            localStorage.removeItem(key);
            return;
        }
        await invokeNomoFunction("nomoRemoveItem", { key });
    },
};
/**
 * The nomo-object exposes WebOn-functions in an easy-to-use way.
 * The nomo-object can be used with only one import and supports the auto-completion of IDEs.
 */
export const nomo = {
    getExecutionMode: nomoGetExecutionMode,
    signEvmTransaction: nomoSignEvmTransaction,
    signEvmMessage: nomoSignEvmMessage,
    getPlatformInfo: nomoGetPlatformInfo,
    getMessengerAddress: nomoGetMessengerAddress,
    getWalletAddresses: nomoGetWalletAddresses,
    injectQRCode: nomoInjectQRCode,
    takePicture: nomoTakePicture,
    pickFromGallery: nomoPickFromGallery,
    getTheme: nomoGetTheme,
    getDeviceHashes: nomoGetDeviceHashes,
    getDeviceName: nomoGetDeviceName,
    authHttp: nomoAuthHttp,
    sendAssets: nomoSendAssets,
    nativeLog: nomoNativeLog,
    localStorage: nomoLocalStorage,
    enableMobileConsoleDebugging: nomoEnableMobileConsoleDebugging,
    qrScan: nomoQrScan,
    injectIntoWebOn: nomoInjectIntoWebOn,
    mnemonicBackupExisted: nomoMnemonicBackupExisted,
    registerOnWebOnVisible: nomoRegisterOnWebOnVisible,
    getLanguage: nomoGetLanguage,
    addCustomToken: nomoAddCustomToken,
    getVisibleAssets: nomoGetVisibleAssets,
    getEvmAddress: nomoGetEvmAddress,
    selectAssetFromDialog: nomoSelectAssetFromDialog,
    getManifest: nomoGetManifest,
    launchUrl: nomoLaunchUrl,
    getBalance: nomoGetBalance,
    getAssetIcon: nomoGetAssetIcon,
    openFAQPage: nomoOpenFAQPage,
    getInstalledWebOns: nomoGetInstalledWebOns,
    installWebOn: nomoInstallWebOn,
    uninstallWebOn: nomoUninstallWebOn,
    launchSmartchainFaucet: nomoLaunchSmartchainFaucet,
    hasMinimumNomoVersion: hasMinimumNomoVersion,
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
    log: function (...args) {
        originalConsoleLog(...args);
        nomoNativeLog("LOG", args);
    },
    info: function (...args) {
        originalConsoleInfo(...args);
        nomoNativeLog("INFO", args);
    },
    warn: function (...args) {
        originalConsoleWarn(...args);
        nomoNativeLog("WARN", args);
    },
    error: function (...args) {
        originalConsoleError(...args);
        nomoNativeLog("ERROR", args);
    },
};
let consoleOverwriten = false;
/**
 * After calling this function, console logs are visible in the
 * mobile DevDev-mode of the Nomo App.
 * For the Desktop DevDev-mode, this function is not necessary.
 */
export function nomoEnableMobileConsoleDebugging() {
    if (!consoleOverwriten) {
        consoleOverwriten = true;
        console.log("overwriting console-functions to enable mobile dev mode...");
        console.log = nomoConsole.log;
        console.info = nomoConsole.info;
        console.warn = nomoConsole.warn;
        console.error = nomoConsole.error;
    }
}
/**
 * Opens the camera to scan a qrCode.
 * Returns a raw qrCode or a list of comma-separated qrCodes.
 *
 * Needs nomo.permission.CAMERA.
 */
export async function nomoQrScan() {
    return await invokeNomoFunction("nomoQrScan", {});
}
/**
 * An alternative to JSON.stringify
 */
export function stringifyWithBigInts(obj) {
    function replacer(_key, value) {
        // workaround for stringifying an object with bigints
        if (typeof value === "bigint") {
            return value.toString();
        }
        return value;
    }
    const resJson = JSON.stringify(obj, replacer, 1);
    return resJson;
}
function nomoNativeLog(severity, args) {
    if (isFallbackModeActive()) {
        return;
    }
    try {
        const argsArray = args.map((arg) => stringifyWithBigInts(arg));
        invokeNomoFunction("nomoNativeLog", { argsArray, severity });
    }
    catch (e) {
        originalConsoleError(e);
    }
}
/**
 * Creates a signature for an EVM-based transaction.
 * See EthersjsNomoSigner for an example on how to use this function.
 *
 * Needs nomo.permission.SIGN_EVM_TRANSACTION.
 */
export async function nomoSignEvmTransaction(args) {
    // a fallback mode is implemented in EthersjsNomoSigner
    return await invokeNomoFunction("nomoSignEvmTransaction", args);
}
/**
 * Creates an Ethereum-styled message signature.
 * The resulting signature is not usable for submitting transactions,
 * but it can be used as a proof that the user controls a wallet.
 *
 * Needs nomo.permission.SIGN_EVM_MESSAGE.
 */
export async function nomoSignEvmMessage(args) {
    if (isFallbackModeActive()) {
        return {
            sigHex: "0x1e8fccc1f75eda4ee82adb9b3b0ae8243b418bd8810873b6df696d240267a223105e265189bd2ea0677bfa42f5d9cbba50622d91ef4e4805cd81f9f8715e38101b",
        };
    }
    return await invokeNomoFunction("nomoSignEvmMessage", args);
}
let _cachedPlatformInfo = null;
/**
 * Returns both the NOMO-version and the operating system where the WebOn runs.
 * Can be used for implementing platform-specific functionality.
 * See https://nomo.app/ for an overview of supported platforms.
 */
export async function nomoGetPlatformInfo() {
    if (isFallbackModeActive()) {
        return {
            version: "0.9.0",
            buildNumber: "123400",
            appName: "Not in Nomo app!",
            clientName: "Not in Nomo app!",
            operatingSystem: "unknown",
        };
    }
    if (!_cachedPlatformInfo) {
        _cachedPlatformInfo = await invokeNomoFunction("nomoGetPlatformInfo", null);
    }
    return _cachedPlatformInfo;
}
/**
 * This function checks at runtime if the Nomo App has a minimum version.
 * It is also possible to require a minimum Nomo App version in the manifest.
 */
export async function hasMinimumNomoVersion(args) {
    const plaformInfo = await nomoGetPlatformInfo();
    const nomoVersion = plaformInfo.version;
    const c = compareSemanticVersions(args.minVersion, nomoVersion);
    if (c > 0) {
        return { minVersionFulfilled: false, nomoVersion };
    }
    else {
        return { minVersionFulfilled: true, nomoVersion };
    }
}
/**
 * Can be used for chatting with other NOMO-users, but also for push-notifications or chat-bots.
 *
 * Needs nomo.permission.SEND_MESSAGE.
 */
export async function nomoGetMessengerAddress() {
    if (isFallbackModeActive()) {
        return {
            messengerAddress: "0x3f0e8cf0c6eb9789348541d9d0ce4ac847277e9b",
            inviteLink: "https://nomo.id/@0x6b65b7eadc7544dcf04869136466ba6224e799a2:zeniq.chat",
        };
    }
    return await invokeNomoFunction("nomoGetMessengerAddress", null);
}
/**
 * Returns blockchain-addresses of the NOMO-user.
 */
export async function nomoGetWalletAddresses() {
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
export async function nomoInjectQRCode(args) {
    return await invokeNomoFunction("nomoInjectQRCode", args);
}
/**
 * Opens another WebOn on top of the current WebOn.
 * If the WebOn is not yet running, the WebOn will be launched.
 * If the WebOn is not yet installed, an error is thrown.
 * A payload can be passed to the WebOn.
 * Afterwards, the user may navigate back to the current WebOn by pressing the back button.
 *
 * Since Nomo App 0.3.4.
 */
export async function nomoInjectIntoWebOn(args) {
    return await invokeNomoFunction("nomoInjectIntoWebOn", args);
}
const imagePrefix = "data:image/png;base64,";
const fallbackImage = imagePrefix +
    "iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAIAAAD/gAIDAAAAE0lEQVR4nGP4wAAgkwB5Bh0pBAAAAABJRU5ErkJggg==";
/**
 * Opens the camera and returns a picture in base64-encoding.
 * The promise rejects if the user chooses to cancel.
 *
 * Needs nomo.permission.CAMERA.
 */
export async function nomoTakePicture(args) {
    if (isFallbackModeActive()) {
        return {
            path: "/data/user/0/app.nomo.debug/cache/6098a97a-e556-4711-a069-4809d3db0aeb5994719432468143068.jpg",
            imageBase64: fallbackImage,
        };
    }
    const rawRes = await invokeNomoFunction("nomoTakePicture", args !== null && args !== void 0 ? args : null);
    return Object.assign(Object.assign({}, rawRes), { imageBase64: imagePrefix + rawRes.imageBase64 });
}
/**
 * Opens an image-picker and returns an image in base64-encoding.
 * The promise rejects if the user chooses to cancel.
 *
 * Needs nomo.permission.READ_MEDIA.
 */
export async function nomoPickFromGallery(args) {
    if (isFallbackModeActive()) {
        return {
            path: "/data/user/0/app.nomo.debug/cache/6098a97a-e556-4711-a069-4809d3db0aeb5994719432468143068.jpg",
            imageBase64: fallbackImage,
        };
    }
    const rawRes = await invokeNomoFunction("nomoPickFromGallery", args !== null && args !== void 0 ? args : null);
    return Object.assign(Object.assign({}, rawRes), { imageBase64: imagePrefix + rawRes.imageBase64 });
}
/**
 * "nomoGetTheme" is a low-level function that should not be called directly. Instead, the functions in "nomo_theming" should be used.
 */
export async function nomoGetTheme() {
    return await invokeNomoFunction("nomoGetTheme", null);
}
/**
 * Returns a comma-separated list of device hashes.
 * Can be used for fingerprinting devices.
 *
 * Needs nomo.permission.DEVICE_FINGERPRINTING.
 */
export async function nomoGetDeviceHashes() {
    if (isFallbackModeActive()) {
        return {
            deviceHashes: "b6Qz6EEKg,m2wAyKypQ,d67rq8zvw,pHcGGpnD5,iBFGnwEoE,vBhmQwyos,aGGJKq2QG,o9q6MhCeA,s9KLx6CVa,f7nin76st,rF3JVtwjV,u3txrGJEW",
        };
    }
    return await invokeNomoFunction("nomoGetDeviceHashes", null);
}
/**
 * Returns a human-readable name of the device.
 *
 * Needs nomo.permission.DEVICE_FINGERPRINTING.
 */
export async function nomoGetDeviceName() {
    if (isFallbackModeActive()) {
        return {
            deviceName: "Browser fallback mode: No device name outside of Nomo app",
        };
    }
    return await invokeNomoFunction("nomoGetDeviceName", null);
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
export async function nomoAuthHttp(args) {
    return await nomoAuthFetch(args);
}
/**
 * Opens a confirmation-dialog to send assets away from the Nomo App.
 * Assets are only sent if the user confirms the dialog.
 * "amount" should be a string that can be parsed by "BigInt.parse":  https://api.flutter.dev/flutter/dart-core/BigInt/parse.html
 *
 * Needs nomo.permission.SEND_ASSETS.
 */
export async function nomoSendAssets(args) {
    return await invokeNomoFunction("nomoSendAssets", args);
}
/**
 * If true, then the user has made a backup of their 12 words (at some point in the past).
 * If false, then there exists no backup and the 12 words will get lost with a high probability.
 */
export async function nomoMnemonicBackupExisted() {
    if (isFallbackModeActive()) {
        return { mnemonicBackupExisted: false };
    }
    return await invokeNomoFunction("nomoMnemonicBackupExisted", {});
}
/**
 * Registers a callback that will be called every time when the WebOn gets visible within the Nomo App.
 * For example, this can be used to refresh data when re-opening a WebOn after a long pause.
 *
 * Since Nomo App 0.3.4.
 */
export async function nomoRegisterOnWebOnVisible(callback) {
    window.onWebOnVisible = callback;
    if (isFallbackModeActive()) {
        return;
    }
    return await invokeNomoFunction("nomoEnableOnWebOnVisible", {});
}
/**
 * Returns the currently selected language of the Nomo App.
 */
export async function nomoGetLanguage() {
    if (isFallbackModeActive()) {
        return { language: "en" };
    }
    return await invokeNomoFunction("nomoGetLanguage", {});
}
/**
 * Adds a custom token to the list of visible assets in the Nomo Wallet.
 * Before that, it opens a dialog for the user to confirm.
 *
 * Needs nomo.permission.ADD_CUSTOM_TOKEN.
 */
export async function nomoAddCustomToken(args) {
    return await invokeNomoFunction("nomoAddCustomToken", args);
}
/**
 * Returns a list of assets that are currently visible in the Nomo Wallet.
 */
export async function nomoGetVisibleAssets() {
    if (isFallbackModeActive()) {
        return {
            visibleAssets: [
                {
                    name: "AVINOC",
                    symbol: "AVINOC ZEN20",
                    decimals: 18,
                    contractAddress: "0xF1cA9cb74685755965c7458528A36934Df52A3EF",
                },
            ],
        };
    }
    return await invokeNomoFunction("nomoGetVisibleAssets", {});
}
let cachedEvmAddress = null;
/**
 * A convenience function to get the Smartchain address of the Nomo Wallet.
 * Internally, it calls "nomoGetWalletAddresses" and caches the result.
 */
export async function nomoGetEvmAddress() {
    if (!cachedEvmAddress) {
        const res = await nomoGetWalletAddresses();
        cachedEvmAddress = res.walletAddresses["ETH"];
    }
    return cachedEvmAddress;
}
/**
 * Opens a dialog for the user to select an asset.
 * If the dialog does not look "correct", WebOns are free to call "nomoGetVisibleAssets" and implement their own dialog.
 */
export async function nomoSelectAssetFromDialog() {
    if (isFallbackModeActive()) {
        return {
            selectedAsset: {
                name: "AVINOC",
                symbol: "AVINOC ZEN20",
                decimals: 18,
                balance: "1000000000000000000",
                contractAddress: "0xF1cA9cb74685755965c7458528A36934Df52A3EF",
                receiveAddress: "0xF1cA9cb74685755965c7458528A36934Df52A3EF",
            },
        };
    }
    return await invokeNomoFunction("nomoSelectAssetFromDialog", {});
}
/**
 * Returns the nomo_manifest.json that was used during the installation of the WebOn.
 * For example, this can be used by a WebOn for checking its own version.
 */
export async function nomoGetManifest() {
    return await invokeNomoFunction("nomoGetManifest", {});
}
/**
 * Passes a URL to the underlying platform for handling.
 */
export async function nomoLaunchUrl(args) {
    return await invokeNomoFunction("nomoLaunchUrl", args);
}
/**
 * Returns not only the balance of an asset, but also additional information like the network, a contract-address and a receive-address.
 * Typically, the decimals are needed to convert a raw balance into a user-readable balance.
 */
export async function nomoGetBalance(args) {
    return await invokeNomoFunction("nomoGetBalance", args);
}
/**
 * Returns a set of URLs that contain icons of the asset.
 * May throw an error if no icons can be found.
 */
export async function nomoGetAssetIcon(args) {
    return await invokeNomoFunction("nomoGetAssetIcon", args);
}
/**
 * Opens a standardized FAQ page in Nomo design.
 * "faqContent" should be a nested object of questions and answers (with depth=2).
 * Optionally, a button for contacting support is shown below of the FAQs.
 */
export async function nomoOpenFAQPage(args) {
    return await invokeNomoFunction("nomoOpenFAQPage", args);
}
/**
 * Gets all manifests of the installed WebOns, including information like name/id/version.
 *
 * Needs nomo.permission.GET_INSTALLED_WEBONS.
 */
export async function nomoGetInstalledWebOns() {
    return await invokeNomoFunction("nomoGetInstalledWebOns", null);
}
/**
 * Installs a WebOn with or without user interaction.
 * See the README for an explanation about deeplinks.
 * Returns a stackTrace if the installation fails.
 *
 * Needs nomo.permission.INSTALL_WEBON.
 */
export async function nomoInstallWebOn(args) {
    return await invokeNomoFunction("nomoInstallWebOn", args);
}
/**
 * The reverse operation of nomoInstallWebOn.
 * Throws an error if the WebOn cannot be found.
 *
 * Needs nomo.permission.INSTALL_WEBON.
 * Since Nomo App 0.3.4.
 */
export async function nomoUninstallWebOn(args) {
    return await invokeNomoFunction("nomoUninstallWebOn", args);
}
/**
 * Launches a free faucet that can be used for paying transaction fees.
 */
export async function nomoLaunchSmartchainFaucet() {
    return await nomoInstallWebOn({
        deeplink: "https://nomo.app/webon/faucet.nomo.app",
        skipPermissionDialog: true,
        navigateBack: false,
    });
}
