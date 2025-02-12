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
    console.log("Wallets", wallets);
    const firstWallet = wallets[0];
    if (typeof firstWallet.hdPathIndex !== "number") {
      throw new Error("Wallet should have hdPathIndex as number");
    }
    if (typeof firstWallet.name !== "string") {
      throw new Error("Wallet should have name as string");
    }
    if (typeof firstWallet.evmAddress !== "string") {
      throw new Error("Wallet should have evmAddress as string");
    }
    if (typeof firstWallet.derivationPath !== "string") {
      throw new Error("Wallet should have bscAddress as string");
    }
    const evmAddress = await nomo.getEvmAddress();
    if (firstWallet.evmAddress.toLocaleLowerCase() !== evmAddress.toLocaleLowerCase()) {
      throw new Error(
        "nomo.getEvmAddress does not match with the first wallet"
      );
    }
    if (firstWallet.hdPathIndex !== 0) {
      throw new Error("First wallet should have hdPathIndex 0");
    }
    if (firstWallet.derivationPath !== "m/44'/60'/0'/0/0") {
      throw new Error("First wallet should have derivationPath m/44'/60'/0'/0/0");
    }
  }
}

class NomoSwitchWallet extends NomoTest {
  constructor() {
    super({
      name: "nomo.switchWallet()",
      description: "Test switching to second wallet",
    });
  }

  async run() {
    // Test 1: Switch wallet
    await nomo.switchWallet({
      hdPathIndex: 1,
    });
  }
}

export const nomoWalletsTest: Array<NomoTest> = [
  new NomoGetWallets(),
  new NomoSwitchWallet(),
];
