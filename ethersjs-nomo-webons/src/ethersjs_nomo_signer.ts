import {
  BlockTag,
  HDNodeWallet,
  Provider,
  Signer,
  Transaction,
  TransactionLike,
  TransactionRequest,
  TransactionResponse,
  TypedDataDomain,
  TypedDataField,
  Wallet,
} from "ethers";
import { isFallbackModeActive } from "nomo-webon-kit";
import { nomo } from "nomo-webon-kit";

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
}

let fallbackDevSigner: HDNodeWallet | null = null;

function createFallbackDevSigner(): HDNodeWallet {
  if (!fallbackDevSigner) {
    console.warn(
      "fallback mode: try to read NEXT_PUBLIC_FALLBACK_MNEMONIC from environment"
    );
    const mnemonic = process.env.NEXT_PUBLIC_FALLBACK_MNEMONIC;

    if (!mnemonic || !mnemonic.length) {
      throw Error(
        "NEXT_PUBLIC_FALLBACK_MNEMONIC is not defined. Create a .env.local to define it"
      );
    }

    fallbackDevSigner = Wallet.fromPhrase(mnemonic);
  }
  return fallbackDevSigner;
}

function signTxDevWallet(txRequest: TransactionRequest): Promise<string> {
  const devSigner = createFallbackDevSigner();
  return devSigner.signTransaction(txRequest);
}

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
  populateTransaction(
    tx: TransactionRequest
  ): Promise<TransactionLike<string>> {
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
  signTypedData(
    domain: TypedDataDomain,
    types: Record<string, TypedDataField[]>,
    value: Record<string, any>
  ): Promise<string> {
    throw new Error("Method not implemented.");
  }

  getAddress(): Promise<string> {
    if (isFallbackModeActive()) {
      return createFallbackDevSigner().getAddress();
    }
    return nomo.getEvmAddress();
  }

  signMessage(_message: any | string): Promise<string> {
    return Promise.reject("signMessage not implemented");
  }

  async signTransaction(txRequest: TransactionRequest): Promise<string> {
    console.log("isFallbackModeActive", isFallbackModeActive());

    if (isFallbackModeActive()) {
      return signTxDevWallet(txRequest);
    }

    console.log("unsignedTx", txRequest);
    const unsignedTx = await this.populateTransaction(txRequest);
    console.log("populatedTx", unsignedTx);

    const unsignedRawTx = Transaction.from(unsignedTx).unsignedSerialized;
    console.log("unsignedRawTx", unsignedRawTx);

    const res = await nomo.signEvmTransaction({ messageHex: unsignedRawTx });
    const signedRawTx = appendSignatureToTx(
      unsignedTx as Transaction,
      res.sigHex
    );
    return signedRawTx;
  }
}
