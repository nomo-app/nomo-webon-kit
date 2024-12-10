import { nomo } from "nomo-webon-kit";
import { NomoTest } from "../test-kit/nomo-test";
import { mintNFT } from "../../app/evm/mint_nft";
import { openFaucetIfNeeded } from "../../app/evm/evm_utils";

class SignTxCancel extends NomoTest {
  constructor() {
    super({
      name: "Sign Tx: Cancel",
      description:
        "Do NOT sign the transaction, instead click the back-button.",
    });
  }

  async run() {
    try {
      await nomo.signEvmTransaction({
        messageHex:
          "0x02f86c0125830f424085010ffe7d9282ea6094f1ca9cb74685755965c7458528a36934df52a3ef80b844095ea7b30000000000000000000000007561deaf4ecf96dc9f0d50b4136046979acdad3effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc0",
      });
    } catch (e: any) {
      const eObject = JSON.parse(e);
      if (
        !!eObject.nomoSignEvmTransaction &&
        eObject.nomoSignEvmTransaction.includes(
          "the user did not authorize the EVM transaction"
        )
      ) {
        return; // pass
      } else {
        throw e;
      }
    }
    throw new Error("The tester did not cancel the tx-signing");
  }
}

class SignTxERC20Approval extends NomoTest {
  constructor() {
    super({
      name: "Sign Tx: AVINOC-ERC20 Approval",
      description: "Simulate an approval for AVINOC-ERC20 staking.",
    });
  }

  async run() {
    const res = await nomo.signEvmTransaction({
      messageHex:
        "0x02f86c0125830f424085010ffe7d9282ea6094f1ca9cb74685755965c7458528a36934df52a3ef80b844095ea7b30000000000000000000000007561deaf4ecf96dc9f0d50b4136046979acdad3effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc0",
    });
    if (res.sigHex.length !== 130) {
      throw new Error("sigHex length mismatch");
    }
  }
}

class SignTxZEN20Claiming extends NomoTest {
  constructor() {
    super({
      name: "Sign Tx: AVINOC-ZEN20 Claiming",
      description: "Simulate a claim of AVINOC-ZEN20 from a staking-NFT.",
    });
  }

  async run() {
    const res = await nomo.signEvmTransaction({
      messageHex:
        "0xf89182017c8502540be400830249f09497f51ecdeedecdb740dd1ff6236d013afff0417d80b8646ba4c13800000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000003b9b1bb28559454e49518080",
    });
    if (res.sigHex.length !== 130) {
      throw new Error("sigHex length mismatch");
    }
  }
}

class SignTxUniswap extends NomoTest {
  constructor() {
    super({
      name: "Sign Tx: Uniswap",
      description: "Simulate a swapping of ETH into AVINOC-ERC20.",
    });
  }

  async run() {
    const res = await nomo.signEvmTransaction({
      messageHex:
        "0x02f903f40125830f424084d2552da2830a399e943fc91a3afd70395cd496c647d5a6cc9d4b2b7fad87071afd498d0000b903c43593564c000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000066deb9ab00000000000000000000000000000000000000000000000000000000000000040b000604000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000e0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000002800000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000071afd498d00000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000071afd498d0000000000000000000000000000000000000000000000000005a89d57609f0d505800000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002bc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2000bb8f1ca9cb74685755965c7458528a36934df52a3ef0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000060000000000000000000000000f1ca9cb74685755965c7458528a36934df52a3ef000000000000000000000000000000fee13a103a10d593b9ae06b3e05f2e7e1c00000000000000000000000000000000000000000000000000000000000000190000000000000000000000000000000000000000000000000000000000000060000000000000000000000000f1ca9cb74685755965c7458528a36934df52a3ef0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000005a89d57609f0d5058c0",
    });
    if (res.sigHex.length !== 130) {
      throw new Error("sigHex length mismatch");
    }
  }
}

class SignTxRawValue extends NomoTest {
  constructor() {
    super({
      name: "Sign Tx: Raw Value",
      description: "A minimal transaction with a native value.",
    });
  }

  resolveSig(sigHex: string) {
    const r = BigInt("0x" + sigHex.slice(0, 64));
    const s = BigInt("0x" + sigHex.slice(64, 128));
    const v = BigInt("0x" + sigHex.slice(128, 130));
    return { v, r, s };
  }

  async run() {
    const inputHex =
      "0xf382049a8502540be4008252089405870f1507d820212e921e1f39f14660336231d188016345785d8a0000808559454e49518080";

    const expectedR: bigint =
      31985617787800161498695495446856197366320382904444210264230862608320524360576n;
    const expectedS: bigint =
      8257219745238357900642489194207469846836140993477625668205050420177290661755n;
    const expectedV: bigint = 27n;

    const ownAddress = await nomo.getEvmAddress();

    const res = await nomo.signEvmTransaction({ messageHex: inputHex });
    console.log("sigFromNomo", res.sigHex);
    const { v, r, s } = this.resolveSig(res.sigHex);
    if (ownAddress !== "0x05870f1507d820212E921e1f39f14660336231D1") {
      return; // no expected sig
    } else if (r !== expectedR || s !== expectedS || v !== expectedV) {
      throw Error("TEST FAIL: expectedSig != sigFromNomo");
    } else {
      return; // TEST SUCCESS: expectedSig == sigFromNomo";
    }
  }
}

class SignTxUndecodable extends NomoTest {
  constructor() {
    super({
      name: "Sign Tx: Cannot decode",
      description: "Sign a tx that cannot be analyzed by Nomo.",
    });
  }

  async run() {
    const res = await nomo.signEvmTransaction({
      messageHex:
        "0x02f86c0125830f424085010ffe7d9282ea6094f1ca9cb74685755965c7458528a36934df52a3ef80b844deadbeef0000000000000000000000007561deaf4ecf96dc9f0d50b4136046979acdad3effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc0",
    });
    if (res.sigHex.length !== 130) {
      throw new Error("sigHex length mismatch");
    }
  }
}

class MintNFTDemo extends NomoTest {
  constructor() {
    super({
      name: "Demo with ethers.js",
      description:
        "Mint a NomoDev Token on the ZENIQ Smartchain, signed by the Nomo App via ethers.js-V6.",
    });
  }

  async run() {
    await openFaucetIfNeeded();
    await mintNFT();
  }
}

export const signTxTests: Array<NomoTest> = [
  new SignTxCancel(),
  new SignTxERC20Approval(),
  new SignTxZEN20Claiming(),
  new SignTxUniswap(),
  new SignTxRawValue(),
  new SignTxUndecodable(),
  new MintNFTDemo(),
];
