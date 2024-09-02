import { nomo } from "nomo-webon-kit";
import { NomoUITest } from "../test-kit/nomo-ui-test";

class ProofOfWorkTest3Seconds extends NomoUITest {
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

export const proofOfWorkTests = {
  proofOfWorkTest3Seconds: new ProofOfWorkTest3Seconds(),
};
