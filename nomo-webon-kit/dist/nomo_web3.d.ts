export type NomoEvmNetwork = "zeniq-smart-chain" | "ethereum" | "polygon" | "binance-smart-chain";
export type NomoNetwork = NomoEvmNetwork | "bitcoin" | "zeniq" | "litecoin" | "bitcoincash";
/**
 * This is the contract address where native ZENIQ token get automatically wrapped into ZENIQ-ZEN20.
 */
export declare const contractAddressZENIQZEN20 = "0x5b52bfB8062Ce664D74bbCd4Cd6DC7Df53Fd7233";
export interface NomoAssetSelector {
    /**
     * symbol will be ignored if contractAddress or uuid is specified.
     * symbol should be only used together with other selectors.
     */
    symbol: string;
    /**
     * name will be ignored if contractAddress or uuid is specified.
     * name should be only used together with other selectors.
     */
    name?: string;
    network?: NomoNetwork;
    /**
     * contractAddress in combination with network is the strongest asset-selector with the highest security.
     * There are rare cases where a contractAddress is not unique across different networks (e.g. AVINOC-ZEN20/AVINOC-ERC20).
     */
    contractAddress?: string;
    /**
     * If set, then uuid must be an asset-identifier from the endpoint https://webon.info/api/tokens.
     */
    uuid?: string;
}
export interface NomoAsset extends NomoAssetSelector {
    decimals: number;
    visible?: boolean;
    receiveAddress?: string | null;
    balance?: string;
}
/**
 * Prevents functions like "nomoGetEvmAddress" from falling back to browser extensions like MetaMask.
 */
export declare function nomoDisableFallbackWallet(): void;
/**
 * Creates a signature for an EVM-based transaction.
 * See EthersjsNomoSigner for an example on how to use this function.
 *
 * Needs nomo.permission.SIGN_EVM_TRANSACTION.
 */
export declare function nomoSignEvmTransaction(args: {
    messageHex: string;
}): Promise<{
    sigHex: string;
    txHex: string;
}>;
/**
 * Opens a confirmation-dialog to send assets away from the Nomo App.
 * Assets are only sent if the user confirms the dialog.
 * "amount" should be a string that can be parsed by "BigInt.parse":  https://api.flutter.dev/flutter/dart-core/BigInt/parse.html
 *
 * Needs nomo.permission.SEND_ASSETS.
 */
export declare function nomoSendAssets(args: {
    asset?: NomoAssetSelector;
    targetAddress?: string;
    amount?: string;
}): Promise<{
    hash: string;
    intent: {
        recipient: string;
        amount: string;
        token: string;
    };
}>;
/**
 * Sends an ERC20-token to a target address.
 * For EVM-based tokens, this is a third alternative to "ethersjs-nomo-webons" and "nomoSendAssets".
 */
export declare function nomoSendERC20(args: {
    contractAddress: string;
    targetAddress: string;
    amount: string;
    network: NomoEvmNetwork;
}): Promise<{
    hash: string;
    intent: {
        recipient: string;
        amount: string;
        token: string;
    };
}>;
/**
 * Checks whether an asset is available in the Nomo Wallet, and whether the asset is visible.
 * If it is not available, "nomoAddCustomToken" can be used to add the asset.
 * If it is not visible, "nomoSetAssetVisibility" can be used to make the asset visible.
 * May return multiple assets if the NomoAssetSelector is ambiguous.
 */
export declare function nomoSelectAssets(args: NomoAssetSelector): Promise<{
    selectedAssets: NomoAsset[];
}>;
/**
 * Opens a dialog for the user to select an asset.
 * If the dialog does not look "correct", WebOns are free to call "nomoGetVisibleAssets" and implement their own dialog.
 */
export declare function nomoSelectAssetFromDialog(): Promise<{
    selectedAsset: NomoAsset & {
        balance: string;
    };
}>;
/**
 * Returns a list of assets that are currently visible in the Nomo Wallet.
 */
export declare function nomoGetVisibleAssets(): Promise<{
    visibleAssets: Array<NomoAsset>;
}>;
/**
 * Returns a list of supported assets that can be made visible via "nomoSetAssetVisibility".
 * This might also include custom tokens that the user has added.
 */
