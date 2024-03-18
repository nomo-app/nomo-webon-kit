import {
  invokeNomoFunction,
  invokeNomoFunctionCached,
  isFallbackModeActive,
} from "./dart_interface";
import { nomoAuthFetch } from "./nomo_auth";
import { nomoInstallWebOn } from "./nomo_multi_webons";

export type NomoEvmNetwork =
  | "zeniq-smart-chain"
  | "ethereum"
  | "binance-smart-chain";
export type NomoNetwork =
  | NomoEvmNetwork
  | "bitcoin"
  | "zeniq"
  | "litecoin"
  | "bitcoincash";

export interface NomoAssetSelector {
  symbol: string;
  name?: string;
  network?: NomoNetwork;
  /**
   * contractAddress is the strongest asset-selector with the highest security.
   * If contractAddress is specified, then name and symbol will be ignored.
   */
  contractAddress?: string;
}
export interface NomoAsset extends NomoAssetSelector {
  decimals: number;
  receiveAddress?: string | null;
  balance?: string;
}

/**
 * Creates a signature for an EVM-based transaction.
 * See EthersjsNomoSigner for an example on how to use this function.
 *
 * Needs nomo.permission.SIGN_EVM_TRANSACTION.
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
 *
 * Needs nomo.permission.SIGN_EVM_MESSAGE.
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
 * Opens a confirmation-dialog to send assets away from the Nomo App.
 * Assets are only sent if the user confirms the dialog.
 * "amount" should be a string that can be parsed by "BigInt.parse":  https://api.flutter.dev/flutter/dart-core/BigInt/parse.html
 *
 * Needs nomo.permission.SEND_ASSETS.
 */
export async function nomoSendAssets(args: {
  asset?: NomoAssetSelector;
  targetAddress?: string;
  amount?: string;
}): Promise<{
  hash: string;
  intent: { recipient: string; amount: string; token: string };
}> {
  const legacyArgs = { ...args, assetSymbol: args.asset?.symbol ?? null };
  return await invokeNomoFunction("nomoSendAssets", legacyArgs);
}

/**
 * Opens a dialog for the user to select an asset.
 * If the dialog does not look "correct", WebOns are free to call "nomoGetVisibleAssets" and implement their own dialog.
 */
