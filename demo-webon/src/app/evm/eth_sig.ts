import { ethers } from "ethers";
import { nomo } from "nomo-webon-kit";

export async function ethSigDemo(): Promise<{
  ethSigValid: boolean;
  ethSig: string;
}> {
  const message = "this message might be a JWT or a QRCode or something else";

  const res = await nomo.signEvmMessage({
    message,
  });
  const ethSig = res.sigHex; // in a real backend, "ethSig" might come either via the Nomo-ID or via the Nomo-Auth protocol

  const ethSignerAddress = await nomo.getEvmAddress(); // in a real backend, "ethSignerAddress" might be stored in a database

  const ethSigValid = verifyEthSig({
    ethSig,
    ethSignerAddress,
    message,
  });

  return {
    ethSigValid,
    ethSig,
  };
}

/**
 * This function verifies an "ethSig" sig by utilizing ethers.js-V6.
 * Before calling this function, both "ethSignerAddress" and "message" should be independently verified.
 * For debugging, you could also use https://etherscan.io/verifiedSignatures for verifying ethSigs.
 */
export function verifyEthSig(args: {
  ethSig: string;
  ethSignerAddress: string;
  message: string;
}): boolean {
  const usedSignerAddress = ethers.verifyMessage(args.message, args.ethSig);
  const ethSigValid =
    usedSignerAddress.toLowerCase() === args.ethSignerAddress.toLowerCase();
  return ethSigValid;
}
