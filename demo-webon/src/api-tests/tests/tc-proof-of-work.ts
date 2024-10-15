import { invokeNomoFunction, nomo } from "nomo-webon-kit";
import { NomoTest } from "../test-kit/nomo-test";

class ProofOfWorkTest3Seconds extends NomoTest {
  constructor() {
    super({
      name: "Proof of work 3 seconds",
      description: "Solve a challenge to guard against spam.",
    });
  }

  async run() {
    const res = await invokeNomoFunction("nomoSha256", {value: "hello world"});
    if (res.digestHex !== "0039c7bb714b2f34be028cabe1da99250ff3f704bc38487e693c02228da7429b") {
      throw new Error("Unexpected digestHex: " + res.digestHex);
    }
    await nomo.proofOfWork({
      challenge: "0FDA",
      shaInputPrefix: "ui-test-" + Date.now(),
    });
  }
}

export const proofOfWorkTests: Array<NomoTest> = [
  new ProofOfWorkTest3Seconds(),
];