export async function nomoSelectAssetFromDialog(): Promise<{
  selectedAsset: NomoAsset & { balance: string };
}> {
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
 * Returns a list of assets that are currently visible in the Nomo Wallet.
 */
export async function nomoGetVisibleAssets(): Promise<{
  visibleAssets: Array<NomoAsset>;
}> {
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

/**
 * A convenience function to get the Smartchain address of the Nomo Wallet.
 * Internally, it calls "nomoGetWalletAddresses" and caches the result.
 */
export async function nomoGetEvmAddress(): Promise<string> {
  const res = await nomoGetWalletAddresses();
  return res.walletAddresses["ETH"];
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
  return await invokeNomoFunctionCached("nomoGetWalletAddresses", null);
}

/**
 * Returns a set of URLs that contain icons of the asset.
 * May throw an error if no icons can be found.
 */
export async function nomoGetAssetIcon(args: NomoAssetSelector): Promise<{
  large: string;
  small: string;
  thumb: string;
  isPending: boolean;
  symbol: string;
  name: string;
}> {
  const legacyArgs = { ...args, assetSymbol: args.symbol };
  return await invokeNomoFunction("nomoGetAssetIcon", legacyArgs);
}

/**
 * Returns an asset price.
 * Might be slow if a price is not yet in the Nomo App's cache.
 */
export async function nomoGetAssetPrice(args: NomoAssetSelector): Promise<{
  price: number;
  currencyDisplayName: string;
  currencySymbol: string;
}> {
  if (isFallbackModeActive()) {
    const baseEndpoint = "https://price.zeniq.services/v2/currentprice";
    const priceEndpoint =
      !!args.contractAddress && !!args.network
        ? `${baseEndpoint}/${args.contractAddress}/USD/${args.network}`
        : `${baseEndpoint}/${args.name}/USD`;
    const res = await nomoAuthFetch({ url: priceEndpoint });
    const price = JSON.parse(res.response).price;
    return {
      price,
      currencyDisplayName: "US Dollar",
      currencySymbol: "$",
    };
  }
  return await invokeNomoFunction("nomoGetAssetPrice", args);
}

/**
 * Returns not only the balance of an asset, but also additional information like the network, a contract-address and a receive-address.
 * Typically, the decimals are needed to convert a raw balance into a user-readable balance.
 */
export async function nomoGetBalance(
  args: NomoAssetSelector
): Promise<NomoAsset & { balance: string }> {
  const legacyArgs = { ...args, assetSymbol: args.symbol };
  return await invokeNomoFunction("nomoGetBalance", legacyArgs);
}

/**
 * Returns a list of transactions from the Nomo Wallet's transaction-cache.
 * Might fail if the transaction-cache is not yet synchronized.
 *
 * Since Nomo App 0.3.8.
 */
export async function nomoGetTransactions(
  args: NomoAssetSelector
): Promise<any> {
  return await invokeNomoFunction("nomoGetTransactions", args);
}

/**
 * An extended public key is a public key that allows to derive all the addresses of a Nomo Wallet.
 * This is only intended for UTXO-based assets.
 *
 * Since Nomo App 0.3.8.
 */
export async function nomoGetExtendedPublicKey(
  args: NomoAssetSelector
): Promise<any> {
  return await invokeNomoFunction("nomoGetExtendedPublicKey", args);
}

/**
 * Adds a custom token to the list of visible assets in the Nomo Wallet.
 * Before that, it opens a dialog for the user to confirm.
 *
 * Needs nomo.permission.ADD_CUSTOM_TOKEN.
 */
export async function nomoAddCustomToken(
  args: NomoAssetSelector & {
    contractAddress: string;
    network: NomoEvmNetwork;
  }
): Promise<void> {
  return await invokeNomoFunction("nomoAddCustomToken", args);
}

/**
 * Launches a free faucet that can be used for paying transaction fees.
 */
export async function nomoLaunchSmartchainFaucet(): Promise<void> {
  return await nomoInstallWebOn({
    deeplink: "https://nomo.app/webon/w.nomo.app/faucet/nomo.tar.gz",
    skipPermissionDialog: true,
    navigateBack: false,
  });
}

/**
 * If true, then the user has made a backup of their 12 words (at some point in the past).
 * If false, then there exists no backup and the 12 words will get lost with a high probability.
 */
export async function nomoMnemonicBackupExisted(): Promise<{
  mnemonicBackupExisted: boolean;
}> {
  if (isFallbackModeActive()) {
    return { mnemonicBackupExisted: false };
  }
  return await invokeNomoFunction("nomoMnemonicBackupExisted", {});
}

export interface NomoNFT {
  blockNumber: number;
  contractAddress: string;
  dateTime: number;
  from: string;
  hash: string;
  to: string;
  tokenID: string;
  tokenName: string;
}

/**
 * Returns a list of NFTs that are owned by the user.
 * Can be slow if the NFTs are not yet in the Nomo App's cache.
 */
export async function nomoGetNFTs(args: {
  network: NomoEvmNetwork;
}): Promise<{ nfts: NomoNFT[] }> {
  return await invokeNomoFunction("nomoGetNFTs", args);
}

export interface NomoProofOfPayment {
  uPoP: string;
  uPoPHash: string;
  pops: Array<string>;
}

export type NomoCoinType = "btc" | "ltc" | "ec8" | "bch" | "zeniq";

/**
 * Returns a proof-of-payment for a transaction
 *
 * Needs nomo.permission.SIGN_EVM_MESSAGE.
 */
export async function nomoProofOfPayment(args: {
  hash: string;
  nonce?: string;
  coin: NomoCoinType;
}): Promise<NomoProofOfPayment> {
  return await invokeNomoFunction("nomoProofOfPayment", args);
}

/**
 * Adds or hides an asset within the Nomo Wallet.
 *
 * Since Nomo App 0.4.0.
 */
export async function nomoSetAssetVisibility(args: {
  asset: NomoAssetSelector;
  visible: boolean;
}): Promise<void> {
  return await invokeNomoFunction("nomoSetAssetVisibility", args);
}
