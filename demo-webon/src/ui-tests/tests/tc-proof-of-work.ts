import { nomo } from "nomo-webon-kit";
import { NomoTest } from "../test-kit/nomo-test";

class ProofOfWorkTest3Seconds extends NomoTest {
  constructor() {
    super({
      name: "Proof of work 3 seconds",
      description: "Solve a challenge to guard against spam.",
    });
  }

  async run() {
    await nomo.proofOfWork({
      challenge: "0FDA",
      shaInputPrefix: "ui-test-" + Date.now(),
    });
  }
}

export const proofOfWorkTests: Array<NomoTest> = [
  new ProofOfWorkTest3Seconds(),
];
