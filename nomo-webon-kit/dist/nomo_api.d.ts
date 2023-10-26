/**
 * nomoLocalStorage provides a mechanism for sharing data between WebOns.
 * If a plugin_id is passed to nomoLocalStorage.getItem, then it tries to read data from another WebOn with the given plugin_id.
 * nomoLocalStorage can also be used as an alternative to the regular localStorage.
 */
export declare const nomoLocalStorage: {
    getItem: (key: string, options?: {
        plugin_id: string;
    }) => Promise<String | null>;
    setItem: (key: string, value: string) => Promise<void>;
    removeItem: (key: string) => Promise<void>;
};
/**
 * The nomo-object exposes WebOn-functions in an easy-to-use way.
 * The nomo-object can be used with only one import and supports the auto-completion of IDEs.
 */
export declare const nomo: {
    signEvmTransaction: typeof nomoSignEvmTransaction;
    signEvmMessage: typeof nomoSignEvmMessage;
    getPlatformInfo: typeof nomoGetPlatformInfo;
    getMessengerAddress: typeof nomoGetMessengerAddress;
    getWalletAddresses: typeof nomoGetWalletAddresses;
    injectQRCode: typeof nomoInjectQRCode;
    takePicture: typeof nomoTakePicture;
    pickFromGallery: typeof nomoPickFromGallery;
    getTheme: typeof nomoGetTheme;
    getDeviceHashes: typeof nomoGetDeviceHashes;
    getDeviceName: typeof nomoGetDeviceName;
    authHttp: typeof nomoAuthHttp;
    sendAssets: typeof nomoSendAssets;
    nativeLog: typeof nomoNativeLog;
    localStorage: {
        getItem: (key: string, options?: {
            plugin_id: string;
        }) => Promise<String | null>;
        setItem: (key: string, value: string) => Promise<void>;
        removeItem: (key: string) => Promise<void>;
    };
    enableMobileConsoleDebugging: typeof nomoEnableMobileConsoleDebugging;
    qrScan: typeof nomoQrScan;
    injectIntoPlugin: typeof nomoInjectIntoPlugin;
    mnemonicBackupExisted: typeof nomoMnemonicBackupExisted;
    registerOnPluginVisible: typeof nomoRegisterOnPluginVisible;
    getLanguage: typeof nomoGetLanguage;
    addCustomToken: typeof nomoAddCustomToken;
    getVisibleAssets: typeof nomoGetVisibleAssets;
    getEvmAddress: typeof nomoGetEvmAddress;
    selectAssetFromDialog: typeof nomoSelectAssetFromDialog;
    getManifest: typeof nomoGetManifest;
    launchUrl: typeof nomoLaunchUrl;
    getBalance: typeof nomoGetBalance;
    getAssetIcon: typeof nomoGetAssetIcon;
    openFAQPage: typeof nomoOpenFAQPage;
    getInstalledWebOns: typeof nomoGetInstalledWebOns;
    installWebOn: typeof nomoInstallWebOn;
    launchSmartchainFaucet: typeof nomoLaunchSmartchainFaucet;
    hasMinimumNomoVersion: typeof hasMinimumNomoVersion;
};
/**
 * A set of logging-functions to enable debugging with the Nomo dev mode.
 * You should not need to call this directly, since it will be called automatically when calling
 * console.log/console.error/console.warn/console.info.
 */
export declare const nomoConsole: {
    log: (...args: any[]) => void;
    info: (...args: any[]) => void;
    warn: (...args: any[]) => void;
    error: (...args: any[]) => void;
};
/**
 * After calling this function, console logs are visible in the
 * mobile dev mode of the Nomo App.
 */
export declare function nomoEnableMobileConsoleDebugging(): void;
/**
 * Opens the camera to scan a qrCode.
 * Returns a raw qrCode or a list of comma-separated qrCodes.
 */
export declare function nomoQrScan(): Promise<{
    qrCode: string;
}>;
/**
 * An alternative to JSON.stringify
 */
export declare function stringifyWithBigInts(obj: any): string;
declare function nomoNativeLog(severity: "LOG" | "INFO" | "WARN" | "ERROR", args: any[]): void;
/**
 * Creates a signature for an EVM-based transaction.
 * See EthersjsNomoSigner for an example on how to use this function.
 */
export declare function nomoSignEvmTransaction(args: {
    messageHex: string;
}): Promise<{
    sigHex: string;
}>;
/**
 * Creates an Ethereum-styled message signature.
 * The resulting signature is not usable for submitting transactions,
 * but it can be used as a proof that the user controls a wallet.
 */
