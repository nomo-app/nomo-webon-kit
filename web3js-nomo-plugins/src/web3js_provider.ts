import { Web3 } from "web3";
import { nomoGetWalletAddresses, nomoSignEvmTransaction } from "nomo-plugin-kit/dist/nomo_api";
import { Transaction, Common } from "web3-eth-accounts";



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

export function resolveSig(sigHex: string): bigint[] {
    console.log("rHex", "0x" + sigHex.slice(0, 64));
    console.log("sHex", "0x" + sigHex.slice(64, 128));
    console.log("vHex", "0x" + sigHex.slice(128, 130));

    const r = web3.utils.toBigInt("0x" + sigHex.slice(0, 64));
    const s = web3.utils.toBigInt("0x" + sigHex.slice(64, 128));
    const v = web3.utils.toBigInt("0x" + sigHex.slice(128, 130));

    return [v, r, s];
}

export async function signTransactionWithSigHex(txRequest: Transaction): Promise<Transaction> {
    const unsignedSerialiedTx = txRequest.getMessageToSign();
    console.log("unsignedSerialiedTx", unsignedSerialiedTx);

    const serializedHexTx = web3.utils.bytesToHex(unsignedSerialiedTx);

    console.log("serializedHexTx", serializedHexTx);
    console.log("length of unsignedRawTx", serializedHexTx.length);

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
                    r: sig[1],
                    s: sig[2],
                    v: sig[0],
                };
                console.log("signedTxData", signedTxData);
                const signedTx = Transaction.fromTxData(signedTxData);
                console.log("signedTx", signedTx);

                resolve(signedTx);
            })
            .catch((err: any) => {
                reject(err);
            });
    });
}

export async function sendTransaction() {

    const ownAddress = await getAddresses();
    console.log("ownAddress", ownAddress);
    const value = web3.utils.toWei("0.1", "ether");
    const nonce = await web3.eth.getTransactionCount(ownAddress);
    const gasPrice = await web3.eth.getGasPrice();


    const txData = {
        nonce: nonce,
        to: ownAddress, // send ZENIQ to ourselves
        value: web3.utils.toBigInt(value),
        gasLimit: 21000,
        gasPrice: gasPrice,
    };


    const transaction: Transaction = Transaction.fromTxData(txData);
    console.log("transaction", transaction);
    const singedTx = await signTransactionWithSigHex(transaction);
    const serializedTx = singedTx.serialize();
    console.log("serialized", serializedTx);
    console.log("isSigned", singedTx.isSigned());
    console.log("isVerifySigned", singedTx.verifySignature());

    const txhash = web3.utils.bytesToHex(singedTx.serialize());
    console.log("txHash", txhash);


    const res = await web3.eth.sendSignedTransaction(serializedTx);

    //const res = await web3.eth.sendTransaction(tx);
    console.log("res", res);
    return res;

}

