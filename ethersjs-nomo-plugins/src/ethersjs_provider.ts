import { BigNumber, ethers, providers } from "ethers";
import { EthersjsNomoSigner } from "./ethersjs_nomo_signer";

const rpcUrlZeniqSmartChain = "https://smart.zeniq.network:9545";
const chainIdZeniqSmartChain = 383414847825;

export const zscProvider = new ethers.providers.JsonRpcProvider(
  rpcUrlZeniqSmartChain,
  chainIdZeniqSmartChain
);
export const zscSigner = new EthersjsNomoSigner(zscProvider);

export async function sendDemoTransaction(): Promise<providers.TransactionResponse> {
  const ownAddress = await zscSigner.getAddress();
  const value: BigNumber = ethers.utils.parseUnits("0.1", 18);
  const tx: providers.TransactionRequest = {
    nonce: 1178,
    to: ownAddress, // send ZENIQ to ourselves
    value,
    gasPrice: 10000000000,
    gasLimit: 21000,
  };

  console.log("tx", tx);

  const res = await zscSigner.sendTransaction(tx);
  return res;
}
