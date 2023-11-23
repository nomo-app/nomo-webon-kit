import { ethers, TransactionResponse } from "ethers";
import { zscSigner, zscProvider } from "ethersjs-nomo-webons";
import NomoDev from "../abi/NomoDev.json";
import {
  throwIfFundsAreInsufficient,
} from "./evm_utils";
import { nomo } from "nomo-webon-kit";

/**
 * This is an example of a smart-contract-call via the EthersJS-Nomo-WebOns package.
 */
export async function mintNFT(): Promise<TransactionResponse | any> {
  /**
   * We do not silent-catch errors here, instead catch errors in the UI-layer
   * where it is possible to show error-messages to the user.
   */
  await throwIfFundsAreInsufficient();

  const contractAddress = "0x6D3bE2Fca848393eE83b2A1d65b312889cacF5e6"; // contract address of the NomoDev token
  const contract = new ethers.Contract(contractAddress, NomoDev.abi, zscProvider as any);

  const data = "0xf34344"; // data could be a hash of an image or something
  const ownAddress = await zscSigner.getAddress(); // we are minting to our own wallet address

  /**
   * The tx-object needs to be populated with almost all the properties for a transaction to go through.
   * See Ethereum documentation for more details about those properties.
   */
  const tx = {
    to: contractAddress,
    type: 0,
    gasLimit: 170000,
    gasPrice: 20000000000,
    nonce: await zscSigner.getNonce(),
    data: contract.interface.encodeFunctionData("mint", [ownAddress, data]),
    chainId: 383414847825, // chainId for ZENIQ Smartchain
  };
  const res = await zscSigner.sendTransaction(tx);
  await nomo.addCustomToken({ contractAddress, network: "zeniqSmartChain" });

  return res;
}
