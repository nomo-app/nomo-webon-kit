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
    if (wallets.length <= 0) {
      throw new Error("Failed to get wallets");
    }
    const firstWallet = wallets[0];
    const evmAddress = await nomo.getEvmAddress();
    if (firstWallet.evmAddress !== evmAddress) {
      throw new Error(
        "nomo.getEvmAddress does not match with the first wallet"
      );
    }
    if (firstWallet.derivationPath !== "0") {
      throw new Error("First wallet should have derivationPath 0");
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
