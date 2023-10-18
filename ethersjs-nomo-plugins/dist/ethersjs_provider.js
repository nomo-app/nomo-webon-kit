import { ethers } from "ethers";
import { EthersjsNomoSigner } from "./ethersjs_nomo_signer";
const rpcUrlZeniqSmartChain = "https://smart.zeniq.network:9545";
const chainIdZeniqSmartChain = 383414847825;
export const zscProvider = new ethers.JsonRpcProvider(rpcUrlZeniqSmartChain, chainIdZeniqSmartChain);
export const zscSigner = new EthersjsNomoSigner(zscProvider);
export async function sendDemoTransaction() {
    const ownAddress = await zscSigner.getAddress();
    const value = ethers.parseUnits("0.1", 18);
    const gasPrice = 10000000000;
    const nonce = await zscSigner.getNonce();
    const chainId = chainIdZeniqSmartChain;
    const tx = {
        to: ownAddress,
        value: value,
        gasLimit: 21000,
        gasPrice: gasPrice,
        nonce: nonce,
        chainId: chainId,
        type: 0,
    };
    const res = await zscSigner.sendTransaction(tx);
    return res;
}
