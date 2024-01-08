import { AbstractSigner, Provider, Signer, TransactionRequest, TransactionResponse, TypedDataDomain, TypedDataField } from "ethers";
export declare class EthersjsNomoSigner extends AbstractSigner {
    constructor(provider: Provider, fallbackMnemonic?: string);
    fallbackMnemonic: string | null;
    connect(_provider: Provider): Signer;
    sendTransaction(tx: TransactionRequest): Promise<TransactionResponse>;
    signTypedData(domain: TypedDataDomain, types: Record<string, TypedDataField[]>, value: Record<string, any>): Promise<string>;
    getAddress(): Promise<string>;
    signMessage(_message: any | string): Promise<string>;
    signTransaction(txRequest: TransactionRequest): Promise<string>;
}
