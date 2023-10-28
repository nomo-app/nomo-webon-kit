import { BlockTag, Provider, Signer, TransactionLike, TransactionRequest, TransactionResponse, TypedDataDomain, TypedDataField } from "ethers";
export declare class EthersjsNomoSigner implements Signer {
    constructor(provider: Provider);
    provider: Provider;
    connect(_provider: Provider): Signer;
    getNonce(blockTag?: BlockTag | undefined): Promise<number>;
    populateCall(tx: TransactionRequest): Promise<TransactionLike<string>>;
    populateTransaction(tx: TransactionRequest): Promise<TransactionLike<string>>;
    estimateGas(tx: TransactionRequest): Promise<bigint>;
    call(tx: TransactionRequest): Promise<string>;
    resolveName(name: string): Promise<string | null>;
    sendTransaction(tx: TransactionRequest): Promise<TransactionResponse>;
    signTypedData(domain: TypedDataDomain, types: Record<string, TypedDataField[]>, value: Record<string, any>): Promise<string>;
    getAddress(): Promise<string>;
    signMessage(_message: any | string): Promise<string>;
    signTransaction(txRequest: TransactionRequest): Promise<string>;
}
