import { Web3 } from "web3";
import { nomo } from "nomo-plugin-kit";
import { Transaction, Common } from "web3-eth-accounts";
import { RLP } from "@ethereumjs/rlp";
const rpcUrlZeniqSmartChain = "https://smart.zeniq.network:9545";
const chainIdZeniqSmartChain = 383414847825;
const common = Common.custom({
    name: "Zeniq",
    chainId: chainIdZeniqSmartChain,
});
const web3 = new Web3(new Web3.providers.HttpProvider(rpcUrlZeniqSmartChain));
export function rlpEncodeTx(data) {
    const unsignedSerialiedTx = RLP.encode(data);
    const usingnedTxBuffer = Buffer.from(unsignedSerialiedTx);
    const serializedHexTx = "0x" + usingnedTxBuffer.toString("hex");
    return serializedHexTx;
}
export function appendSignatureToTxFromWebJs(txRequestFromWeb3Js, sigHexFromNative) {
    if (sigHexFromNative.length !== 130) {
        throw Error("unexpected sigHexFromNative length");
    }
    const sigHex = sigHexFromNative.startsWith("0x")
        ? sigHexFromNative
        : "0x" + sigHexFromNative;
    const rsv = extractRSVFromSignature(sigHex);
    const signedTxData = {
        nonce: txRequestFromWeb3Js.nonce,
        to: txRequestFromWeb3Js.to,
        value: txRequestFromWeb3Js.value,
        gasLimit: txRequestFromWeb3Js.gasLimit,
        gasPrice: txRequestFromWeb3Js.gasPrice,
        type: txRequestFromWeb3Js.type,
        chainId: chainIdZeniqSmartChain,
        r: rsv.r,
        s: rsv.s,
        v: rsv.v,
    };
    const signedTx = Transaction.fromTxData(signedTxData, { common });
    console.log("signedTx", signedTx);
    console.log("isSigned", signedTx.verifySignature());
    const serializedSignedTX = signedTx.serialize();
    console.log("serializedSignedTx", serializedSignedTX);
    const hexstring = web3.utils.bytesToHex(serializedSignedTX);
    console.log("hexstring", hexstring);
    return hexstring;
}
function extractRSVFromSignature(signature) {
    const rHex = signature.slice(2, 66);
    const sHex = signature.slice(66, 130);
    const vHex = signature.slice(130);
    const r = BigInt("0x" + rHex);
    const s = BigInt("0x" + sHex);
    const v = BigInt("0x" + vHex);
    return { r, s, v };
}
export async function signWeb3JsTransactionWithNomo(txRequest, ownAddress) {
    const unsignedRawTx = txRequest.getMessageToSign(false);
    const serializedHexTx = rlpEncodeTx(unsignedRawTx);
    console.log("unsignedTxHex", serializedHexTx);
    return new Promise((resolve, reject) => {
        nomo.signEvmTransaction({ messageHex: serializedHexTx })
            .then((res) => {
            console.log("resFromNomo", res.sigHex);
            const signedRawTx = appendSignatureToTxFromWebJs(txRequest, res.sigHex);
            resolve(signedRawTx);
        })
            .catch((err) => {
            reject(err);
        });
    });
}
export async function sendDemoTransaction() {
    const ownAddress = await nomo.getEvmAddress();
    console.log("ownAddress", ownAddress);
    const value = web3.utils.toWei("0.1", "ether");
    const nonce = await web3.eth.getTransactionCount(ownAddress);
    const txData = {
        nonce: 1130n,
        to: ownAddress,
        value: web3.utils.toBigInt(value),
        gasLimit: 21000n,
        gasPrice: 10000000000n,
    };
    const transaction = Transaction.fromTxData(txData, { common });
    const signedTxHex = await signWeb3JsTransactionWithNomo(transaction, ownAddress);
    const res = await web3.eth.sendSignedTransaction(signedTxHex);
    console.log("res", res);
    return res;
}
