import { ethers, TransactionResponse } from "ethers";
import { zscSigner, zscProvider } from "ethersjs-nomo-webons";
import DemoContract from "../abi/DemoContract.json";
import { throwIfFundsAreInsufficient } from "./evm_utils";
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

  const contractAddress = "0x4a9E707fc2AbF8FcF840054F250E5416a3d8608B"; // contract address of the DemoContract token
  const contract = new ethers.Contract(
    contractAddress,
    DemoContract.abi,
    zscProvider as any
  );

  const data = "0xf34344"; // data could be a hash of an image or something
  const ownAddress = await zscSigner.getAddress(); // we are minting to our own wallet address
  const sampleBytesArray = [ethers.toUtf8Bytes('ArrayElement1'), ethers.toUtf8Bytes('ArrayElement2')]; // sample bytes array


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
    data: contract.interface.encodeFunctionData("mint", [ownAddress, data, sampleBytesArray, true, ['0x742d35Cc6634C0532925a3b844Bc454e4438f44e', '0x742d35Cc6634C0532925a3b844Bc454e4438f44e'], 23]),
    chainId: 383414847825, // chainId for ZENIQ Smartchain
  };
  const res = await zscSigner.sendTransaction(tx);
  await nomo.addCustomToken({
    symbol: "NomoDev",
    contractAddress,
    network: "zeniq-smart-chain",
  });

  return res;
}
