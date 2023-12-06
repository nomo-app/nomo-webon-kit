import { nomo } from "nomo-webon-kit";

export async function sendOnePercentOfBalance() {
  const res = await nomo.selectAssetFromDialog();
  const asset = res.selectedAsset;
  const balance = BigInt(asset.balance);
  const amount = balance / 100n;
  const ownAddress = await nomo.getEvmAddress();
  await nomo.sendAssets({
    asset,
    targetAddress: ownAddress,
    amount: amount.toString(), // must be in the smallest unit (e.g. wei or satoshi)
  });
}
