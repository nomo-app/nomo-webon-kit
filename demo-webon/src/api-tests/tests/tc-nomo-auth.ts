import { nomo } from "nomo-webon-kit";
import { NomoTest } from "../test-kit/nomo-test";
import { ethers } from "ethers";
import { ethSigDemo } from "../../app/evm/eth_sig";

class NomoSignAuthMessage extends NomoTest {
  constructor() {
    super({
      name: "Nomo Auth 1: signAuthMessage",
      description: "Create signatures for the Nomo-Auth protocol.",
    });
  }

  async run() {
    const messageToSign = "Hello, Nomo!";
    const url = "https://nomo.app";
    const res = await nomo.signAuthMessage({
      message: messageToSign,
      url,
    });
    if (res.authAddress.length !== 34) {
      throw new Error("authAddress length mismatch: " + res.authAddress.length);
    }
    if (res.authSig.length !== 88) {
      throw new Error("authSig length mismatch: " + res.authSig.length);
    }

    const ethSignerAddress = await nomo.getEvmAddress();
    const usedSignerAddress = ethers.verifyMessage(messageToSign, res.ethSig);
    const ethSigValid =
      usedSignerAddress.toLowerCase() === ethSignerAddress.toLowerCase();
    if (!ethSigValid) {
      throw new Error("ethSig is invalid.");
    }
  }
}

class NomoAuthHttpPost extends NomoTest {
  constructor() {
    super({
      name: "Nomo Auth 2: POST-request",
      description: "Send a JSON-body in a POST-request.",
    });
  }

  async run() {
    const res = await nomo.authHttp({
      url: "https://price.zeniq.services/v2/currentprice/ZENIQ/USD",
      method: "POST",
      body: JSON.stringify({ foo: "bar" }),
    });
    if (typeof res.statusCode !== "number") {
      throw new Error("statusCode is not a number.");
    }
  }
}

class NomoAuthHttpPostNested extends NomoTest {
  constructor() {
    super({
      name: "Nomo Auth 3: nested request",
      description: "Send a non-JSON-body in a POST-request.",
    });
  }

  async run() {
    const res = await nomo.authHttp({
      url: "https://price.zeniq.services/v2/currentprice/ZENIQ/USD",
      method: "POST",
      body: { foo: { bar: { x: 1, y: "2" } } },
    });
    if (typeof res.statusCode !== "number") {
      throw new Error("statusCode is not a number.");
    }
  }
}

class NomoAuthFetchPost extends NomoTest {
  constructor() {
    super({
      name: "Nomo Auth 4: POST-request via fetch",
      description: "Authenticate via the fetch-API of the browser.",
    });
  }

  async run() {
    const res = await nomo.authFetch({
      url: "https://price.zeniq.services/v2/currentprice/ZENIQ/USD",
      method: "POST",
      body: JSON.stringify({ foo: "bar" }),
      instantAuth: true,
    });
    if (typeof res.statusCode !== "number") {
      throw new Error("statusCode is not a number.");
    }
  }
}

class EthSigDemo extends NomoTest {
  constructor() {
    super({
      name: "Sign ETH message",
      description:
        "WebOns can sign messages to prove that the user controls a specific wallet.",
    });
  }

  async run() {
    // this test is part of linked documentation
    await ethSigDemo();
  }
}

export const nomoAuthTests: Array<NomoTest> = [
  new NomoSignAuthMessage(),
  new NomoAuthHttpPost(),
  new NomoAuthHttpPostNested(),
  new NomoAuthFetchPost(),
  new EthSigDemo(),
];
