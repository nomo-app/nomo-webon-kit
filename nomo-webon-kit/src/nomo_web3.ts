import {
  invokeNomoFunction,
  invokeNomoFunctionCached,
  isFallbackModeActive,
} from "./dart_interface";
import { nomoAuthFetch } from "./nomo_auth";
import { nomoGetInstalledWebOns, nomoInstallWebOn } from "./nomo_multi_webons";
import { sleep } from "./util";

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
 * Prevents functions like "nomoGetEvmAddress" from falling back to browser extensions like MetaMask.
 */
export function nomoDisableFallbackWallet() {
  if (!isFallbackModeActive()) {
    return;
  }
  window.fallbackWalletDisabled = true;
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
  if (isFallbackModeActive()) {
    if (window.fallbackWalletDisabled) {
      return Promise.reject(
        "nomoSignEvmTransaction failed: fallback wallets are disabled!"
      );
    }
    if (!window.ethereum) {
      return Promise.reject(
        "nomoSignEvmTransaction fallback mode failed: window.ethereum is undefined!"
      );
    }
    // Use MetaMask API to sign transaction
    const from = (await window.ethereum.request({ method: "eth_accounts" }))[0];
    const sigHex = await window.ethereum.request({
      method: "personal_sign",
      params: [args.messageHex, from],
    });
    return { sigHex: sigHex };
  }
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
    if (window.fallbackWalletDisabled) {
      return Promise.reject(
        "nomoSignEvmMessage failed: fallback wallets are disabled!"
      );
    }
    if (!window.ethereum) {
      return Promise.reject(
        "nomoSignEvmMessage fallback mode failed: window.ethereum is undefined!"
      );
    }
    // Use MetaMask API to sign message
    const from = (await window.ethereum.request({ method: "eth_accounts" }))[0];
    const sigHex = await window.ethereum.request({
      method: "personal_sign",
      params: [args.message, from],
    });
    return { sigHex: sigHex };
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
 * Returns a list of supported assets that can be made visible via "nomoSetAssetVisibility".
 * This might also include custom tokens that the user has added.
 *
 * Since Nomo App 0.4.1.
 */
export async function nomoGetAllAssets(): Promise<{
  assets: Array<NomoAsset>;
}> {
  if (isFallbackModeActive()) {
    return {
      assets: [
        {
          name: "AVINOC",
          symbol: "AVINOC ZEN20",
          decimals: 18,
          contractAddress: "0xF1cA9cb74685755965c7458528A36934Df52A3EF",
        },
      ],
    };
  }
  return await invokeNomoFunction("nomoGetAllAssets", {});
}

/**
 * A convenience function to get the Smartchain address of the Nomo Wallet.
 * Internally, it calls "nomoGetWalletAddresses" and caches the result.
 */
export async function nomoGetEvmAddress(): Promise<string> {
  if (isFallbackModeActive()) {
    // extra fallback checks to show to the devs which wrapper function fails
    if (window.fallbackWalletDisabled) {
      return Promise.reject(
        "nomoGetEvmAddress failed: fallback wallets are disabled!"
      );
    }
    if (!window.ethereum) {
      return Promise.reject(
        "nomoGetEvmAddress fallback mode failed: window.ethereum is undefined!"
      );
    }
  }
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
    if (window.fallbackWalletDisabled) {
      return Promise.reject(
        "nomoGetWalletAddresses failed: fallback wallets are disabled!"
      );
    }
    if (!window.ethereum) {
      return Promise.reject(
        "nomoGetWalletAddresses fallback mode failed: window.ethereum is undefined!"
      );
    }
    try {
      // Use MetaMask API to get wallet addresses
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      return {
        walletAddresses: {
          ETH: accounts[0],
        },
      };
    } catch (error) {
      console.error("Error accessing MetaMask accounts:", error);
      throw error;
    }
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
export async function nomoGetBalanceWaitUntilSynced(
  args: NomoAssetSelector
): Promise<NomoAsset & { balance: string }> {
  while (true) {
    const ret = await nomoGetBalance(args);
    if (ret.balance !== null && ret.balance !== "null") {
      return ret;
    }
    await nomoSetAssetVisibility({ asset: args, visible: true });
    await sleep(1000);
  }
}

/**
 * A lower-level function to get the balance of an asset.
 * This function may return a null-balance if the asset is not yet visible or not yet synced.
 * Please use one of the following replacements instead of this functions:
 * - For EVM-based assets: Fetch a balance with ethers.js or similar.
 * - For UTXO-based assets: Use "nomoGetBalanceWaitUntilSynced".
 * - Else: Implement additional logic with "nomoSetAssetVisibility"/"nomoGetVisibleAssets".
 */
export async function nomoGetBalance(
  args: NomoAssetSelector
): Promise<NomoAsset & { balance: string }> {
  return await invokeNomoFunction("nomoGetBalance", args);
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
    deeplink: "https://nomo.app/webon/faucet.nomo.zone",
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
 *
 * @deprecated: Please use one of the following functions instead:
 * - "nomoGetNFTContracts" from this package.
 * - "nomoFetchERC721" from the ethersjs-nomo-webons package.
 */
export async function nomoGetNFTs(args: {
  network: NomoEvmNetwork;
}): Promise<{ nfts: NomoNFT[] }> {
  return await invokeNomoFunction("nomoGetNFTs", args);
}

/**
 * Returns a list of NFT-contracts that are declared by the currently installed WebOns.
 * Typically, those NFT-contracts provide some kind of utility for a WebOn.
 *
 * Needs nomo.permission.GET_INSTALLED_WEBONS.
 */
export async function nomoGetNFTContracts(): Promise<{
  nftContracts: string[];
}> {
  const { manifests } = await nomoGetInstalledWebOns();
  const rawDependencies: string[] = manifests
    .map((manifest) => manifest.dependencies ?? [])
    .reduce((acc, val) => acc.concat(val), []);
  const nftContractPrefix = "nftcontract:";
  const nftContracts = rawDependencies
    .filter((dep) => dep.startsWith(nftContractPrefix))
    .map((dep) => dep.slice(nftContractPrefix.length));
  return { nftContracts };
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
