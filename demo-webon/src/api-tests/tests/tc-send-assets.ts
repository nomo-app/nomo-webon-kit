import { nomo } from "nomo-webon-kit";
import { NomoTest } from "../test-kit/nomo-test";

class SendAssetsCancel extends NomoTest {
  constructor() {
    super({
      name: "Send Assets: Cancel",
      description: "Do NOT send assets, instead click the back-button.",
    });
  }

  async run() {
    try {
      await nomo.sendAssets({
        asset: { symbol: "ETH", name: "Ethereum", network: "ethereum" },
      });
    } catch (e: any) {
      const eObject = JSON.parse(e);
      if (
        eObject.nomoSendAssets &&
        eObject.nomoSendAssets.includes("User cancelled the Action")
      ) {
        return; // pass
      } else {
        throw e;
      }
    }
    throw new Error("The tester did not cancel the action");
  }
}

class SendAssetsAmbiguous extends NomoTest {
  constructor() {
    super({
      name: "Send Assets: Ambiguous asset resolution",
      description: "Symbol ETH with missing network specification.",
    });
  }

  async run() {
    try {
      await nomo.sendAssets({
        asset: { symbol: "ETH" },
      });
    } catch (e: any) {
      const eObject = JSON.parse(e);
      if (
        eObject.nomoSendAssets &&
        eObject.nomoSendAssets.includes(
          "More than one asset matched the AssetSelector"
        )
      ) {
        return; // pass
      } else {
        throw e;
      }
    }
    throw new Error("expected to throw but did not throw");
  }
}

export const sendAssetsManualTests: Array<NomoTest> = [
  new SendAssetsCancel(),
];

export const sendAssetsUnitTests: Array<NomoTest> = [
  new SendAssetsAmbiguous(),
];
