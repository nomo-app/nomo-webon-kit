import { nomo } from "nomo-webon-kit";

export async function openFaucetIfNeeded(): Promise<boolean> {
  const res = await nomo.getBalance({
    assetSymbol: "ZENIQ Token",
  });
  if (res.balance === "null") {
    res.balance = "0";
  }
  const balance = BigInt(res.balance ?? "0");
  if (balance === 0n) {
    await nomo.launchSmartchainFaucet();
    return true;
  }
  return false;
}
