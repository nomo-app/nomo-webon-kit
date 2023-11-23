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
  const ethSig = res.sigHex; // In a real backend, "ethSig" might come either via the Nomo-ID or via the Nomo-Auth protocol.
  // The function "nomo.authHttp()" will automatically inject an ethSig into the HTTP-headers.
  // See https://github.com/nomo-app/nomo-id or https://github.com/nomo-app/nomo-auth for more details about those protocols.

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
 * This function verifies an "ethSig" by utilizing ethers.js-V6.
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
  // If "ethSigValid" is true, then the user is in possession of the private seed phrase for the "ethSignerAddress".
  // Depending on the use case, you might also verify the freshness of "ethSig" by including a nonce in the message.
  return ethSigValid;
}
