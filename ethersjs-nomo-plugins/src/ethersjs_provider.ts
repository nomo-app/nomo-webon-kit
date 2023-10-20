import { TransactionResponse, ethers, TransactionRequest, BigNumberish } from "ethers";
import { EthersjsNomoSigner } from "./ethersjs_nomo_signer";

const rpcUrlZeniqSmartChain = "https://smart.zeniq.network:9545";
const chainIdZeniqSmartChain = 383414847825;

export const zscProvider = new ethers.JsonRpcProvider(
  rpcUrlZeniqSmartChain,
  chainIdZeniqSmartChain
);
export const zscSigner = new EthersjsNomoSigner(zscProvider);

export async function sendDemoTransaction(): Promise<TransactionResponse> {
  const ownAddress = await zscSigner.getAddress();
  const value: BigNumberish = ethers.parseUnits("0.1", 18);
  const gasPrice: BigNumberish = 10000000000;
  const nonce: number = await zscSigner.getNonce();
  const chainId: BigNumberish = chainIdZeniqSmartChain;
  const tx: TransactionRequest = {
    to: ownAddress, // send ZENIQ to ourselves
    value: value,
    gasLimit: 21000,
    gasPrice: gasPrice,
    nonce: 1130,
    chainId: chainId,
    type: 0,
  };

  const res = await zscSigner.sendTransaction(tx);
  return res;
}
