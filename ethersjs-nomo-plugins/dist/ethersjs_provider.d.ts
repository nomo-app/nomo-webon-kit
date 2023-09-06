import { ethers, providers } from "ethers";
import { EthersjsNomoSigner } from "./ethersjs_nomo_signer";
export declare const zscProvider: ethers.providers.JsonRpcProvider;
export declare const zscSigner: EthersjsNomoSigner;
export declare function sendDemoTransaction(): Promise<providers.TransactionResponse>;
