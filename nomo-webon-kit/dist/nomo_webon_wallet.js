import { invokeNomoFunction, isFallbackModeActive } from "./dart_interface";
/**
 * Push the wallet's asset list to the Nomo App.
 * Call this when the WebOn loads or when the asset list changes.
 *
 * @param args.assets - Array of asset descriptors the wallet supports.
 */
export async function nomoProvideAssets(args) {
    if (isFallbackModeActive()) {
        console.log("[nomoProvideAssets] fallback mode:", args);
        return;
    }
    await invokeNomoFunction("nomoProvideAssets", args);
}
/**
 * Push a balance update for a specific asset to the Nomo App.
 *
 * @param args.symbol - The asset symbol (e.g., "DUMMY").
 * @param args.balance - The raw balance as a string (in smallest unit).
 * @param args.decimals - Number of decimals for display formatting.
 */
export async function nomoProvideBalance(args) {
    if (isFallbackModeActive()) {
        console.log("[nomoProvideBalance] fallback mode:", args);
        return;
    }
    await invokeNomoFunction("nomoProvideBalance", args);
}
/**
 * Push a price for a specific asset to the Nomo App.
 *
 * @param args.symbol - The asset symbol (e.g., "DUMMY").
 * @param args.price - The price as a number (e.g., 2.50).
 * @param args.currency - Optional currency code (e.g., "usd"). Defaults to the app's selected currency.
 * @param args.contractAddress - Optional contract address for token resolution.
 * @param args.chainID - Optional EVM chain ID for token resolution.
 */
export async function nomoProvidePrice(args) {
    if (isFallbackModeActive()) {
        console.log("[nomoProvidePrice] fallback mode:", args);
        return;
    }
    await invokeNomoFunction("nomoProvidePrice", args);
}
/**
 * Push transaction history for a specific asset to the Nomo App.
 *
 * @param args.symbol - The asset symbol.
 * @param args.transactions - Array of transaction objects.
 * @param args.contractAddress - Optional contract address for token resolution.
 * @param args.chainID - Optional EVM chain ID for token resolution.
 */
export async function nomoProvideTransactions(args) {
    if (isFallbackModeActive()) {
        console.log("[nomoProvideTransactions] fallback mode:", args);
        return;
    }
    await invokeNomoFunction("nomoProvideTransactions", args);
}
/**
 * Push a receive address to the Nomo App.
 *
 * @param args.address - The receive address to display.
 * @param args.symbol - Optional asset symbol if the address is asset-specific.
 */
export async function nomoProvideReceiveAddress(args) {
    if (isFallbackModeActive()) {
        console.log("[nomoProvideReceiveAddress] fallback mode:", args);
        return;
    }
    await invokeNomoFunction("nomoProvideReceiveAddress", args);
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
export async function nomoProvideSendResult(args) {
    if (isFallbackModeActive()) {
        console.log("[nomoProvideSendResult] fallback mode:", args);
        return;
    }
    await invokeNomoFunction("nomoProvideSendResult", args);
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
export function nomoRegisterSendRequestHandler(handler) {
    window.nomoRequestSend = async (argsJson) => {
        try {
            const request = JSON.parse(argsJson);
            await handler(request);
        }
        catch (e) {
            console.error("[nomoRequestSend] handler error:", e);
        }
    };
}
