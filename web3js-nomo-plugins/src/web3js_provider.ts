import { Web3 } from "web3";
import {
  nomoGetWalletAddresses,
  nomoSignEvmTransaction,
} from "nomo-plugin-kit/dist/nomo_api";
import { Transaction, Common } from "web3-eth-accounts";
import { BigNumber } from "ethers";
import { RLP } from "@ethereumjs/rlp";

import { UnsignedTransaction, utils } from "ethers";

const rpcUrlZeniqSmartChain = "https://smart.zeniq.network:9545";
const chainIdZeniqSmartChain = 383414847825;
const common = Common.custom({
  name: "mainnet",
  networkId: chainIdZeniqSmartChain,
  chainId: chainIdZeniqSmartChain,
  url: rpcUrlZeniqSmartChain,
});

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

export function rlpEncodeTx(data: Uint8Array[]): string {
  const unsignedSerialiedTx = RLP.encode(data);
  const usingnedTxBuffer = Buffer.from(unsignedSerialiedTx);
  const serializedHexTx = "0x" + usingnedTxBuffer.toString("hex");
  return serializedHexTx;
}

function appendSignatureToTxFromWebJs(
  txRequestFromWeb3Js: Record<string, any>,
  sigHexFromNative: string,
  ownAddress: string
) {
  // in this case, we use ethers.js only for serialization of transactions, everything else is done by web3.js
  if (sigHexFromNative.length !== 130) {
    throw Error("unexpected sigHexFromNative length");
  }
  const sigHex = sigHexFromNative.startsWith("0x")
    ? sigHexFromNative
    : "0x" + sigHexFromNative;

  const allowedTransactionKeys: { [key: string]: boolean } = {
    chainId: true,
    data: true,
    gasLimit: true,
    gasPrice: true,
    nonce: true,
    to: true,
    type: true,
    value: true,
  }; // ethers.js enforced strict rules on what properties are allowed in unsignedTx

  // we provide a few hardcoded properties that might be missing in the object from web3js
  const unsignedTxEthersjs: Record<string, any> = {
    chainId: chainIdZeniqSmartChain,
    type: 0,
  };

  for (const key of Object.keys(allowedTransactionKeys)) {
    let propertyFromWeb3Js = (txRequestFromWeb3Js as Record<string, any>)[key];
    if (typeof propertyFromWeb3Js === "bigint") {
      if (key === "value") {
        propertyFromWeb3Js = BigNumber.from(propertyFromWeb3Js); // convert JS bigint into BigNumber for ethers.js v5
      } else {
        propertyFromWeb3Js = Number(propertyFromWeb3Js);
      }
    }
    if (key === "to") {
      propertyFromWeb3Js = ownAddress;
    }
    if (propertyFromWeb3Js !== undefined) {
      unsignedTxEthersjs[key] = propertyFromWeb3Js;
    }
    if (unsignedTxEthersjs[key] === undefined) {
      throw Error("missing property " + key + " in txRequestFromWeb3Js");
    }
  }
  Object.freeze(unsignedTxEthersjs);

  return utils.serializeTransaction(
    unsignedTxEthersjs as UnsignedTransaction,
    sigHex
  );
}

export async function signTransactionWithSigHex(
  txRequest: Transaction,
  ownAddress: string
): Promise<string> {
  const unsignedRawTx = txRequest.getMessageToSign(false);
  const serializedHexTx = rlpEncodeTx(unsignedRawTx);
  console.log("unsignedTxHex", serializedHexTx);

  return new Promise((resolve, reject) => {
    nomoSignEvmTransaction({ messageHex: serializedHexTx })
      .then((res) => {
        console.log("resFromNomo", res.sigHex);

        const signedRawTx = appendSignatureToTxFromWebJs(
          txRequest,
          res.sigHex,
          ownAddress
        );
        resolve(signedRawTx);
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
  //const gasPrice = await web3.eth.getGasPrice();

  const txData = {
    nonce: nonce,
    to: ownAddress, // send ZENIQ to ourselves
    value: web3.utils.toBigInt(value),
    gasLimit: 21000n,
    gasPrice: 10000000000,
  };

  const transaction: Transaction = Transaction.fromTxData(txData, { common });

  const signedTxHex = await signTransactionWithSigHex(transaction, ownAddress);

  const res = await web3.eth.sendSignedTransaction(signedTxHex);
  console.log("res", res);
  return res;
}
