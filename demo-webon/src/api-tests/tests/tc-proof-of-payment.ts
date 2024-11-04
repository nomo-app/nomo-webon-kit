import {
  nomo,
  NomoAssetSelector,
  NomoCoinType,
  NomoProofOfPayment,
} from "nomo-webon-kit";
import { NomoTest } from "../test-kit/nomo-test";

async function proofOfPaymentTest(
  asset: NomoAssetSelector,
  coin: NomoCoinType
) {
  const assetState = await nomo.getBalanceWaitUntilSynced(asset);
  const res = await nomo.getTransactions(assetState);
  console.log("res", res);
  if (res.txs.length === 0) {
    throw new Error(
      `No ${asset.name} txs found in this wallet -> cannot prove a payment.`
    );
  }
  const sentTxs = res.txs.filter((tx) => tx.transferMethod === 1);
  if (sentTxs.length === 0) {
    throw new Error(
      `No sent ${asset.name} txs found in this wallet -> cannot prove a payment.`
    );
  }
  const firstTx = sentTxs[0];
  const hash = firstTx.hash;
  if (!hash) {
    throw new Error(asset.name + ": No hash in first tx");
  }

  let result: NomoProofOfPayment = await nomo.proofOfPayment({
    coin,
    hash,
  });
  if (!result.pops.length) {
    throw new Error(asset.name + ": pops.length is zero");
  }
}

class ProofOfPaymentEc8 extends NomoTest {
  constructor() {
    super({
      name: "Proof of Payment Eurocoin",
      description:
        "Prove that a Eurocoin-transaction corresponds to an EVM-wallet",
    });
  }

  async run() {
    const asset: NomoAssetSelector = {
      symbol: "EURO",
      name: "Eurocoin",
    };
    const coin: NomoCoinType = "ec8";
    await proofOfPaymentTest(asset, coin);
  }
}

class ProofOfPaymentBtc extends NomoTest {
  constructor() {
    super({
      name: "Proof of Payment Bitcoin",
      description:
        "Prove that a Bitcoin-transaction corresponds to an EVM-wallet",
    });
  }

  async run() {
    const asset: NomoAssetSelector = {
      symbol: "BTC",
      name: "Bitcoin",
      network: "bitcoin",
    };
    const coin: NomoCoinType = "btc";
    await proofOfPaymentTest(asset, coin);
  }
}

class ProofOfPaymentLitecoin extends NomoTest {
  constructor() {
    super({
      name: "Proof of Payment Litecoin",
      description:
        "Prove that a Litecoin-transaction corresponds to an EVM-wallet",
    });
  }

  async run() {
    const asset: NomoAssetSelector = {
      symbol: "LTC",
      name: "Litecoin",
      network: "litecoin",
    };
    const coin: NomoCoinType = "ltc";
    await proofOfPaymentTest(asset, coin);
  }
}

export const proofOfPaymentTests: Array<NomoTest> = [
  new ProofOfPaymentEc8(),
  new ProofOfPaymentBtc(),
  new ProofOfPaymentLitecoin(),
];
