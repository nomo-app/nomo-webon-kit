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
export const nomo = {
  signEvmTransaction: web3.nomoSignEvmTransaction,
  sendAssets: web3.nomoSendAssets,
  sendERC20: web3.nomoSendERC20,
  selectAssets: web3.nomoSelectAssets,
  selectAssetFromDialog: web3.nomoSelectAssetFromDialog,
  getEvmAddress: web3.nomoGetEvmAddress,
  getWalletAddresses: web3.nomoGetWalletAddresses,
  getVisibleAssets: web3.nomoGetVisibleAssets,
  getAllAssets: web3.nomoGetAllAssets,
  getNFTContracts: web3.nomoGetNFTContracts,
  getBalance: web3.nomoGetBalance,
  getBalanceWaitUntilSynced: web3.nomoGetBalanceWaitUntilSynced,
  getTransactions: web3.nomoGetTransactions,
  getExtendedPublicKey: web3.nomoGetExtendedPublicKey,
  getAssetIcon: web3.nomoGetAssetIcon,
  getAssetPrice: web3.nomoGetAssetPrice,
  mnemonicBackupExisted: web3.nomoMnemonicBackupExisted,
  launchSmartchainFaucet: web3.nomoLaunchSmartchainFaucet,
  addCustomToken: web3.nomoAddCustomToken,
  proofOfPayment: web3.nomoProofOfPayment,
  setAssetVisiblity: web3.nomoSetAssetVisibility,
  disableFallbackWallet: web3.nomoDisableFallbackWallet,
  getWallets: web3.nomoGetWallets,

  localStorage: multi.nomoLocalStorage,
  launchUrl: multi.nomoLaunchUrl,
  launchUrlAsWebOn: multi.nomoLaunchUrlAsWebOn,
  installWebOn: multi.nomoInstallWebOn,
  installUrlAsWebOn: multi.nomoInstallUrlAsWebOn,
  uninstallWebOn: multi.nomoUninstallWebOn,
  getInstalledWebOns: multi.nomoGetInstalledWebOns,
  replaceWebOn: multi.nomoReplaceWebOn,
  migrateAndSelfDestroy: multi.nomoMigrateAndSelfDestroy,
  getManifest: multi.nomoGetManifest,
  setWebOnParameters: multi.nomoSetWebOnParameters,
  getWebOnParameters: multi.nomoGetWebOnParameters,

  openFAQPage: media.nomoOpenFAQPage,
  getMessengerAddress: media.nomoGetMessengerAddress,
  takePicture: media.nomoTakePicture,
  pickFromGallery: media.nomoPickFromGallery,
  pickFiles: media.nomoPickFiles,
  qrScan: media.nomoQrScan,
  injectQRCode: media.nomoInjectQRCode,
  fallbackQRCode: media.nomoFallbackQRCode,
  subscribeNotification: media.nomoSubscribeNotification,
  resolveName: media.nomoResolveName,

  runsAsWebOn: platform.runsAsWebOn,
  hasMinimumNomoVersion: platform.hasMinimumNomoVersion,
  checkForWebOnUpdate: platform.nomoCheckForWebOnUpdate,
  getPlatformInfo: platform.nomoGetPlatformInfo,
  getExecutionMode: platform.nomoGetExecutionMode,
  getLanguage: platform.nomoGetLanguage,
  getDeviceHashes: platform.nomoGetDeviceHashes,
  getDeviceName: platform.nomoGetDeviceName,
  registerOnWebOnVisible: platform.nomoRegisterOnWebOnVisible,
  share: platform.nomoShare,
  getClipboard: platform.nomoGetClipboard,
  setClipboard: platform.nomoSetClipboard,
  close: platform.nomoClose,

  injectNomoCSSVariables: theming.injectNomoCSSVariables,
  switchNomoTheme: theming.switchNomoTheme,
  getCurrentNomoTheme: theming.getCurrentNomoTheme,

  authHttp: auth.nomoAuthHttp,
  authFetch: auth.nomoAuthFetch,
  signAuthMessage: auth.nomoSignAuthMessage,
  proofOfWork: auth.nomoProofOfWork,

  installErrorHook: nomoInstallErrorHook,
};
