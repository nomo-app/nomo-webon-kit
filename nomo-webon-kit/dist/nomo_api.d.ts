import * as web3 from "./nomo_web3";
import * as multi from "./nomo_multi_webons";
import * as media from "./nomo_media";
import * as platform from "./nomo_platform";
import * as theming from "./nomo_theming";
import * as auth from "./nomo_auth";
/**
 * The nomo-object exposes WebOn-functions in an easy-to-use way.
 * The nomo-object can be used with only one import and supports the auto-completion of IDEs.
 */
export declare const nomo: {
    signEvmTransaction: typeof web3.nomoSignEvmTransaction;
    signEvmMessage: typeof web3.nomoSignEvmMessage;
    sendAssets: typeof web3.nomoSendAssets;
    selectAssetFromDialog: typeof web3.nomoSelectAssetFromDialog;
    getEvmAddress: typeof web3.nomoGetEvmAddress;
    getWalletAddresses: typeof web3.nomoGetWalletAddresses;
    getVisibleAssets: typeof web3.nomoGetVisibleAssets;
    getBalance: typeof web3.nomoGetBalance;
    getAssetIcon: typeof web3.nomoGetAssetIcon;
    getAssetPrice: typeof web3.nomoGetAssetPrice;
    mnemonicBackupExisted: typeof web3.nomoMnemonicBackupExisted;
    launchSmartchainFaucet: typeof web3.nomoLaunchSmartchainFaucet;
    addCustomToken: typeof web3.nomoAddCustomToken;
    localStorage: {
        getItem: (key: string, options?: {
            webon_id: string;
        } | undefined) => Promise<String | null>;
        setItem: (key: string, value: string) => Promise<void>;
        removeItem: (key: string) => Promise<void>;
    };
    launchUrl: typeof multi.nomoLaunchUrl;
    launchWebOn: typeof multi.nomoLaunchWebOn;
    launchUrlAsWebOn: typeof multi.nomoLaunchUrlAsWebOn;
    installWebOn: typeof multi.nomoInstallWebOn;
    installUrlAsWebOn: typeof multi.nomoInstallUrlAsWebOn;
    uninstallWebOn: typeof multi.nomoUninstallWebOn;
    getInstalledWebOns: typeof multi.nomoGetInstalledWebOns;
    replaceWebOn: typeof multi.nomoReplaceWebOn;
    migrateAndSelfDestroy: typeof multi.nomoMigrateAndSelfDestroy;
    getManifest: typeof multi.nomoGetManifest;
    openFAQPage: typeof media.nomoOpenFAQPage;
    getMessengerAddress: typeof media.nomoGetMessengerAddress;
    takePicture: typeof media.nomoTakePicture;
    pickFromGallery: typeof media.nomoPickFromGallery;
    qrScan: typeof media.nomoQrScan;
    injectQRCode: typeof media.nomoInjectQRCode;
    hasMinimumNomoVersion: typeof platform.hasMinimumNomoVersion;
    checkForWebOnUpdate: typeof platform.nomoCheckForWebOnUpdate;
    getPlatformInfo: typeof platform.nomoGetPlatformInfo;
    getExecutionMode: typeof platform.nomoGetExecutionMode;
    getLanguage: typeof platform.nomoGetLanguage;
    getDeviceHashes: typeof platform.nomoGetDeviceHashes;
    getDeviceName: typeof platform.nomoGetDeviceName;
    registerOnWebOnVisible: typeof platform.nomoRegisterOnWebOnVisible;
    enableMobileConsoleDebugging: typeof platform.nomoEnableMobileConsoleDebugging;
    injectNomoCSSVariables: typeof theming.injectNomoCSSVariables;
    switchNomoTheme: typeof theming.switchNomoTheme;
    getCurrentNomoTheme: typeof theming.getCurrentNomoTheme;
    authHttp: typeof auth.nomoAuthHttp;
    authFetch: typeof auth.nomoAuthFetch;
    signAuthMessage: typeof auth.nomoSignAuthMessage;
};
