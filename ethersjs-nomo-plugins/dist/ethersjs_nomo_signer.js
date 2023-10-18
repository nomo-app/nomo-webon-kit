import { ethers, Signer, utils } from "ethers";
import { defineReadOnly } from "@ethersproject/properties";
import { isFallbackModeActive } from "nomo-plugin-kit/dist/dart_interface";
import { nomoGetWalletAddresses, nomoSignEvmTransaction, } from "nomo-plugin-kit/dist/nomo_api";
function appendSignatureToTx(unsignedTx, sigHexFromNative) {
    if (sigHexFromNative.length !== 130) {
        throw Error("unexpected sigHexFromNative length");
    }
    const sigHex = sigHexFromNative.startsWith("0x")
        ? sigHexFromNative
        : "0x" + sigHexFromNative;
    unsignedTx.signature = sigHex;
    console.log("unsignedTx", unsignedTx);
    return Transaction.from(unsignedTx).serialized;
    // return utils.serializeTransaction(unsignedTx as UnsignedTransaction, sigHex);
}
// let fallbackDevSigner: ethers.Wallet | null = null;
// function createFallbackDevSigner(): ethers.Wallet {
//   if (!fallbackDevSigner) {
//     console.error(
//       "fallback mode: try to read NEXT_PUBLIC_FALLBACK_MNEMONIC from environment"
//     );
//     const mnemonic = process.env.NEXT_PUBLIC_FALLBACK_MNEMONIC;
//     if (!mnemonic || !mnemonic.length) {
//       throw Error(
//         "NEXT_PUBLIC_FALLBACK_MNEMONIC is not defined. Create a .env.local to define it"
//       );
//     }
//     fallbackDevSigner = ethers.Wallet.fromMnemonic(mnemonic);
//   }
//   return fallbackDevSigner;
// }
// function signTxDevWallet(
//   txRequest: Deferrable<TransactionRequest>
// ): Promise<string> {
//   const devSigner = createFallbackDevSigner();
//   return devSigner.signTransaction(txRequest as TransactionRequest);
// }
let cachedAddress = null;
export class EthersjsNomoSigner {
    constructor(provider) {
        this.provider = provider;
    }
    connect(_provider) {
        return this;
    }
    getNonce(blockTag) {
        return this.provider.getTransactionCount(this.getAddress(), blockTag);
    }
    populateCall(tx) {
        throw new Error("Method not implemented.");
    }
    populateTransaction(tx) {
        const allowedTransactionKeys = {
            chainId: true,
            data: true,
            gasLimit: true,
            gasPrice: true,
            nonce: true,
            to: true,
            type: true,
            value: true,
        }; // ethers.js enforced strict rules on what properties are allowed in unsignedTx
        const unsignedTx = {};
        for (const key of Object.keys(allowedTransactionKeys)) {
            unsignedTx[key] = tx[key];
        }
        return Promise.resolve(unsignedTx);
    }
    estimateGas(tx) {
        return this.provider.estimateGas(tx);
    }
    call(tx) {
        throw new Error("Method not implemented.");
    }
    resolveName(name) {
        throw new Error("Method not implemented.");
    }
    sendTransaction(tx) {
        console.log("txToSend", tx);
        const txResponse = this.signTransaction(tx).then((res) => {
            return this.provider.broadcastTransaction(res);
        }).catch((err) => {
            throw err;
        });
        return txResponse;
    }
    signTypedData(domain, types, value) {
        throw new Error("Method not implemented.");
    }
    getAddress() {
        // if (isFallbackModeActive()) {
        //   return createFallbackDevSigner().getAddress();
        // }
        if (cachedAddress) {
            return Promise.resolve(cachedAddress);
        }
        return new Promise((resolve, reject) => {
            nomo.getWalletAddresses()
                .then((res) => {
                    cachedAddress = res.walletAddresses["ETH"];
                    resolve(cachedAddress);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
    signMessage(_message) {
        return Promise.reject("signMessage not implemented");
    }
    signTransaction(txRequest) {
        // if (isFallbackModeActive()) {
        //   return signTxDevWallet(txRequest);
        // }
        const allowedTransactionKeys = {
            chainId: true,
            data: true,
            gasLimit: true,
            gasPrice: true,
            nonce: true,
            to: true,
            type: true,
            value: true,
        }; // ethers.js enforced strict rules on what properties are allowed in unsignedTx
        const unsignedTx = {};
        for (const key of Object.keys(allowedTransactionKeys)) {
            unsignedTx[key] = txRequest[key];
        }
        const unsignedRawTx = Transaction.from(unsignedTx).unsignedSerialized;
        return new Promise((resolve, reject) => {
            nomo.signEvmTransaction({ messageHex: unsignedRawTx })
                .then((res) => {
                    const signedRawTx = appendSignatureToTx(unsignedTx, res.sigHex);
                    resolve(signedRawTx);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
}