export declare function nomoSignEvmMessage(args: {
    message: string;
}): Promise<{
    sigHex: string;
}>;
/**
 * Returns both the NOMO-version and the operating system where the WebOn runs.
 * Can be used for implementing platform-specific functionality.
 * See https://nomo.app/ for an overview of supported platforms.
 */
export declare function nomoGetPlatformInfo(): Promise<{
    version: string;
    buildNumber: string;
    appName: string;
    clientName: string;
    operatingSystem: string;
}>;
/**
 * This function checks at runtime if the Nomo App has a minimum version.
 * It is also possible to require a minimum Nomo App version in the manifest.
 */
export declare function hasMinimumNomoVersion(args: {
    minVersion: string;
}): Promise<{
    minVersionFulfilled: boolean;
    nomoVersion: string;
}>;
/**
 * Can be used for chatting with other NOMO-users, but also for push-notifications or chat-bots.
 */
export declare function nomoGetMessengerAddress(): Promise<{
    messengerAddress: string;
    inviteLink: string;
}>;
/**
 * Returns blockchain-addresses of the NOMO-user.
 */
export declare function nomoGetWalletAddresses(): Promise<{
    walletAddresses: Record<string, string>;
}>;
/**
 * Injecting QRCodes is useful for multiple purposes.
 * For example, new chats can be opened by injecting a chat-invitation-link.
 * Also the NOMO-ID protocol works by injecting QRCodes.
 */
export declare function nomoInjectQRCode(args: {
    qrCode: string;
    navigateBack: boolean;
}): Promise<void>;
/**
 * Opens another WebOn on top of the current WebOn.
 * If the WebOn is not yet running, the WebOn will be launched.
 * If the WebOn is not yet installed, an error is thrown.
 * A payload can be passed to the WebOn.
 * Afterwards, the user may navigate back to the current WebOn by pressing the back button.
 */
export declare function nomoInjectIntoPlugin(args: {
    payload: string;
    pluginId: string;
}): Promise<void>;
/**
 * Opens the camera and returns a picture in base64-encoding.
 * The promise rejects if the user chooses to cancel.
 */
export declare function nomoTakePicture(args?: {
    maxWidth?: number;
    maxHeight?: number;
    imageQuality?: number;
}): Promise<{
    path: string;
    imageBase64: string;
}>;
/**
 * Opens an image-picker and returns an image in base64-encoding.
 * The promise rejects if the user chooses to cancel.
 */
export declare function nomoPickFromGallery(args?: {
    maxWidth?: number;
    maxHeight?: number;
    imageQuality?: number;
}): Promise<{
    path: string;
    imageBase64: string;
}>;
/**
 * "nomoGetTheme" is a low-level function that should not be called directly. Instead, the functions in "nomo_theming" should be used.
 */
export declare function nomoGetTheme(): Promise<{
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
}>;
/**
 * Returns a comma-separated list of device hashes.
 * Can be used for fingerprinting devices.
 */
export declare function nomoGetDeviceHashes(): Promise<{
    deviceHashes: string;
}>;
/**
 * Returns a human-readable name of the device.
 */
export declare function nomoGetDeviceName(): Promise<{
    deviceName: string;
}>;
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
 * Opens a confirmation-dialog to send assets away from the NOMO-wallet.
 * Assets are only sent if the user confirms the dialog.
 */
export declare function nomoSendAssets(args: {
    assetSymbol: string;
    targetAddress: string;
    amount: string;
}): Promise<any>;
/**
 * If true, then the user has made a backup of their 12 words (at some point in the past).
 * If false, then there exists no backup and the 12 words will get lost with a high probability.
 */
export declare function nomoMnemonicBackupExisted(): Promise<{
    mnemonicBackupExisted: boolean;
}>;
/**
 * Registers a callback that will be called every time when the WebOn gets visible within the Nomo App.
 * For example, this can be used to refresh data when re-opening a WebOn after a long pause.
 */
export declare function nomoRegisterOnPluginVisible(callback: (args: {
    fullscreenMode: boolean;
}) => void): Promise<void>;
/**
 * Returns the currently selected language of the Nomo App.
 */
export declare function nomoGetLanguage(): Promise<{
    language: string;
}>;
/**
 * Adds a custom token to the list of visible assets in the Nomo Wallet.
 * Before that, it opens a dialog for the user to confirm.
 */
