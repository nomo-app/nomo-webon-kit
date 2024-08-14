import { nomo } from "nomo-webon-kit";
import { NomoUITest } from "../test-kit/nomo-ui-test";

class SendAssetsCancel extends NomoUITest {
  constructor() {
    super({
      name: "Send Assets Cancel",
      description: "Do NOT send assets, instead click the back-button.",
    });
  }

  async run() {
    await nomo.sendAssets({ asset: { symbol: "ZENIQ", name: "ZENIQ Token" } });
  }
}

export const sendAssetsTests = {
  sendAssetsCancel: new SendAssetsCancel(),
};
