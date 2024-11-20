import { nomo, NomoAssetSelector } from "nomo-webon-kit";
import { NomoTest } from "../test-kit/nomo-test";

class GetEPubKeyEuro extends NomoTest {
  constructor() {
    super({
      name: "ePubKey EURO",
      description: "Get an extended public key to derive Eurocoin-addresses.",
    });
  }

  async run() {
    const asset: NomoAssetSelector = {
      symbol: "EURO",
      name: "Eurocoin",
    };
    const res = await nomo.getExtendedPublicKey(asset);
    if (!res.ePubKey.length) {
      throw new Error("returned ePubKey empty.");
    }
  }
}

class GetEPubKeyBitcoin extends NomoTest {
  constructor() {
    super({
      name: "ePubKey BTC",
      description: "Get an extended public key to derive Bitcoin-addresses.",
    });
  }

  async run() {
    const asset: NomoAssetSelector = {
      symbol: "BTC",
      name: "Bitcoin",
    };
    const res = await nomo.getExtendedPublicKey(asset);
    if (!res.ePubKey.length) {
      throw new Error("returned ePubKey empty.");
    }
  }
}

class GetEurocoinTest extends NomoTest {
  constructor() {
    super({
      name: "Get TX: Eurocoin",
      description: "Get a balance and transactions for Eurocoin.",
    });
  }

  async run() {
    const asset: NomoAssetSelector = {
      symbol: "EURO",
      name: "Eurocoin",
    };
    const assetState = await nomo.getBalanceWaitUntilSynced(asset);
    const res = await nomo.getTransactions(assetState);
    if (res.txs.length === 0) {
      throw new Error("No Eurocoin transactions found in this wallet.");
    }
  }
}

class GetZSCTest extends NomoTest {
  constructor() {
    super({
      name: "Get TX: ZSC",
      description: "Get a balance and transactions for ZENIQ Smartchain.",
    });
  }

  async run() {
    const asset: NomoAssetSelector = {
      symbol: "ZENIQ Token",
      name: "ZENIQ",
    };
    const assetState = await nomo.getBalanceWaitUntilSynced(asset);
    const res = await nomo.getTransactions(assetState);
    if (res.txs.length === 0) {
      throw new Error("No ZENIQ Smartchain transactions found in this wallet.");
    }
  }
}

export const getTransactionTests: Array<NomoTest> = [
  new GetEurocoinTest(),
  new GetZSCTest(),
  new GetEPubKeyEuro(),
  new GetEPubKeyBitcoin(),
];
