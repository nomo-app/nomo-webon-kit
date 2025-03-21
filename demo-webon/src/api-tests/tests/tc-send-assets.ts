import {
  contractAddressZENIQZEN20,
  nomo,
  NomoAssetSelector,
  NomoEvmNetwork,
} from "nomo-webon-kit";
import { NomoTest } from "../test-kit/nomo-test";

async function nomoSendAssetExpectCancel(args: {
  asset?: NomoAssetSelector;
  targetAddress?: string;
  amount?: string;
}) {
  try {
    await nomo.sendAssets(args);
  } catch (e: any) {
    const eObject = JSON.parse(e);
    if (
      eObject.nomoSendAssets &&
      eObject.nomoSendAssets.includes("User cancelled the Action")
    ) {
      return; // pass
    } else {
      throw e;
    }
  }
  throw new Error("The tester did not cancel the action");
}

class SendAssetsNativeEthereumCancel extends NomoTest {
  constructor() {
    super({
      name: "Send Assets: Ethereum",
      description: "Do not send, click the back-button.",
    });
  }

  async run() {
    const asset: NomoAssetSelector = {
      symbol: "ETH",
      name: "Ethereum",
      network: "ethereum",
    };
    await nomoSendAssetExpectCancel({ asset });
  }
}

class SendAssetsNativePolygon extends NomoTest {
  constructor() {
    super({
      name: "Send Assets: Polygon",
      description: "Send native Polygon to yourself.",
    });
  }

  async run() {
    const asset: NomoAssetSelector = {
      symbol: "Polygon",
      name: "Polygon",
      network: "polygon",
    };
    const targetAddress = await nomo.getEvmAddress();
    await nomo.sendAssets({
      asset,
      targetAddress,
      amount: "100000000000000000", // in wei
    });
  }
}

class SendAssetsNativeZENIQ extends NomoTest {
  constructor() {
    super({
      name: "Send Assets: ZENIQ Smartchain",
      description: "Send native ZENIQ to yourself.",
    });
  }

  async run() {
    const asset: NomoAssetSelector = {
      symbol: "ZENIQ",
      name: "ZENIQ",
      network: "zeniq-smart-chain",
    };
    const targetAddress = await nomo.getEvmAddress();
    await nomo.sendAssets({
      asset,
      targetAddress,
      amount: "100000000000000000", // in wei
    });
  }
}

class SendAssetsAutoWrappedNativeZENIQZEN20 extends NomoTest {
  constructor() {
    super({
      name: "Send Assets: ZENIQ Smartchain ZEN20",
      description: "Send auto-wrapped ZENIQ-ZEN20 to yourself.",
    });
  }

  async run() {
    const asset: NomoAssetSelector = {
      symbol: "ZENIQ",
      name: "ZENIQ",
      network: "zeniq-smart-chain",
      contractAddress: contractAddressZENIQZEN20,
    };
    const targetAddress = await nomo.getEvmAddress();
    await nomo.sendAssets({
      asset,
      targetAddress,
      amount: "100000000000000000", // in wei
    });
  }
}

class SendAssetsNativeBNB extends NomoTest {
  constructor() {
    super({
      name: "Send Assets: BNB",
      description: "Send native BNB to yourself.",
    });
  }

  async run() {
    const asset: NomoAssetSelector = {
      symbol: "BNB",
      name: "BNB",
      network: "binance-smart-chain",
    };
    const targetAddress = await nomo.getEvmAddress();
    await nomo.sendAssets({
      asset,
      targetAddress,
      amount: "10000000000000000", // in wei
    });
  }
}

class SendAssetsPoly20BRZ extends NomoTest {
  constructor() {
    super({
      name: "Send Assets: POLY20-BRZ",
      description: "Send BRZ to yourself.",
    });
  }

  async run() {
    const targetAddress = await nomo.getEvmAddress();
    const asset: NomoAssetSelector = {
      name: "BRZ Token",
      symbol: "BRZ",
      contractAddress: "0x4eD141110F6EeeAbA9A1df36d8c26f684d2475Dc",
      network: "polygon",
    };
    await nomo.sendAssets({
      asset,
      targetAddress,
      amount: "500000000000000000000",
    });
  }
}

class SendAssetsBEP20USDT extends NomoTest {
  constructor() {
    super({
      name: "Send Assets: BEP20-USDT",
      description: "Send USDT to yourself.",
    });
  }

