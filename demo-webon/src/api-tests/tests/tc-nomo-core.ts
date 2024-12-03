import { nomo } from "nomo-webon-kit";
import { NomoTest } from "../test-kit/nomo-test";

class CheckIfRealNomoTest extends NomoTest {
  constructor() {
    super({
      name: "Anti-spam",
      description:
        "Check if a request comes from a real Nomo-wallet and not from some automated script.",
    });
  }

  async run() {
    const evmAddress = await nomo.getEvmAddress();
    const res = await nomo.authHttp({
      url: "https://nomoplus.com/api/has-nomo",
      method: "POST",
      body: { eth_addr: evmAddress },
    });
    const resJson = JSON.parse(res.response);
    if (!resJson.has_nomo) {
      throw new Error(
        "has_nomo is not true. Is this a real Nomo wallet? " + res.response
      );
    }
  }
}

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

export const nomoCoreTests: Array<NomoTest> = [
  new CheckIfRealNomoTest(),
  new EvmChecksumTest(),
];
