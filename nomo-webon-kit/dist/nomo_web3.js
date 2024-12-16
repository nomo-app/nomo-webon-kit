import { invokeNomoFunction, invokeNomoFunctionCached, isFallbackModeActive, } from "./dart_interface";
import { nomoAuthFetch } from "./nomo_auth";
import { nomoGetInstalledWebOns, nomoInstallWebOn } from "./nomo_multi_webons";
import { hasMinimumNomoVersion } from "./nomo_platform";
import { nomoJsonRPC, rlpEncodeList, sleep } from "./util";
/**
 * This is the contract address where native ZENIQ token get automatically wrapped into ZENIQ-ZEN20.
 */
export const contractAddressZENIQZEN20 = "0x5b52bfB8062Ce664D74bbCd4Cd6DC7Df53Fd7233";
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
export async function nomoSignEvmTransaction(args) {
    if (isFallbackModeActive()) {
        if (window.fallbackWalletDisabled) {
            return Promise.reject("nomoSignEvmTransaction failed: fallback wallets are disabled!");
        }
        if (!window.ethereum) {
            return Promise.reject("nomoSignEvmTransaction fallback mode failed: window.ethereum is undefined!");
        }
        // Use MetaMask API to sign transaction
        const from = (await window.ethereum.request({ method: "eth_accounts" }))[0];
        const sigHex = await window.ethereum.request({
            method: "personal_sign",
            params: [args.messageHex, from],
        });
        return { sigHex, txHex: "" };
    }
    return await invokeNomoFunction("nomoSignEvmTransaction", args);
}
function nomoNormalizeNetwork(network) {
    if (network === "bsc") {
        return "binance-smart-chain";
    }
    else if (network === "zsc") {
        return "zeniq-smart-chain";
    }
    else if (network === "eth") {
        return "ethereum";
    }
    else {
        return network;
    }
}
/**
 * Opens a confirmation-dialog to send assets away from the Nomo App.
 * Assets are only sent if the user confirms the dialog.
 * "amount" should be a string that can be parsed by "BigInt.parse":  https://api.flutter.dev/flutter/dart-core/BigInt/parse.html
 *
 * Needs nomo.permission.SEND_ASSETS.
 */
export async function nomoSendAssets(args) {
    const uuid = args.asset?.uuid;
    if (uuid) {
        const assets = await nomoFetchAssets();
        const assetFromOmonDB = assets.find((a) => a.asset === uuid);
        if (!assetFromOmonDB) {
            throw new Error("Could not find an asset with uuid: " + uuid);
        }
        args.asset = { ...assetFromOmonDB, ...args.asset, uuid };
    }
    if (args.asset?.network) {
        args.asset.network = nomoNormalizeNetwork(args.asset.network);
    }
    if (nomoGetFreeRPCUrl(args.asset?.network) &&
        args.targetAddress?.startsWith("0x") &&
        args.amount &&
        args.asset?.contractAddress &&
        args.asset?.network) {
        if ((await hasMinimumNomoVersion({ minVersion: "0.6.4" })).minVersionFulfilled) {
            return await nomoSendERC20({
                targetAddress: args.targetAddress,
                amount: args.amount,
                contractAddress: args.asset?.contractAddress,
                network: args.asset?.network,
            });
        }
    }
    return await invokeNomoFunction("nomoSendAssets", args);
}
let _cachedAssets = null;
async function nomoFetchAssets() {
    if (!_cachedAssets) {
        const res = await fetch("https://webon.info/api/tokens");
        _cachedAssets = await res.json();
    }
    return _cachedAssets;
}
function nomoGetChainId(network) {
    switch (network) {
        case "ethereum":
            return 1;
        case "polygon":
            return 137;
        case "binance-smart-chain":
            return 56;
        case "zeniq-smart-chain":
            return 383414847825;
        default:
            throw Error("Unknown chainID for network: " + network);
    }
}
function nomoGetFreeRPCUrl(network) {
    if (!network) {
        return null;
    }
    switch (network) {
        case "binance-smart-chain":
            return "https://bsc-dataseed.binance.org";
        case "zeniq-smart-chain":
            return "https://api.zeniq.network";
        case "polygon":
            return "https://polygon.llamarpc.com";
        default:
            return null;
    }
}
/**
 * Sends an ERC20-token to a target address.
 * For EVM-based tokens, this is a third alternative to "ethersjs-nomo-webons" and "nomoSendAssets".
 */
export async function nomoSendERC20(args) {
    function toHex(value, padding = 32) {
        return value.toString(16).padStart(padding * 2, "0");
    }
    const transferMethodId = "a9059cbb"; // First 4 bytes of keccak256("transfer(address,uint256)")
    const targetAddressEncoded = toHex(BigInt(args.targetAddress), 32);
    const amountEncoded = toHex(BigInt(args.amount), 32);
    const data = "0x" + transferMethodId + targetAddressEncoded + amountEncoded;
    const gasLimit = 75000;
    const rpcUrl = nomoGetFreeRPCUrl(args.network);
    if (!rpcUrl) {
        throw Error("No open-source support for network " + args.network);
    }
    const nonce = await nomoJsonRPC({
        method: "eth_getTransactionCount",
        params: [await nomoGetEvmAddress(), "latest"],
        url: rpcUrl,
    });
    const gasPrice = await nomoJsonRPC({
        method: "eth_gasPrice",
        params: [],
        url: rpcUrl,
    });
    const txFields = [
        nonce.result,
        gasPrice.result,
        gasLimit,
        args.contractAddress,
        "0x",
        data,
        nomoGetChainId(args.network),
        "0x",
        "0x", // Empty r (placeholder for signing)
    ];
    const rlpEncodedTx = rlpEncodeList(txFields);
    const { txHex } = await nomoSignEvmTransaction({
        messageHex: rlpEncodedTx,
    });
    const hash = await nomoJsonRPC({
        method: "eth_sendRawTransaction",
        params: [txHex],
        url: rpcUrl,
    });
    return {
        hash,
        intent: {
            recipient: args.targetAddress,
            amount: args.amount,
            token: args.contractAddress,
        },
    };
}
/**
 * Checks whether an asset is available in the Nomo Wallet, and whether the asset is visible.
 * If it is not available, "nomoAddCustomToken" can be used to add the asset.
 * If it is not visible, "nomoSetAssetVisibility" can be used to make the asset visible.
 * May return multiple assets if the NomoAssetSelector is ambiguous.
 */
