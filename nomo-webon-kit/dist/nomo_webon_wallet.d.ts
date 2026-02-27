/**
 * Asset descriptor for a WebOn wallet.
 */
export interface WebonWalletAsset {
    symbol: string;
    name?: string;
    decimals: number;
    contractAddress?: string;
    chainID?: number;
}
/**
 * Configuration for a WebOn that acts as a wallet provider.
 * This is declared in the nomo_manifest.json under "webon_wallet".
 */
export interface WebonWalletManifest {
    name: string;
    assets: WebonWalletAsset[];
}
/**
 * Push the wallet's asset list to the Nomo App.
 * Call this when the WebOn loads or when the asset list changes.
 *
 * @param args.assets - Array of asset descriptors the wallet supports.
 */
export declare function nomoProvideAssets(args: {
    assets: WebonWalletAsset[];
}): Promise<void>;
/**
 * Push a balance update for a specific asset to the Nomo App.
 *
 * @param args.symbol - The asset symbol (e.g., "DUMMY").
 * @param args.balance - The raw balance as a string (in smallest unit).
 * @param args.decimals - Number of decimals for display formatting.
 */
export declare function nomoProvideBalance(args: {
    symbol: string;
    balance: string;
    decimals: number;
    contractAddress?: string;
    chainID?: number;
}): Promise<void>;
/**
 * Push a price for a specific asset to the Nomo App.
 *
 * @param args.symbol - The asset symbol (e.g., "DUMMY").
 * @param args.price - The price as a number (e.g., 2.50).
 * @param args.currency - Optional currency code (e.g., "usd"). Defaults to the app's selected currency.
 * @param args.contractAddress - Optional contract address for token resolution.
 * @param args.chainID - Optional EVM chain ID for token resolution.
 */
export declare function nomoProvidePrice(args: {
    symbol: string;
    price: number;
    currency?: string;
    contractAddress?: string;
    chainID?: number;
}): Promise<void>;
/**
 * Push transaction history for a specific asset to the Nomo App.
 *
 * @param args.symbol - The asset symbol.
 * @param args.transactions - Array of transaction objects.
 * @param args.contractAddress - Optional contract address for token resolution.
 * @param args.chainID - Optional EVM chain ID for token resolution.
 */
export declare function nomoProvideTransactions(args: {
    symbol: string;
    transactions: Array<{
        hash: string;
        from: string;
        to: string;
        value: string;
        timestamp: number;
        status?: string;
    }>;
    contractAddress?: string;
    chainID?: number;
}): Promise<void>;
/**
 * Push a receive address to the Nomo App.
 *
 * @param args.address - The receive address to display.
 * @param args.symbol - Optional asset symbol if the address is asset-specific.
 */
export declare function nomoProvideReceiveAddress(args: {
    address: string;
    symbol?: string;
}): Promise<void>;
/**
 * Respond to a send request from the Nomo App.
 * Called by the WebOn after processing a send that was initiated via `window.nomoRequestSend`.
 *
 * @param args.requestId - The requestId from the original send request.
 * @param args.txHash - The transaction hash (empty string on error).
 * @param args.status - "success" or "error".
 * @param args.error - Error message if status is "error".
 */
export declare function nomoProvideSendResult(args: {
    requestId: string;
    txHash: string;
    status: "success" | "error";
    error?: string;
}): Promise<void>;
/**
 * A send request payload that the Nomo App injects into the WebOn via `window.nomoRequestSend`.
 */
export interface NomoSendRequest {
    requestId: string;
    symbol: string;
    destination: string;
    amount: string;
    decimals: number;
}
/**
 * Register a handler for send requests from the Nomo App.
 *
 * When the user initiates a send for an external wallet token, the Nomo App
 * calls `window.nomoRequestSend(jsonString)` in the WebOn's JS context.
 * Use this helper to register a typed callback.
 *
 * After processing the send, call `nomoProvideSendResult` with the result.
 *
 * @param handler - Async callback that receives the parsed send request.
 */
export declare function nomoRegisterSendRequestHandler(handler: (request: NomoSendRequest) => Promise<void>): void;
