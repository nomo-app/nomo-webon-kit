import { zscSigner, zscProvider } from "ethersjs-nomo-webons";
import { nomo } from "nomo-webon-kit";

/**
 * Every WebOn should handle the case that funds are insufficient when sending a transaction!
 * There are utilitis like faucets available to obtain free funds.
 */
export async function throwIfFundsAreInsufficient(): Promise<void> {
  const ownAddress = await zscSigner.getAddress();
  const accountBalance = await zscProvider.getBalance(ownAddress);
  if (accountBalance === 0n) {
    throw new Error("Insufficient funds");
  }
}

/**
 * Tries to extract a contract address from an imported contract.
 * If this does not work, you could simply hardcode the desired contract address.
 */
export async function extractContractAddress(args: {
  contractJson: any;
}): Promise<string> {
  const network = await zscProvider.getNetwork();
  const networkId = network.chainId;
  const networkData = args.contractJson.networks[networkId.toString()];
  if (!networkData) {
    throw Error("Could not find network data in contract");
  }
  const contractAddress = networkData.address;
  return contractAddress;
}

export async function openFaucetIfNeeded(): Promise<boolean> {
  const ownAddress = await zscSigner.getAddress();
  const accountBalance = await zscProvider.getBalance(ownAddress);
  if (accountBalance === 0n) {
    await nomo.launchSmartchainFaucet();
    return true;
  }
  return false;
}
