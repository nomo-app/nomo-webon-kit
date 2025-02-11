import { nomo } from "nomo-webon-kit";
import { NomoTest } from "../test-kit/nomo-test";

class NomoGetWallets extends NomoTest {
  constructor() {
    super({
      name: "nomo.getWallets()",
      description: "Test fetching all wallets",
    });
  }

  async run() {
    // Test 1: Get wallets
    const wallets = await nomo.getWallets();
    if (wallets.length > 0) {
      throw new Error("Failed to get wallets");
    }
  }
}

class NomoSwitchWallet extends NomoTest {
  constructor() {
    super({
      name: "nomo.switchWallet()",
      description: "Test switching wallets",
    });
  }

  async run() {
    // Test 1: Switch wallet
    await nomo.switchWallet({
      derivationPath: "1",
    });
  }
}

export const nomoWalletsTest: Array<NomoTest> = [
  new NomoGetWallets(),
  new NomoSwitchWallet(),
];
