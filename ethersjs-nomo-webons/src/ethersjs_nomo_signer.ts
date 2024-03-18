import {
  AbstractSigner,
  HDNodeWallet,
  Provider,
  Signer,
  Transaction,
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

function createFallbackDevSigner(fallbackMnemonic: string | null): HDNodeWallet {
  if (!fallbackDevSigner) {
    console.warn("fallback mode: try to use fallbackMnemonic");
    if (!fallbackMnemonic || !fallbackMnemonic.length) {
      throw Error(
        "fallbackMnemonic is not defined. Pass it to the constructor of EthersjsNomoSigner."
      );
    }
    fallbackDevSigner = Wallet.fromPhrase(fallbackMnemonic);
  }
  return fallbackDevSigner;
}

function signTxDevWallet(txRequest: TransactionRequest, fallbackMnemonic: string | null): Promise<string> {
  console.log("fallback mode: signTxDevWallet", txRequest);
  const devSigner = createFallbackDevSigner(fallbackMnemonic);
  return devSigner.signTransaction(txRequest);
}

export class EthersjsNomoSigner extends AbstractSigner {
  constructor(provider: Provider, fallbackMnemonic?: string) {
    super(provider);
    this.fallbackMnemonic = fallbackMnemonic ?? null;
  }
  fallbackMnemonic: string | null;

  connect(_provider: Provider): Signer {
    return this;
  }

  sendTransaction(tx: TransactionRequest): Promise<TransactionResponse> {
    console.log("txToSend", tx);

    const txResponse = this.signTransaction(tx)
      .then((res) => {
        return this.provider!.broadcastTransaction(res);
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
    return nomo.getEvmAddress();
  }

  signMessage(_message: any | string): Promise<string> {
    return Promise.reject("signMessage not implemented");
  }

  async signTransaction(txRequest: TransactionRequest): Promise<string> {
    console.log("unsignedTx", txRequest);
    const unsignedTx = await this.populateTransaction(txRequest);
    console.log("populatedTx", unsignedTx);

    if (unsignedTx.from) {
      unsignedTx.from = undefined; // prevent TypeError: unsigned transaction cannot define "from"
    }
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
