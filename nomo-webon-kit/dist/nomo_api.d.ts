import * as web3 from "./nomo_web3";
import * as multi from "./nomo_multi_webons";
import * as media from "./nomo_media";
import * as platform from "./nomo_platform";
import * as theming from "./nomo_theming";
import * as auth from "./nomo_auth";
import { nomoInstallErrorHook } from "./dart_interface";
/**
 * The nomo-object exposes WebOn-functions in an easy-to-use way.
 * The nomo-object can be used with only one import and supports the auto-completion of IDEs.
 */
export declare const nomo: {
    signEvmTransaction: typeof web3.nomoSignEvmTransaction;
    sendAssets: typeof web3.nomoSendAssets;
    sendERC20: typeof web3.nomoSendERC20;
    selectAssets: typeof web3.nomoSelectAssets;
    selectAssetFromDialog: typeof web3.nomoSelectAssetFromDialog;
    getEvmAddress: typeof web3.nomoGetEvmAddress;
    getWalletAddresses: typeof web3.nomoGetWalletAddresses;
    getVisibleAssets: typeof web3.nomoGetVisibleAssets;
    getAllAssets: typeof web3.nomoGetAllAssets;
    getNFTContracts: typeof web3.nomoGetNFTContracts;
    getBalance: typeof web3.nomoGetBalance;
    getBalanceWaitUntilSynced: typeof web3.nomoGetBalanceWaitUntilSynced;
    getTransactions: typeof web3.nomoGetTransactions;
    getExtendedPublicKey: typeof web3.nomoGetExtendedPublicKey;
    getAssetIcon: typeof web3.nomoGetAssetIcon;
    getAssetPrice: typeof web3.nomoGetAssetPrice;
    mnemonicBackupExisted: typeof web3.nomoMnemonicBackupExisted;
    launchSmartchainFaucet: typeof web3.nomoLaunchSmartchainFaucet;
    addCustomToken: typeof web3.nomoAddCustomToken;
    proofOfPayment: typeof web3.nomoProofOfPayment;
    setAssetVisiblity: typeof web3.nomoSetAssetVisibility;
    disableFallbackWallet: typeof web3.nomoDisableFallbackWallet;
    getWallets: typeof web3.nomoGetWallets;
    switchWallet: typeof web3.nomoSwitchWallet;
    localStorage: {
        getItem: (key: string, options?: {
            webon_id: string;
        } | undefined) => Promise<String | null>;
        setItem: (key: string, value: string) => Promise<void>;
        removeItem: (key: string) => Promise<void>;
    };
    launchUrl: typeof multi.nomoLaunchUrl;
    launchUrlAsWebOn: typeof multi.nomoLaunchUrlAsWebOn;
    installWebOn: typeof multi.nomoInstallWebOn;
    installUrlAsWebOn: typeof multi.nomoInstallUrlAsWebOn;
    uninstallWebOn: typeof multi.nomoUninstallWebOn;
    getInstalledWebOns: typeof multi.nomoGetInstalledWebOns;
    replaceWebOn: typeof multi.nomoReplaceWebOn;
    migrateAndSelfDestroy: typeof multi.nomoMigrateAndSelfDestroy;
    getManifest: typeof multi.nomoGetManifest;
    setWebOnParameters: typeof multi.nomoSetWebOnParameters;
    getWebOnParameters: typeof multi.nomoGetWebOnParameters;
    openFAQPage: typeof media.nomoOpenFAQPage;
    getMessengerAddress: typeof media.nomoGetMessengerAddress;
    takePicture: typeof media.nomoTakePicture;
    pickFromGallery: typeof media.nomoPickFromGallery;
    pickFiles: typeof media.nomoPickFiles;
    qrScan: typeof media.nomoQrScan;
    injectQRCode: typeof media.nomoInjectQRCode;
    fallbackQRCode: typeof media.nomoFallbackQRCode;
    subscribeNotification: typeof media.nomoSubscribeNotification;
    resolveName: typeof media.nomoResolveName;
    runsAsWebOn: typeof platform.runsAsWebOn;
    hasMinimumNomoVersion: typeof platform.hasMinimumNomoVersion;
    checkForWebOnUpdate: typeof platform.nomoCheckForWebOnUpdate;
    getPlatformInfo: typeof platform.nomoGetPlatformInfo;
    getExecutionMode: typeof platform.nomoGetExecutionMode;
    getLanguage: typeof platform.nomoGetLanguage;
    getDeviceHashes: typeof platform.nomoGetDeviceHashes;
    getDeviceName: typeof platform.nomoGetDeviceName;
    registerOnWebOnVisible: typeof platform.nomoRegisterOnWebOnVisible;
    share: typeof platform.nomoShare;
    getClipboard: typeof platform.nomoGetClipboard;
    setClipboard: typeof platform.nomoSetClipboard;
    close: typeof platform.nomoClose;
    injectNomoCSSVariables: typeof theming.injectNomoCSSVariables;
    switchNomoTheme: typeof theming.switchNomoTheme;
    getCurrentNomoTheme: typeof theming.getCurrentNomoTheme;
    authHttp: typeof auth.nomoAuthHttp;
    authFetch: typeof auth.nomoAuthFetch;
    signAuthMessage: typeof auth.nomoSignAuthMessage;
    proofOfWork: typeof auth.nomoProofOfWork;
    installErrorHook: typeof nomoInstallErrorHook;
};