export async function nomoSelectAssets(args) {
    const { selectedAssets } = await invokeNomoFunction("nomoSelectAssets", args);
    const { visibleAssets } = await nomoGetVisibleAssets();
    return {
        selectedAssets: selectedAssets.map((asset) => {
            const match = visibleAssets.find((visibleAsset) => {
                if (asset.network != visibleAsset.network) {
                    return false;
                }
                if (asset.contractAddress) {
                    return visibleAsset.contractAddress === asset.contractAddress;
                }
                return (visibleAsset.symbol === asset.symbol &&
                    asset.name == visibleAsset.name);
            });
            return {
                ...asset,
                visible: !!match,
            };
        }),
    };
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
 * Returns a list of supported assets that can be made visible via "nomoSetAssetVisibility".
 * This might also include custom tokens that the user has added.
 */
export async function nomoGetAllAssets() {
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
 * Returns the Smartchain address of a Nomo Wallet.
 */
export async function nomoGetEvmAddress() {
    if (isFallbackModeActive()) {
        // extra fallback checks to show to the devs which wrapper function fails
        if (window.fallbackWalletDisabled) {
            return Promise.reject("nomoGetEvmAddress failed: fallback wallets are disabled!");
        }
        if (!window.ethereum) {
            return Promise.reject("nomoGetEvmAddress fallback mode failed: window.ethereum is undefined!");
        }
    }
    try {
        const res = await invokeNomoFunctionCached("nomoGetEvmAddress", null);
        return res.evmAddress;
    }
    catch (e) {
        // fallback for older versions of the Nomo App
        const res = await nomoGetWalletAddresses();
        return res.walletAddresses["ETH"];
    }
}
/**
 * Returns blockchain-addresses of the NOMO-user.
 */
export async function nomoGetWalletAddresses() {
    if (isFallbackModeActive()) {
        if (window.fallbackWalletDisabled) {
            return Promise.reject("nomoGetWalletAddresses failed: fallback wallets are disabled!");
        }
        if (!window.ethereum) {
            return Promise.reject("nomoGetWalletAddresses fallback mode failed: window.ethereum is undefined!");
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
        }
        catch (error) {
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
export async function nomoGetAssetIcon(args) {
    return await invokeNomoFunction("nomoGetAssetIcon", args);
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
 * Internally called by "nomoGetBalance".
 * For EVM-based assets, it is also possible to use ethers.js or similar to fetch a balance.
 */
export async function nomoGetBalanceWaitUntilSynced(args) {
    while (true) {
        const ret = await invokeNomoFunction("nomoGetBalance", args);
        if (ret.balance !== null && ret.balance !== "null") {
            return ret;
        }
        await nomoSetAssetVisibility({ asset: args, visible: true });
        await sleep(1000);
    }
}
/**
 * Returns not only the balance of an asset, but also additional information like the network, a contract-address and a receive-address.
 * Typically, the decimals are needed to convert a raw balance into a user-readable balance.
 */
export async function nomoGetBalance(args) {
    return await nomoGetBalanceWaitUntilSynced(args);
}
/**
 * Returns a list of transactions from the Nomo Wallet's transaction-cache.
 * Might fail if the transaction-cache is not yet synchronized.
 */
export async function nomoGetTransactions(args) {
    return await invokeNomoFunction("nomoGetTransactions", args);
}
/**
 * An extended public key is a public key that allows to derive all the addresses of a Nomo Wallet.
 * This is only intended for UTXO-based assets.
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
        deeplink: "https://nomo.app/webon/faucet.nomo.zone",
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
 * Returns a list of NFT-contracts that are declared by the currently installed WebOns.
 * Typically, those NFT-contracts provide some kind of utility for a WebOn.
 *
 * Needs nomo.permission.GET_INSTALLED_WEBONS.
 */
export async function nomoGetNFTContracts() {
    const { manifests } = await nomoGetInstalledWebOns();
    const rawDependencies = manifests
        .map((manifest) => manifest.dependencies ?? [])
        .reduce((acc, val) => acc.concat(val), []);
    const nftContractPrefix = "nftcontract:";
    const nftContracts = rawDependencies
        .filter((dep) => dep.startsWith(nftContractPrefix))
        .map((dep) => dep.slice(nftContractPrefix.length));
    return { nftContracts };
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
 */
export async function nomoSetAssetVisibility(args) {
    return await invokeNomoFunction("nomoSetAssetVisibility", args);
}
