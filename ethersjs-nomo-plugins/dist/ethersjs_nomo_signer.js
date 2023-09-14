import { BigNumber, ethers, Signer, utils } from "ethers";
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
    return utils.serializeTransaction(unsignedTx, sigHex);
}
let fallbackDevSigner = null;
function createFallbackDevSigner() {
    if (!fallbackDevSigner) {
        console.error("fallback mode: try to read NEXT_PUBLIC_FALLBACK_MNEMONIC from environment");
        const mnemonic = process.env.NEXT_PUBLIC_FALLBACK_MNEMONIC;
        if (!mnemonic || !mnemonic.length) {
            throw Error("NEXT_PUBLIC_FALLBACK_MNEMONIC is not defined. Create a .env.local to define it");
        }
        fallbackDevSigner = ethers.Wallet.fromMnemonic(mnemonic);
    }
    return fallbackDevSigner;
}
function signTxDevWallet(txRequest) {
    const devSigner = createFallbackDevSigner();
    return devSigner.signTransaction(txRequest);
}
let cachedAddress = null;
export class EthersjsNomoSigner extends Signer {
    constructor(provider) {
        super();
        defineReadOnly(this, "provider", provider || null);
    }
    connect(_provider) {
        return this;
    }
    getAddress() {
        if (isFallbackModeActive()) {
            return createFallbackDevSigner().getAddress();
        }
        if (cachedAddress) {
            return Promise.resolve(cachedAddress);
        }
        return new Promise((resolve, reject) => {
            nomoGetWalletAddresses()
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
    resolveSig(sigHex) {
        const r = BigNumber.from("0x" + sigHex.slice(0, 64)).toBigInt();
        const s = BigNumber.from("0x" + sigHex.slice(64, 128)).toBigInt();
        const v = BigNumber.from("0x" + sigHex.slice(128, 130)).toBigInt();
        return [v, r, s];
    }
    signTransaction(txRequest) {
        if (isFallbackModeActive()) {
            return signTxDevWallet(txRequest);
        }
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
        unsignedTx["nonce"] = 1178;
        const unsignedRawTx = utils.serializeTransaction(unsignedTx);
        console.log("unsignedTx", unsignedTx);
        console.log("unsignedRawTx", unsignedRawTx);
        return new Promise((resolve, reject) => {
            nomoSignEvmTransaction({ messageHex: unsignedRawTx })
                .then((res) => {
                console.log("resFromNomo", this.resolveSig(res.sigHex));
                const signedRawTx = appendSignatureToTx(unsignedTx, res.sigHex);
                console.log("signedRawTxObject", utils.parseTransaction(signedRawTx));
                console.log("signedRawTx", signedRawTx);
                resolve(signedRawTx);
            })
                .catch((err) => {
                reject(err);
            });
        });
    }
}
