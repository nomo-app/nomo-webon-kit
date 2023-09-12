import { Bytes, Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/abstract-provider";
import { Deferrable } from "@ethersproject/properties";
export declare class EthersjsNomoSigner extends Signer {
    constructor(provider: Provider);
    connect(_provider: Provider): Signer;
    getAddress(): Promise<string>;
    signMessage(_message: Bytes | string): Promise<string>;
    resolveSig(sigHex: string): bigint[];
    signTransaction(txRequest: Deferrable<TransactionRequest>): Promise<string>;
}
