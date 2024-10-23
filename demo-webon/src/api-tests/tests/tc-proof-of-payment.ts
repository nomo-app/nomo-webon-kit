import { nomo, NomoAssetSelector, NomoProofOfPayment } from "nomo-webon-kit";
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
    const asset: NomoAssetSelector = {
      symbol: "EURO",
      name: "Eurocoin",
    };
    const assetState = await nomo.getBalanceWaitUntilSynced(asset);
    const res = await nomo.getTransactions(assetState);
    console.log("res", res);
    if (res.txs.length === 0) {
      throw new Error("No Eurocoin txs found in this wallet -> cannot prove a payment.");
    }
    const sentTxs = res.txs.filter((tx) => tx.transferMethod === 1);
    if (sentTxs.length === 0) {
      throw new Error("No sent Eurocoin txs found in this wallet -> cannot prove a payment.");
    }
    const firstTx = sentTxs[0];
    const hash = firstTx.hash;
    if (!hash) {
      throw new Error("No hash in first tx");
    }

    let result: NomoProofOfPayment = await nomo.proofOfPayment({
      coin: "ec8",
      hash,
    });
    if (!result.pops.length) {
      throw new Error("pops.length is zero");
    }
  }
}

export const proofOfPaymentTests: Array<NomoTest> = [
  new ProofOfPaymentDemo(),
];
