import { TransactionResponse, ethers } from "ethers";
import { EthersjsNomoSigner } from "./ethersjs_nomo_signer";
export declare const zscProvider: ethers.JsonRpcProvider;
export declare const zscSigner: EthersjsNomoSigner;
export declare function sendDemoTransaction(): Promise<TransactionResponse>;
