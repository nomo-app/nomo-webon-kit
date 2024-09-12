import { nomo } from "nomo-webon-kit";
import { NomoUITest } from "../test-kit/nomo-ui-test";
import { ethers } from "ethers";

class NomoSignAuthMessage extends NomoUITest {
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

class NomoAuthHttpPost extends NomoUITest {
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

class NomoAuthHttpPostNested extends NomoUITest {
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

class NomoAuthFetchPost extends NomoUITest {
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
    });
    if (typeof res.statusCode !== "number") {
      throw new Error("statusCode is not a number.");
    }
  }
}

export const nomoAuthTests: Array<NomoUITest> = [
  new NomoSignAuthMessage(),
  new NomoAuthHttpPost(),
  new NomoAuthFetchPost(),
  new NomoAuthHttpPostNested(),
];