export declare function nomoAddCustomToken(args: {
    contractAddress: string;
    network: string;
}): Promise<void>;
/**
 * Returns a list of assets that are currently visible in the Nomo Wallet.
 */
export declare function nomoGetVisibleAssets(): Promise<{
    visibleAssets: Array<{
        name: string;
        symbol: string;
        decimals: number;
        contractAddress?: string;
    }>;
}>;
/**
 * A convenience function to get the Smartchain address of the Nomo Wallet.
 * Internally, it calls "nomoGetWalletAddresses" and caches the result.
 */
export declare function nomoGetEvmAddress(): Promise<string>;
/**
 * Opens a dialog for the user to select an asset.
 * If the dialog does not look "correct", WebOns are free to call "nomoGetVisibleAssets" and implement their own dialog.
 */
export declare function nomoSelectAssetFromDialog(): Promise<{
    selectedAsset: {
        name: string;
        symbol: string;
        decimals: number;
        balance: string;
        contractAddress?: string;
        receiveAddress: string | null;
        network?: string | null;
    };
}>;
/**
 * Returns the nomo_manifest.json that was used during the installation of the WebOn.
 * For example, this can be used by a WebOn for checking its own version.
 */
export declare function nomoGetManifest(): Promise<NomoManifest>;
/**
 * Passes a URL to the underlying platform for handling.
 */
export declare function nomoLaunchUrl(args: {
    url: string;
    launchMode: "platformDefault" | "inAppWebView" | "externalApplication" | "externalNonBrowserApplication";
}): Promise<any>;
/**
 * Returns not only the balance of an asset, but also additional information like the network, a contract-address and a receive-address.
 * Typically, the decimals are needed to convert a raw balance into a user-readable balance.
 */
export declare function nomoGetBalance(args: {
    assetSymbol: string;
}): Promise<{
    symbol: string;
    name: string;
    decimals: number;
    balance: string;
    contractAddress?: string | null;
    receiveAddress: string | null;
    network?: string | null;
}>;
/**
 * Returns a set of URLs that contain icons of the asset.
 * May throw an error if no icons can be found.
 */
export declare function nomoGetAssetIcon(args: {
    assetSymbol: string;
}): Promise<{
    large: string;
    small: string;
    thumb: string;
    isPending: boolean;
    symbol: string;
    name: string;
}>;
/**
 * Opens a standardized FAQ page in Nomo design.
 * "faqContent" should be a nested object of questions and answers (with depth=2).
 * Optionally, a button for contacting support is shown below of the FAQs.
 */
export declare function nomoOpenFAQPage(args: {
    faqContent: Record<string, Record<string, string>>;
    initiallyExpanded: boolean;
    supportButtonTitle?: string;
    supportButtonUrl?: string;
}): Promise<void>;
export interface NomoManifest {
    /**
     * If min_nomo_version is set, then outdated versions of the Nomo App will refuse to install the WebOn.
     */
    min_nomo_version?: string | null;
    /**
     * nomo_manifest_version should be 1.1.0.
     */
    nomo_manifest_version: string;
    /**
     * A list of permissions for security-critical features.
     */
    permissions: string[];
    /**
     * plugin_id should be the reverse-domain of a domain that is owned by the WebOn-author.
     * See https://en.wikipedia.org/wiki/Reverse_domain_name_notation for more details about the reverse domain name notation.
     */
    plugin_id: string;
    /**
     * plugin_name is the user-visible name of the WebOn.
     */
    plugin_name: string;
    /**
     * plugin_url is the URL that the Nomo App uses for installing the WebOn.
     * Typically, plugin_url gets extracted out of a deeplink that is supplied to the Nomo App.
     */
    plugin_url: string;
    /**
     * plugin_version should comply with the semantic versioning standard.
     * See https://semver.org/ for details.
     */
    plugin_version: string;
}
/**
 * Gets all manifests of the installed WebOns, including information like name/id/version.
 */
export declare function nomoGetInstalledWebOns(): Promise<{
    manifests: NomoManifest[];
}>;
/**
 * Installs a WebOn with or without user interaction.
 * See the README for an explanation about deeplinks.
 * Returns a stackTrace if the installation fails.
 */
export declare function nomoInstallWebOn(args: {
    deeplink: string;
    skipPermissionDialog: boolean;
}): Promise<void>;
/**
 * Launches a free faucet that can be used for paying transaction fees.
 */
export declare function nomoLaunchSmartchainFaucet(): Promise<void>;
export {};