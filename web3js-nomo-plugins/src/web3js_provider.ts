import { Web3 } from "web3";
import { nomoGetWalletAddresses, nomoSignEvmTransaction } from "nomo-plugin-kit/dist/nomo_api";
import { Transaction, Common } from "web3-eth-accounts";
import { RLP } from "@ethereumjs/rlp";
import { RevertReason } from "web3/lib/commonjs/eth.exports";



const rpcUrlZeniqSmartChain = "https://smart.zeniq.network:9545";
const chainIdZeniqSmartChain = 383414847825;
const common = Common.custom(
    {
        name: "mainnet",
        networkId: chainIdZeniqSmartChain,
        chainId: chainIdZeniqSmartChain,
        url: rpcUrlZeniqSmartChain,
    },

);

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

export function resolveSig(sigHex: string): bigint[] {
    console.log("rHex", "0x" + sigHex.slice(0, 64));
    console.log("sHex", "0x" + sigHex.slice(64, 128));
    console.log("vHex", "0x" + sigHex.slice(128, 130));

    const r = web3.utils.toBigInt("0x" + sigHex.slice(0, 64));
    const s = web3.utils.toBigInt("0x" + sigHex.slice(64, 128));
    const v = web3.utils.toBigInt("0x" + sigHex.slice(128, 130));

    return [v, r, s];
}

export function getTxHash(data: Uint8Array[]): string {
    const unsignedSerialiedTx = RLP.encode(data);
    const usingnedTxBuffer = Buffer.from(unsignedSerialiedTx);
    const serializedHexTx = "0x" + usingnedTxBuffer.toString("hex");
    return serializedHexTx;
}

export async function signTransactionWithSigHex(txRequest: Transaction): Promise<Transaction> {
    const unsignedRawTx = txRequest.getMessageToSign(false);
    const serializedHexTx = getTxHash(unsignedRawTx);
    console.log("unsignedTxHex", serializedHexTx);


    return new Promise((resolve, reject) => {
        nomoSignEvmTransaction({ messageHex: serializedHexTx })
            .then((res) => {
                console.log("resFromNomo", res.sigHex);
                const sig = resolveSig(res.sigHex);
                const signedTxData = {
                    nonce: txRequest.nonce,
                    gasLimit: txRequest.gasLimit,
                    gasPrice: txRequest.gasPrice,
                    to: txRequest.to,
                    value: txRequest.value,
                    data: txRequest.data,
                    r: sig[1],
                    s: sig[2],
                    v: sig[0],
                };
                const signedTx = Transaction.fromTxData(signedTxData, { common });

                console.log("signedTx", signedTx);

                resolve(signedTx);
            })
            .catch((err: any) => {
                reject(err);
            });
    });
}



export async function sendDemoTransaction() {

    const ownAddress = await getAddresses();
    console.log("ownAddress", ownAddress);
    const value = web3.utils.toWei("0.1", "ether");
    const nonce = await web3.eth.getTransactionCount(ownAddress);
    const gasPrice = await web3.eth.getGasPrice();
    const data = web3.utils.bytesToUint8Array("0x");

    const balance = await web3.eth.getBalance(ownAddress);
    console.log("balance", balance);

    const txData = {
        nonce: nonce,
        to: ownAddress, // send ZENIQ to ourselves
        value: web3.utils.toBigInt(value),
        gasLimit: 21000n,
        gasPrice: gasPrice,
        data: data,
    };

    const transaction: Transaction = Transaction.fromTxData(txData, { common });
    console.log("transaction", transaction);

    const signedTx = await signTransactionWithSigHex(transaction);


    const hashedTx = getTxHash(signedTx.raw());
    console.log("hashedTx", hashedTx);

    console.log("isSigned", signedTx.isSigned());
    console.log("isVerifySigned", signedTx.verifySignature());



    const res = await web3.eth.sendSignedTransaction(hashedTx).then((receipt) => {
        console.log("receipt", receipt);
    }).catch((err: RevertReason) => {
        console.log("err", err.reason);
    });





    console.log("res", res);
    return res;

}

