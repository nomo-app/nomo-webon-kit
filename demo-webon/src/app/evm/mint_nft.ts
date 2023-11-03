import { ethers, TransactionResponse } from "ethers";
import { zscSigner, zscProvider } from "ethersjs-nomo-webons";
import Nft from "../abi/NFT.json";
import {
  extractContractAddress,
  throwIfFundsAreInsufficient,
} from "./evm_utils";

/**
 * This is an example of a smart-contract-call via the EthersJS-Nomo-WebOns package.
 */
export async function mintNFT(): Promise<TransactionResponse | any> {
  /**
   * Philosophy of error handling:
   * Do not silent-catch errors here, instead catch errors in the UI-layer
   * where it is possible to show meaningful error-messages!
   */
  await throwIfFundsAreInsufficient();

  const contractAddress = await extractContractAddress({ contractJson: Nft });
  const contract = new ethers.Contract(
    contractAddress,
    Nft.abi,
    zscProvider as any
  );

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
  };
  const res = await zscSigner.sendTransaction(tx);
  return res;
}
