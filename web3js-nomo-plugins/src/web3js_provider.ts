import { HexString, Web3, utils } from "web3";
import { nomoGetWalletAddresses, nomoSignEvmTransaction } from "nomo-plugin-kit/dist/nomo_api";
//import { Transaction } from "web3-eth-accounts";
import { LegacyTransaction } from "@ethereumjs/tx";
import { Common } from "@ethereumjs/common";
import { RLP } from "@ethereumjs/rlp";
import { bytesToHex } from '@ethereumjs/util'


const rpcUrlZeniqSmartChain = "https://smart.zeniq.network:9545";
const chainIdZeniqSmartChain = 383414847825;

// Unittest input data 0xf382049a8502540be4008252089405870f1507d820212e921e1f39f14660336231d188016345785d8a0000808559454e49518080
// Unittest expected output: r = 31985617787800161498695495446856197366320382904444210264230862608320524360576n
// s = 8257219745238357900642489194207469846836140993477625668205050420177290661755n
// v = 27n
const web3 = new Web3(new Web3.providers.HttpProvider(rpcUrlZeniqSmartChain));


let cachedAddress: string | null = null;

export async function getAddresses(): Promise<string> {
    if (cachedAddress) {
        return Promise.resolve(cachedAddress);
    }
    return new Promise((resolve, reject) => {
        nomoGetWalletAddresses()
            .then((res) => {
                cachedAddress = res.walletAddresses["ETH"];
                resolve(cachedAddress);
            })
            .catch((err: any) => {
                reject(err);
            });
    });
}

// export function resolveSig(sigHex: string): bigint[] {
//     console.log("rHex", "0x" + sigHex.slice(0, 64));
//     console.log("sHex", "0x" + sigHex.slice(64, 128));
//     console.log("vHex", "0x" + sigHex.slice(128, 130));

//     const r = web3.utils.toBigInt("0x" + sigHex.slice(0, 64));
//     const s = web3.utils.toBigInt("0x" + sigHex.slice(64, 128));
//     const v = web3.utils.toBigInt("0x" + sigHex.slice(128, 130));

//     return [v, r, s];
// }

export function resolveSig(sigHex: string): string[] {
    console.log("rHex", "0x" + sigHex.slice(0, 64));
    console.log("sHex", "0x" + sigHex.slice(64, 128));
    console.log("vHex", "0x" + sigHex.slice(128, 130));

    const r = "0x" + sigHex.slice(0, 64);
    const s = "0x" + sigHex.slice(64, 128);
    const v = "0x" + sigHex.slice(128, 130);

    return [v, r, s];
}

export async function sendDemoTransaction() {
    const ownAddress = await getAddresses();
    console.log("ownAddress", ownAddress);

    const value = web3.utils.toWei("0.1", "ether");
    const nonce = await web3.eth.getTransactionCount(ownAddress);
    const gasPrice = await web3.eth.getGasPrice();
    const gasLimit = 21000;

    const txObject = {
        nonce: web3.utils.toHex(nonce),
        to: ownAddress, // send ZENIQ to ourselves
        value: web3.utils.toHex(value),
        gasLimit: web3.utils.toHex(gasLimit),
        gasPrice: web3.utils.toHex(gasPrice),
    };
    const common = Common.custom(
        {

            chainId: chainIdZeniqSmartChain,
        },

    );
    const tx = LegacyTransaction.fromTxData(txObject, { common });
    console.log("tx", tx);
    const unsignedTx = tx.getMessageToSign();
    const unsignedTXRLP = RLP.encode(unsignedTx);
    const txHash = web3.utils.sha3Raw(unsignedTXRLP);
    console.log("unsignedSerializedTxHash", txHash);
    const signature = await signTransaction(txHash);
    console.log("signature", signature);
    const rsv = resolveSig(signature);
    const txData = {
        nonce: web3.utils.toHex(nonce),
        to: ownAddress, // send ZENIQ to ourselves
        value: web3.utils.toHex(value),
        gasLimit: web3.utils.toHex(gasLimit),
        gasPrice: web3.utils.toHex(gasPrice),
        r: rsv[1],
        s: rsv[2],
        v: rsv[0],
    };
    const signedTx = LegacyTransaction.fromTxData(txData, { common });
    console.log("signedTx", signedTx);
    const serializedSignedTx = signedTx.serialize();


    const txReciept = await web3.eth.sendSignedTransaction(serializedSignedTx);
    return txReciept;

}


