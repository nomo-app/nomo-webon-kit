import { invokeNomoFunction, isFallbackModeActive } from "./dart_interface";
import { NomoAsset, NomoAssetSelector } from "./nomo_web3";

/**
 * A transaction descriptor for WebOn wallet transactions.
 */
export interface NomoWalletTransaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  timestamp: number;
  status?: "pending" | "confirmed";
}

// --- WebOn -> App (push) ---

/**
 * Replace the entire asset list for this WebOn wallet.
 * Call this when the WebOn loads or when the asset list changes.
 *
 * @param args.assets - Array of NomoAsset descriptors the wallet supports.
 */
export async function nomoWalletSetAllAssets(args: {
  assets: NomoAsset[];
}): Promise<void> {
  if (isFallbackModeActive()) {
    console.log("[nomoWalletSetAllAssets] fallback mode:", args);
    return;
  }
  await invokeNomoFunction("nomoWalletSetAllAssets", args);
}

/**
 * Add or update a single asset in the WebOn wallet's asset list.
 * Uniqueness is determined by contractAddress+network or symbol+network.
 *
 * @param args.asset - The NomoAsset to add or update.
 */
export async function nomoWalletSetVisibleAsset(args: {
  asset: NomoAsset;
}): Promise<void> {
  if (isFallbackModeActive()) {
    console.log("[nomoWalletSetVisibleAsset] fallback mode:", args);
    return;
  }
  await invokeNomoFunction("nomoWalletSetVisibleAsset", args);
}

/**
 * Remove an asset from the WebOn wallet's asset list.
 *
 * @param args.asset - The NomoAssetSelector identifying the asset to remove.
 */
export async function nomoWalletRemoveAsset(args: {
  asset: NomoAssetSelector;
}): Promise<void> {
  if (isFallbackModeActive()) {
    console.log("[nomoWalletRemoveAsset] fallback mode:", args);
    return;
  }
  await invokeNomoFunction("nomoWalletRemoveAsset", args);
}

/**
 * Push a balance update for a specific asset to the Nomo App.
 *
 * @param args.asset - The NomoAssetSelector identifying the asset.
 * @param args.balance - The raw balance as a string (in smallest unit).
 */
export async function nomoWalletSetBalance(args: {
  asset: NomoAssetSelector;
  balance: string;
}): Promise<void> {
  if (isFallbackModeActive()) {
    console.log("[nomoWalletSetBalance] fallback mode:", args);
    return;
  }
  await invokeNomoFunction("nomoWalletSetBalance", args);
}

/**
 * Push a price for a specific asset to the Nomo App.
 *
 * @param args.asset - The NomoAssetSelector identifying the asset.
 * @param args.price - The price as a number (e.g., 2.50).
 * @param args.currency - Optional currency code (e.g., "usd"). Defaults to the app's selected currency.
 */
export async function nomoWalletSetPrice(args: {
  asset: NomoAssetSelector;
  price: number;
  currency?: string;
}): Promise<void> {
  if (isFallbackModeActive()) {
    console.log("[nomoWalletSetPrice] fallback mode:", args);
    return;
  }
  await invokeNomoFunction("nomoWalletSetPrice", args);
}

/**
 * Push transaction history for a specific asset to the Nomo App.
 *
 * @param args.asset - The NomoAssetSelector identifying the asset.
 * @param args.transactions - Array of transaction objects.
 */
export async function nomoWalletSetTransactions(args: {
  asset: NomoAssetSelector;
  transactions: NomoWalletTransaction[];
}): Promise<void> {
  if (isFallbackModeActive()) {
    console.log("[nomoWalletSetTransactions] fallback mode:", args);
    return;
  }
  await invokeNomoFunction("nomoWalletSetTransactions", args);
}

/**
 * Remove a single transaction by hash from the Nomo App's transaction history.
 *
 * @param args.asset - The NomoAssetSelector identifying the asset.
 * @param args.hash - The transaction hash to remove.
 */
