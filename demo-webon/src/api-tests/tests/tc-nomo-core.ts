import { nomo } from "nomo-webon-kit";
import { NomoTest } from "../test-kit/nomo-test";

class EvmChecksumTest extends NomoTest {
  constructor() {
    super({
      name: "EVM-address",
      description: "Check if your EVM-address has a mixed-case checksum.",
    });
  }

  async run() {
    const evmAddress = await nomo.getEvmAddress();
    if (!evmAddress.startsWith("0x")) {
      throw new Error("EVM-address should start with 0x");
    }
    if (evmAddress.toLowerCase() === evmAddress) {
      throw new Error("EVM-address should have mixed-case checksum");
    }
    if (evmAddress.length !== 42) {
      throw new Error("EVM-address should have 42 characters");
    }
    if (evmAddress.toUpperCase() === evmAddress) {
      throw new Error("EVM-address should not be all uppercase");
    }
  }
}

class NomoCloseTest extends NomoTest {
  constructor() {
    super({
      name: "nomo.close()",
      description: "Closes the current WebOn and then launches a deeplink.",
    });
  }

  async run() {
    const manifest = await nomo.getManifest();
    const url = manifest.webon_url;
    const deeplink = url
      .replace("https://", "https://nomo.app/webon/")
      .replace("http://", "http://nomo.app/webon/");
    await nomo.close({ deeplink }); // re-open the current WebOn after closing it
  }
}

export const nomoCoreTests: Array<NomoTest> = [
  new NomoCloseTest(),
  new EvmChecksumTest(),
];
