import { nomo } from "nomo-webon-kit";

export async function sendOnePercentOfBalance() {
  const res = await nomo.selectAssetFromDialog();
  const asset = res.selectedAsset;
  const balance = BigInt(asset.balance);
  const amount = balance / 100n;
  await nomo.sendAssets({
    asset,
    targetAddress: "0x7561DEAf4ECf96dc9F0d50B4136046979ACdAD3e",
    amount: amount.toString(), // must be in the smallest unit (e.g. wei or satoshi)
  });
}