export async function nomoWalletRemoveTransaction(args: {
  asset: NomoAssetSelector;
  hash: string;
}): Promise<void> {
  if (isFallbackModeActive()) {
    console.log("[nomoWalletRemoveTransaction] fallback mode:", args);
    return;
  }
  await invokeNomoFunction("nomoWalletRemoveTransaction", args);
}

/**
 * Push a receive address to the Nomo App.
 *
 * @param args.address - The receive address to display.
 * @param args.asset - Optional NomoAssetSelector if the address is asset-specific.
 */
export async function nomoWalletSetReceiveAddress(args: {
  address: string;
  asset?: NomoAssetSelector;
}): Promise<void> {
  if (isFallbackModeActive()) {
    console.log("[nomoWalletSetReceiveAddress] fallback mode:", args);
    return;
  }
  await invokeNomoFunction("nomoWalletSetReceiveAddress", args);
}

/**
 * Respond to a send request from the Nomo App.
 * Called by the WebOn after processing a send that was initiated via `window.nomoRequestSend`.
 *
 * @param args.requestId - The requestId from the original send request.
 * @param args.txHash - The transaction hash (empty string on error).
 * @param args.status - "success" or "error".
 * @param args.error - Error message if status is "error".
 */
export async function nomoWalletSendAssets(args: {
  requestId: string;
  txHash: string;
  status: "success" | "error";
  error?: string;
}): Promise<void> {
  if (isFallbackModeActive()) {
    console.log("[nomoWalletSendAssets] fallback mode:", args);
    return;
  }
  await invokeNomoFunction("nomoWalletSendAssets", args);
}

// --- Send request handler ---

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
 * After processing the send, call `nomoWalletSendAssets` with the result.
 *
 * @param handler - Async callback that receives the parsed send request.
 */
export function nomoRegisterSendRequestHandler(
  handler: (request: NomoSendRequest) => Promise<void>
): void {
  (window as any).nomoRequestSend = async (argsJson: string) => {
    try {
      const request: NomoSendRequest = JSON.parse(argsJson);
      await handler(request);
    } catch (e) {
      console.error("[nomoRequestSend] handler error:", e);
    }
  };
}

// --- App -> WebOn callbacks ---

/**
 * Register a handler for balance update requests from the Nomo App.
 *
 * When the app needs a fresh balance (e.g., user navigates to token detail or pull-to-refresh),
 * it calls `window.nomoWalletUpdateBalance(jsonString)` in the WebOn's JS context.
 * The WebOn should fetch the updated balance and push it back via `nomoWalletSetBalance`.
 *
 * @param handler - Async callback that receives the asset selector.
 */
export function nomoRegisterUpdateBalanceHandler(
  handler: (request: { asset: NomoAssetSelector }) => Promise<void>
): void {
  (window as any).nomoWalletUpdateBalance = async (argsJson: string) => {
    try {
      const request = JSON.parse(argsJson);
      await handler(request);
    } catch (e) {
      console.error("[nomoWalletUpdateBalance] handler error:", e);
    }
  };
}

/**
 * Register a handler for transaction update requests from the Nomo App.
 *
 * When the app needs fresh transaction history, it calls
 * `window.nomoWalletUpdateTransactions(jsonString)` in the WebOn's JS context.
 * The WebOn should fetch updated transactions and push them back via `nomoWalletSetTransactions`.
 *
 * @param handler - Async callback that receives the asset selector.
 */
export function nomoRegisterUpdateTransactionsHandler(
  handler: (request: { asset: NomoAssetSelector }) => Promise<void>
): void {
  (window as any).nomoWalletUpdateTransactions = async (argsJson: string) => {
    try {
      const request = JSON.parse(argsJson);
      await handler(request);
    } catch (e) {
      console.error("[nomoWalletUpdateTransactions] handler error:", e);
    }
  };
}
