import { invokeNomoFunction, invokeNomoFunctionCached, isFallbackModeActive, } from "./dart_interface";
import { nomoAuthFetch } from "./nomo_auth";
import { nomoInstallWebOn } from "./nomo_multi_webons";
/**
 * Creates a signature for an EVM-based transaction.
 * See EthersjsNomoSigner for an example on how to use this function.
 *
 * Needs nomo.permission.SIGN_EVM_TRANSACTION.
 */
export async function nomoSignEvmTransaction(args) {
    if (isFallbackModeActive()) {
        // Use MetaMask API to sign transaction
        const from = (await window.ethereum.request({ method: 'eth_accounts' }))[0];
        const sigHex = await window.ethereum.request({
            method: 'personal_sign',
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
export async function nomoSignEvmMessage(args) {
    if (isFallbackModeActive()) {
        // Use MetaMask API to sign message
        const from = (await window.ethereum.request({ method: 'eth_accounts' }))[0];
        const sigHex = await window.ethereum.request({
            method: 'personal_sign',
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
export async function nomoSendAssets(args) {
    const legacyArgs = Object.assign(Object.assign({}, args), { assetSymbol: args.asset.symbol });
    return await invokeNomoFunction("nomoSendAssets", legacyArgs);
}
/**
 * Opens a dialog for the user to select an asset.
 * If the dialog does not look "correct", WebOns are free to call "nomoGetVisibleAssets" and implement their own dialog.
 */
export async function nomoSelectAssetFromDialog() {
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
export async function nomoGetVisibleAssets() {
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
export async function nomoGetEvmAddress() {
    const res = await nomoGetWalletAddresses();
    return res.walletAddresses["ETH"];
}
/**
 * Returns blockchain-addresses of the NOMO-user.
 */
export async function nomoGetWalletAddresses() {
    if (isFallbackModeActive()) {
        try {
            // Use MetaMask API to get wallet addresses
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            return {
                walletAddresses: {
                    "ETH": accounts[0],
                }
            };
        }
        catch (error) {
            console.error('Error accessing MetaMask accounts:', error);
            throw error;
        }
    }
    return await invokeNomoFunctionCached("nomoGetWalletAddresses", null);
}
/**
 * Returns a set of URLs that contain icons of the asset.
 * May throw an error if no icons can be found.
 */
export async function nomoGetAssetIcon(args) {
    const legacyArgs = Object.assign(Object.assign({}, args), { assetSymbol: args.symbol });
    return await invokeNomoFunction("nomoGetAssetIcon", legacyArgs);
}
/**
 * Returns an asset price.
 * Might be slow if a price is not yet in the Nomo App's cache.
 */
export async function nomoGetAssetPrice(args) {
    if (isFallbackModeActive()) {
        const baseEndpoint = "https://price.zeniq.services/v2/currentprice";
        const priceEndpoint = !!args.contractAddress && !!args.network
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
export async function nomoGetBalance(args) {
    const legacyArgs = Object.assign(Object.assign({}, args), { assetSymbol: args.symbol });
    return await invokeNomoFunction("nomoGetBalance", legacyArgs);
}
/**
 * Returns a list of transactions from the Nomo Wallet's transaction-cache.
 * Might fail if the transaction-cache is not yet synchronized.
 *
 * Since Nomo App 0.3.8.
 */
export async function nomoGetTransactions(args) {
    return await invokeNomoFunction("nomoGetTransactions", args);
}
/**
 * An extended public key is a public key that allows to derive all the addresses of a Nomo Wallet.
 * This is only intended for UTXO-based assets.
 *
 * Since Nomo App 0.3.8.
 */
export async function nomoGetExtendedPublicKey(args) {
    return await invokeNomoFunction("nomoGetExtendedPublicKey", args);
}
/**
 * Adds a custom token to the list of visible assets in the Nomo Wallet.
 * Before that, it opens a dialog for the user to confirm.
 *
 * Needs nomo.permission.ADD_CUSTOM_TOKEN.
 */
export async function nomoAddCustomToken(args) {
    return await invokeNomoFunction("nomoAddCustomToken", args);
}
/**
 * Launches a free faucet that can be used for paying transaction fees.
 */
export async function nomoLaunchSmartchainFaucet() {
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
export async function nomoMnemonicBackupExisted() {
    if (isFallbackModeActive()) {
        return { mnemonicBackupExisted: false };
    }
    return await invokeNomoFunction("nomoMnemonicBackupExisted", {});
}
/**
 * Returns a list of NFTs that are owned by the user.
 * Can be slow if the NFTs are not yet in the Nomo App's cache.
 */
export async function nomoGetNFTs(args) {
    return await invokeNomoFunction("nomoGetNFTs", args);
}
/**
 * Returns a proof-of-payment for a transaction
 *
 * Needs nomo.permission.SIGN_EVM_MESSAGE.
 */
export async function nomoProofOfPayment(args) {
    return await invokeNomoFunction("nomoProofOfPayment", args);
}
/**
 * Adds or hides an asset within the Nomo Wallet.
 *
 * Since Nomo App 0.4.0.
 */
export async function nomoSetAssetVisibility(args) {
    return await invokeNomoFunction("nomoSetAssetVisibility", args);
}
