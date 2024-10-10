import { nomo } from "nomo-webon-kit";
import { NomoTest } from "../test-kit/nomo-test";

class ResolveENSName extends NomoTest {
  constructor() {
    super({
      name: "Resolve ENS",
      description: "Resolve a name to an address with Ethereum Name Service.",
    });
  }

  async run() {
    const name = "vitalik.eth";
    const res = await nomo.resolveName({ name });
    if (res.address !== "0xd8da6bf26964af9d7eed9e03e53415d37aa96045") {
      throw new Error(`Unexpected address: ${res.address}`);
    }
    if (res.nameService !== "ENS") {
      throw new Error(`Unexpected name service: ${res.nameService}`);
    }
  }
}

class ResolveZNSName extends NomoTest {
  constructor() {
    super({
      name: "Resolve ZNS",
      description: "Resolve a name to an address with ZENIQ Name Service.",
    });
  }

  async run() {
    const name = "znswallet.znq";
    const res = await nomo.resolveName({ name });
    if (res.address !== "0x00002ffCd5282Bbb0aAD8c2FaF313b28c8A582B9".toLowerCase()) {
      throw new Error(`Unexpected address: ${res.address}`);
    }
    if (res.nameService !== "ZNS") {
      throw new Error(`Unexpected name service: ${res.nameService}`);
    }
  }
}

export const resolveNameTests: Array<NomoTest> = [
  new ResolveENSName(),
  new ResolveZNSName(),
];
