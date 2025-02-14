import { ethers } from "ethers";
import { EthersjsNomoSigner } from "./ethersjs_nomo_signer";
const rpcUrlZeniqSmartChain = "https://api.zeniq.network";
const chainIdZeniqSmartChain = 383414847825;
export const zscProvider = new ethers.providers.JsonRpcProvider(rpcUrlZeniqSmartChain, chainIdZeniqSmartChain);
export const zscSigner = new EthersjsNomoSigner(zscProvider);
export async function sendDemoTransaction() {
    const ownAddress = await zscSigner.getAddress();
    const value = ethers.utils.parseUnits("0.1", 18);
    const tx = {
        to: ownAddress,
        value,
        gasLimit: 21000,
    };
    const res = await zscSigner.sendTransaction(tx);
    return res;
}
