import { nomo, NomoProofOfPayment } from "nomo-webon-kit";
import { NomoTest } from "../test-kit/nomo-test";

class ProofOfPaymentDemo extends NomoTest {
  constructor() {
    super({
      name: "Proof of Payment",
      description:
        "Prove that some UTXO-transaction corresponds to an EVM-wallet",
    });
  }

  async run() {
    let result: NomoProofOfPayment = await nomo.proofOfPayment({
      coin: "ec8",
      hash: "0b7868c56ee6e11b0a32eb10cdc6da0bb4a2e37dbbf1ddbfbf7dc3ce3943ebbb",
    });
    if (!result.pops.length) {
      throw new Error("pops.length is zero");
    }
  }
}

export const proofOfPaymentTests: Array<NomoTest> = [
  new ProofOfPaymentDemo(),
];
