/**
 * nomoLocalStorage provides a mechanism for sharing data between plugins.
 * If a plugin_id is passed to nomoLocalStorage.getItem, then it tries to read data from another plugin with the given plugin_id.
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
 * The nomo-object exposes plugin-functions in an easy-to-use way.
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
 * Returns both the NOMO-version and the operating system where the plugin runs.
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
 * This is a low-level function that should not be called directly. Instead, the functions in "nomo_theming" should be used.
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
export {};