  async run() {
    const targetAddress = await nomo.getEvmAddress();
    const asset: NomoAssetSelector = {
      uuid: "f5ed1cc1-c854-564f-9fa7-ffa7f2d73bc5",
      symbol: "USDT",
      //contractAddress: "0x55d398326f99059fF775485246999027B3197955",
      //network: "binance-smart-chain",
    };
    await nomo.sendAssets({
      asset,
      targetAddress,
      amount: "100000", // in wei
    });
  }
}

class SendAssetsBEP20BUSD extends NomoTest {
  constructor() {
    super({
      name: "Send Assets: BEP20-BUSD",
      description: "Send BUSD to yourself.",
    });
  }

  async run() {
    const targetAddress = await nomo.getEvmAddress();
    const asset: NomoAssetSelector = {
      symbol: "BUSD",
      contractAddress: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
      network: "binance-smart-chain",
    };
    await nomo.selectAssets(asset);
    await nomo.sendAssets({
      asset,
      targetAddress,
      amount: "10000", // in wei
    });
  }
}

class SendAssetsZEN205RINGS extends NomoTest {
  constructor() {
    super({
      name: "Send Assets: ZEN20-5RINGS",
      description: "Send 5RINGS to yourself.",
    });
  }

  async run() {
    const targetAddress = await nomo.getEvmAddress();
    const asset: NomoAssetSelector = {
      symbol: "5RINGS",
      contractAddress: "0x1F23F743aB71b38919b40c9CAECBA3B1296767de",
      network: "zsc" as NomoEvmNetwork,
    };
    await nomo.selectAssets(asset);
    await nomo.sendAssets({
      asset,
      targetAddress,
      amount: "10000", // in wei
    });
  }
}

class SendAssetsAmbiguous extends NomoTest {
  constructor() {
    super({
      name: "Ambiguous asset",
      description:
        "Ambiguous asset resolution: Symbol 'ETH' with missing network specification.",
    });
  }

  async run() {
    try {
      await nomo.sendAssets({
        asset: { symbol: "ETH" },
      });
    } catch (e: any) {
      const eObject = JSON.parse(e);
      if (
        eObject.nomoSendAssets &&
        eObject.nomoSendAssets.includes(
          "More than one asset matched the AssetSelector"
        )
      ) {
        return; // pass
      } else {
        throw e;
      }
    }
    throw new Error("expected to throw but did not throw");
  }
}
class SendAssetsUnknownUUID extends NomoTest {
  constructor() {
    super({
      name: "Unknown uuid",
      description:
        "Failed asset resolution: Try to send an asset with a non-existing uuid.",
    });
  }

  async run() {
    try {
      await nomo.sendAssets({
        asset: { symbol: "ETH", uuid: "some-garbage-uuid" },
      });
    } catch (e: any) {
      if (
        e.message === "Could not find an asset with uuid: some-garbage-uuid"
      ) {
        return; // pass
      } else {
        throw e;
      }
    }
    throw new Error("expected to throw but did not throw");
  }
}

class GetBalanceUUID extends NomoTest {
  constructor() {
    super({
      name: "getBalance: uuid",
      description: "NomoAssetSelector with uuid for asset resolution.",
    });
  }

  async run() {
    const asset: NomoAssetSelector = {
      uuid: "bec85c96-16fe-95ee-0e89-24c5af79675f",
      symbol: "BNB",
    };
    const res = await nomo.getBalance(asset);
    if ((res.network as string) !== "bsc") {
      throw new Error("unexpected network: " + res.network);
    }
    if (res.name !== "ZENIQ") {
      throw new Error("unexpected name: " + res.name);
    }
    if (res.contractAddress !== "0x5b52bfB8062Ce664D74bbCd4Cd6DC7Df53Fd7233") {
      throw new Error("unexpected contractAddress: " + res.contractAddress);
    }
    if (res.decimals !== 18) {
      throw new Error("unexpected decimals: " + res.decimals);
    }
  }
}

export const sendAssetsManualTests: Array<NomoTest> = [
  new SendAssetsNativeEthereumCancel(),
  new SendAssetsNativePolygon(),
  new SendAssetsNativeBNB(),
  new SendAssetsNativeZENIQ(),
  new SendAssetsAutoWrappedNativeZENIQZEN20(),
  new SendAssetsPoly20BRZ(),
  new SendAssetsBEP20USDT(),
  new SendAssetsBEP20BUSD(),
  new SendAssetsZEN205RINGS(),
];

export const sendAssetsUnitTests: Array<NomoTest> = [
  new SendAssetsAmbiguous(),
  new SendAssetsUnknownUUID(),
  new GetBalanceUUID(),
];
