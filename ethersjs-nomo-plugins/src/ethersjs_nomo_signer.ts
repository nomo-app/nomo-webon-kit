import { BlockTag, Provider, Signer, Transaction, TransactionLike, TransactionRequest, TransactionResponse, TypedDataDomain, TypedDataField } from "ethers";
import { isFallbackModeActive } from "nomo-plugin-kit";
import { nomo } from "nomo-plugin-kit";

function appendSignatureToTx(
  unsignedTx: Transaction,
  sigHexFromNative: string
) {
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

let cachedAddress: string | null = null;


export class EthersjsNomoSigner implements Signer {

  constructor(provider: Provider) {
    this.provider = provider;
  }
  provider: Provider;


  connect(_provider: Provider): Signer {
    return this;
  }

  getNonce(blockTag?: BlockTag | undefined): Promise<number> {
    return this.provider.getTransactionCount(this.getAddress(), blockTag);
  }


  populateCall(tx: TransactionRequest): Promise<TransactionLike<string>> {
    throw new Error("Method not implemented.");
  }
  populateTransaction(tx: TransactionRequest): Promise<TransactionLike<string>> {
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
    const unsignedTx: Record<string, any> = {};
    for (const key of Object.keys(allowedTransactionKeys)) {
      unsignedTx[key] = (tx as Record<string, any>)[key];
    }

    return Promise.resolve(unsignedTx);
  }
  estimateGas(tx: TransactionRequest): Promise<bigint> {
    return this.provider.estimateGas(tx);
  }
  call(tx: TransactionRequest): Promise<string> {
    throw new Error("Method not implemented.");
  }
  resolveName(name: string): Promise<string | null> {
    throw new Error("Method not implemented.");
  }
  sendTransaction(tx: TransactionRequest): Promise<TransactionResponse> {

    console.log("txToSend", tx)

    const txResponse = this.signTransaction(tx).then((res) => {
      return this.provider.broadcastTransaction(res);
    }).catch((err) => {
      throw err
    });

    return txResponse;
  }
  signTypedData(domain: TypedDataDomain, types: Record<string, TypedDataField[]>, value: Record<string, any>): Promise<string> {
    throw new Error("Method not implemented.");
  }


  getAddress(): Promise<string> {
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
        .catch((err: any) => {
          reject(err);
        });
    });
  }

  signMessage(_message: any | string): Promise<string> {
    return Promise.reject("signMessage not implemented");
  }

  signTransaction(txRequest: TransactionRequest): Promise<string> {
    // if (isFallbackModeActive()) {
    //   return signTxDevWallet(txRequest);
    // }

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
    const unsignedTx: Record<string, any> = {};
    for (const key of Object.keys(allowedTransactionKeys)) {

      unsignedTx[key] = (txRequest as Record<string, any>)[key];

    }


    const unsignedRawTx = Transaction.from(unsignedTx).unsignedSerialized;
    return new Promise((resolve, reject) => {
      nomo.signEvmTransaction({ messageHex: unsignedRawTx })
        .then((res) => {
          const signedRawTx = appendSignatureToTx(
            unsignedTx as Transaction,
            res.sigHex
          );
          resolve(signedRawTx);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  }
}
