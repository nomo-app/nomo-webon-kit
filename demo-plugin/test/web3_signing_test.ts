import { BigNumber } from "ethers/lib/ethers";
import {
  nomoGetWalletAddresses,
  nomoSignEvmTransaction,
} from "nomo-plugin-kit/dist/nomo_api";

function resolveSig(sigHex: string) {
  const r = BigNumber.from("0x" + sigHex.slice(0, 64)).toBigInt();
  const s = BigNumber.from("0x" + sigHex.slice(64, 128)).toBigInt();
  const v = BigNumber.from("0x" + sigHex.slice(128, 130)).toBigInt();
  return { v, r, s };
}

export async function testSigning(): Promise<string> {
  const inputHex =
    "0xf382049a8502540be4008252089405870f1507d820212e921e1f39f14660336231d188016345785d8a0000808559454e49518080";

  const expectedR: bigint =
    31985617787800161498695495446856197366320382904444210264230862608320524360576n;
  const expectedS: bigint =
    8257219745238357900642489194207469846836140993477625668205050420177290661755n;
  const expectedV: bigint = 27n;

  const addresses = await nomoGetWalletAddresses();
  const ownAddress = addresses.walletAddresses["ETH"];
  if (ownAddress !== "0x05870f1507d820212E921e1f39f14660336231D1") {
    return "This test only works with the reject wallet";
  }

  const res = await nomoSignEvmTransaction({ messageHex: inputHex });
  console.log("sigFromNomo", res.sigHex);
  const { v, r, s } = resolveSig(res.sigHex);
  //   console.log("v", v);
  //   console.log("r", r);
  //   console.log("s", s);
  //   console.log("expectedR", expectedR);
  //   console.log("expectedS", expectedS);
  //   console.log("expectedV", expectedV);
  if (r !== expectedR || s !== expectedS || v !== expectedV) {
    return "TEST FAIL: expectedSig != sigFromNomo";
  } else {
    return "TEST SUCCESS: expectedSig == sigFromNomo";
  }
}
