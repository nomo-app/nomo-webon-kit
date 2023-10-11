import { Transaction } from "web3-eth-accounts";
export declare function getAddresses(): Promise<string>;
export declare function rlpEncodeTx(data: Uint8Array[]): string;
export declare function signTransactionWithSigHex(txRequest: Transaction, ownAddress: string): Promise<string>;
export declare function sendDemoTransaction(): Promise<import("web3").TransactionReceipt>;