export async function signTransaction(txHash: string): Promise<string> {
    return new Promise((resolve, reject) => {
        nomoSignEvmTransaction({ messageHex: txHash })
            .then((res) => {
                resolve(res.sigHex);
            })
            .catch((err: any) => {
                reject(err);
            });
    });

}

// export async function signTransactionWithSigHex(txRequest: Transaction): Promise<Transaction> {
//     const unsignedRawTx = txRequest.getMessageToSign(false);
//     console.log("unsignedSerialiedTx", unsignedRawTx);
//     const unsignedSerialiedTx = RLP.encode(unsignedRawTx);

//     const test = txRequest.serialize();
//     const test2 = web3.utils.sha3Raw(test);
//     console.log("test2", test2);
//     console.log("test2.length", test2.length);
//     const serializedHexTx = web3.utils.sha3Raw(unsignedSerialiedTx);

//     console.log("serializedHexTx", serializedHexTx);
//     console.log("length of unsignedRawTx", serializedHexTx.length);

//     return new Promise((resolve, reject) => {
//         nomoSignEvmTransaction({ messageHex: test2 })
//             .then((res) => {
//                 console.log("resFromNomo", res.sigHex);
//                 const sig = resolveSig(res.sigHex);
//                 const signedTxData = {
//                     nonce: txRequest.nonce,
//                     gasLimit: txRequest.gasLimit,
//                     gasPrice: txRequest.gasPrice,
//                     to: txRequest.to,
//                     value: txRequest.value,
//                     r: sig[1],
//                     s: sig[2],
//                     v: sig[0],
//                 };
//                 console.log("signedTxData", signedTxData);
//                 const signedTx = Transaction.fromTxData(signedTxData);
//                 console.log("signedTx", signedTx);

//                 resolve(signedTx);
//             })
//             .catch((err: any) => {
//                 reject(err);
//             });
//     });
// }



// export async function sendTransaction() {

//     const ownAddress = await getAddresses();
//     console.log("ownAddress", ownAddress);

//     const value = web3.utils.toWei("0.1", "ether");
//     const nonce = await web3.eth.getTransactionCount(ownAddress);
//     const gasPrice = await web3.eth.getGasPrice();


//     const txData = {
//         nonce: nonce,
//         to: ownAddress, // send ZENIQ to ourselves
//         value: web3.utils.toBigInt(value),
//         gasLimit: 21000n,
//         gasPrice: gasPrice,
//     };

//     const transaction: Transaction = Transaction.fromTxData(txData);
//     console.log("transaction", transaction);

//     const singedTx = await signTransactionWithSigHex(transaction);
//     // const serializedTx = singedTx.serialize();
//     // console.log("serialized", serializedTx);
//     // console.log("isSigned", singedTx.isSigned());
//     // console.log("isVerifySigned", singedTx.verifySignature());

//     // const txhash = web3.utils.sha3Raw(singedTx.serialize());
//     // console.log("txHash", txhash);
//     const signedSerialiedTx = singedTx.serialize();
//     console.log("signedSerialiedTx", web3.utils.sha3Raw(signedSerialiedTx));
//     console.log("signedSerialiedTx", signedSerialiedTx);
//     console.log("isSigned", singedTx.isSigned());
//     console.log("isVerifySigned", singedTx.verifySignature());
//     const res = await web3.eth.sendSignedTransaction(signedSerialiedTx).then((receipt) => {
//         console.log("receipt", receipt);
//     }).catch((err) => {
//         console.log("err", err);
//     });

//     console.log("res", res);
//     return res;

// }

