import { nomo, sleep } from "nomo-webon-kit";
import { NomoTest } from "../test-kit/nomo-test";

class SetGetClipboardTest extends NomoTest {
  constructor() {
    super({
      name: "Clipboard API",
      description: "Check if nomo.setClipboard/nomo.getClipboard are working.",
    });
  }

  async run() {
    const testText = "Test Clipboard Content";
    await nomo.setClipboard({ text: testText });

    await sleep(1000);

    // Verify that the clipboard content matches
    const res = await nomo.getClipboard();
    if (res.clipboard !== testText) {
      throw new Error(
        `Clipboard content mismatch. Expected: "${testText}", but got: "${res.clipboard}"`
      );
    }
  }
}

class SetClipboardInvalidInputTest extends NomoTest {
  constructor() {
    super({
      name: "nomo.setClipboard InvalidInput",
      description:
        "Ensure nomo.setClipboard throws an error for invalid input.",
    });
  }

  async run() {
    let errorOccurred = false;

    try {
      // Pass invalid input (undefined or non-string value)
      // @ts-ignore: Testing invalid input intentionally
      await nomo.setClipboard({ text: undefined });
    } catch (err) {
      errorOccurred = true;
    }

    if (!errorOccurred) {
      throw new Error(
        "nomo.setClipboard did not throw an error for invalid input."
      );
    }
  }
}

export const clipboardTests: Array<NomoTest> = [
  new SetGetClipboardTest(),
  new SetClipboardInvalidInputTest(),
];