export declare function nomoGetAllAssets(): Promise<{
    assets: Array<NomoAsset>;
}>;
/**
 * Returns the Smartchain address of a Nomo Wallet.
 */
export declare function nomoGetEvmAddress(): Promise<string>;
/**
 * Returns blockchain-addresses of the NOMO-user.
 */
export declare function nomoGetWalletAddresses(): Promise<{
    walletAddresses: Record<string, string>;
}>;
/**
 * Returns a set of URLs that contain icons of the asset.
 * May throw an error if no icons can be found.
 */
export declare function nomoGetAssetIcon(args: NomoAssetSelector): Promise<{
    large: string;
    small: string;
    thumb: string;
    isPending: boolean;
    symbol: string;
    name: string;
}>;
/**
 * Returns an asset price.
 * Might be slow if a price is not yet in the Nomo App's cache.
 */
export declare function nomoGetAssetPrice(args: NomoAssetSelector): Promise<{
    price: number;
    currencyDisplayName: string;
    currencySymbol: string;
}>;
/**
 * Internally called by "nomoGetBalance".
 * For EVM-based assets, it is also possible to use ethers.js or similar to fetch a balance.
 */
export declare function nomoGetBalanceWaitUntilSynced(args: NomoAssetSelector): Promise<NomoAsset & {
    balance: string;
}>;
/**
 * Returns not only the balance of an asset, but also additional information like the network, a contract-address and a receive-address.
 * Typically, the decimals are needed to convert a raw balance into a user-readable balance.
 */
export declare function nomoGetBalance(args: NomoAssetSelector): Promise<NomoAsset & {
    balance: string;
}>;
/**
 * Returns a list of transactions from the Nomo Wallet's transaction-cache.
 * Might fail if the transaction-cache is not yet synchronized.
 */
export declare function nomoGetTransactions(args: NomoAssetSelector): Promise<{
    txs: any[];
    symbol: string;
    name: string;
    decimals: number;
    contractAddress?: string;
    network: string;
}>;
/**
 * An extended public key is a public key that allows to derive all the addresses of a Nomo Wallet.
 * This is only intended for UTXO-based assets.
 */
export declare function nomoGetExtendedPublicKey(args: NomoAssetSelector): Promise<any>;
/**
 * Adds a custom token to the list of visible assets in the Nomo Wallet.
 * Before that, it opens a dialog for the user to confirm.
 *
 * Needs nomo.permission.ADD_CUSTOM_TOKEN.
 */
export declare function nomoAddCustomToken(args: NomoAssetSelector & {
    contractAddress: string;
    network: NomoEvmNetwork;
}): Promise<void>;
/**
 * Launches a free faucet that can be used for paying transaction fees.
 */
export declare function nomoLaunchSmartchainFaucet(): Promise<void>;
/**
 * If true, then the user has made a backup of their 12 words (at some point in the past).
 * If false, then there exists no backup and the 12 words will get lost with a high probability.
 */
export declare function nomoMnemonicBackupExisted(): Promise<{
    mnemonicBackupExisted: boolean;
}>;
/**
 * Returns a list of NFT-contracts that are declared by the currently installed WebOns.
 * Typically, those NFT-contracts provide some kind of utility for a WebOn.
 *
 * Needs nomo.permission.GET_INSTALLED_WEBONS.
 */
export declare function nomoGetNFTContracts(): Promise<{
    nftContracts: string[];
}>;
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
export declare function nomoProofOfPayment(args: {
    hash: string;
    nonce?: string;
    coin: NomoCoinType;
}): Promise<NomoProofOfPayment>;
/**
 * Adds or hides an asset within the Nomo Wallet.
 */
export declare function nomoSetAssetVisibility(args: {
    asset: NomoAssetSelector;
    visible: boolean;
}): Promise<void>;
/**
 *
 */
export interface NomoWallet {
    evmAddress: string;
    derivationPath: string;
}
export declare function nomoGetWallets(): Promise<NomoWallet[]>;
export declare function nomoSwitchWallet(args: {
    derivationPath: string;
}): Promise<void>;
