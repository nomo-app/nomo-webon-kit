import { AbstractSigner, Transaction, Wallet, } from "ethers";
import { nomo } from "nomo-webon-kit";
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
}
let fallbackDevSigner = null;
function createFallbackDevSigner(fallbackMnemonic) {
    if (!fallbackDevSigner) {
        console.warn("fallback mode: try to use fallbackMnemonic");
        if (!fallbackMnemonic || !fallbackMnemonic.length) {
            throw Error("fallbackMnemonic is not defined. Pass it to the constructor of EthersjsNomoSigner.");
        }
        fallbackDevSigner = Wallet.fromPhrase(fallbackMnemonic);
    }
    return fallbackDevSigner;
}
function signTxDevWallet(txRequest, fallbackMnemonic) {
    console.log("fallback mode: signTxDevWallet", txRequest);
    const devSigner = createFallbackDevSigner(fallbackMnemonic);
    return devSigner.signTransaction(txRequest);
}
export class EthersjsNomoSigner extends AbstractSigner {
    constructor(provider, fallbackMnemonic) {
        super(provider);
        this.fallbackMnemonic = fallbackMnemonic !== null && fallbackMnemonic !== void 0 ? fallbackMnemonic : null;
    }
    connect(_provider) {
        return this;
    }
    sendTransaction(tx) {
        console.log("txToSend", tx);
        const txResponse = this.signTransaction(tx)
            .then((res) => {
            return this.provider.broadcastTransaction(res);
        })
            .catch((err) => {
            throw err;
        });
        return txResponse;
    }
    signTypedData(domain, types, value) {
        throw new Error("Method not implemented.");
    }
    getAddress() {
        return nomo.getEvmAddress();
    }
    signMessage(_message) {
        return Promise.reject("signMessage not implemented");
    }
    async signTransaction(txRequest) {
        console.log("unsignedTx", txRequest);
        const unsignedTx = await this.populateTransaction(txRequest);
        console.log("populatedTx", unsignedTx);
        if (unsignedTx.from) {
            unsignedTx.from = undefined; // prevent TypeError: unsigned transaction cannot define "from"
        }
        const unsignedRawTx = Transaction.from(unsignedTx).unsignedSerialized;
        console.log("unsignedRawTx", unsignedRawTx);
        const res = await nomo.signEvmTransaction({ messageHex: unsignedRawTx });
        const signedRawTx = appendSignatureToTx(unsignedTx, res.sigHex);
        return signedRawTx;
    }
}
