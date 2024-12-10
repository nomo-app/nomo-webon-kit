import { nomo, NomoAssetSelector } from "nomo-webon-kit";
import { NomoTest } from "../test-kit/nomo-test";
import {
  ERC721Entity,
  nomoFetchERC721,
  zscProvider,
} from "ethersjs-nomo-webons";

class FetchERC721Test extends NomoTest {
  constructor() {
    super({
      name: "Fetch ERC721",
      description: "Fetch AVINOC-NFTs with ethersjs-nomo-webons.",
    });
  }

  async run() {
    const provider = zscProvider;
    const testWalletAddress = "0x1464935f48ca992d1a0bEAA2358471d7Cb6374E5";
    const stakingContractAddress = "0x97F51eCDeEdecdb740DD1ff6236D013aFff0417d";
    const res = await nomoFetchERC721({
      evmAddress: testWalletAddress,
      provider,
      nftContractAddress: stakingContractAddress,
    });
    if (!res.length) {
      throw new Error("No AVINOC staking NFTs found in " + testWalletAddress);
    }
    const nft: ERC721Entity = res[0];
    if (nft.contractAddress !== stakingContractAddress) {
      throw new Error("Unexpected contract address: " + nft.contractAddress);
    }
    if (nft.tokenID !== 1000000003n) {
      throw new Error("Unexpected tokenID: " + nft.tokenID);
    }
    if (
      nft.hash !==
      "0x9e6d949e8edf1944e3304192356ffebee139850a50020faa1d86849616da6371"
    ) {
      throw new Error("Unexpected hash: " + nft.hash);
    }
  }
}

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
    const assetState = await nomo.getBalance(asset);
    const res = await nomo.getTransactions(assetState);
    if (res.txs.length === 0) {
      throw new Error("No Eurocoin transactions found in this wallet.");
    }
  }
}

class GitBitcoinTest extends NomoTest {
  constructor() {
    super({
      name: "Get TX: Bitcoin",
      description: "Get a balance and transactions for Bitcoin.",
    });
  }

  async run() {
    const asset: NomoAssetSelector = {
      symbol: "BTC",
      name: "Bitcoin",
    };
    const assetState = await nomo.getBalanceWaitUntilSynced(asset);
    const res = await nomo.getTransactions(assetState);
    if (res.txs.length === 0) {
      throw new Error("No Bitcoin transactions found in this wallet.");
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
    const assetState = await nomo.getBalance(asset);
    const res = await nomo.getTransactions(assetState);
    if (res.txs.length === 0) {
      throw new Error("No ZENIQ Smartchain transactions found in this wallet.");
    }
  }
}

export const getTransactionTests: Array<NomoTest> = [
  new FetchERC721Test(),
  new GetEurocoinTest(),
  new GitBitcoinTest(),
  new GetZSCTest(),
  new GetEPubKeyEuro(),
  new GetEPubKeyBitcoin(),
];
