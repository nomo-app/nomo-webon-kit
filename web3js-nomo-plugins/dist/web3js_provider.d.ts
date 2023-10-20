import { Transaction } from "web3-eth-accounts";
export declare function rlpEncodeTx(data: Uint8Array[]): string;
export declare function appendSignatureToTxFromWebJs(txRequestFromWeb3Js: Transaction, sigHexFromNative: string): string;
export declare function signWeb3JsTransactionWithNomo(txRequest: Transaction, ownAddress: string): Promise<string>;
export declare function sendDemoTransaction(): Promise<import("web3").TransactionReceipt>;
