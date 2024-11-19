import { nomo } from "nomo-webon-kit";
import { NomoTest } from "../test-kit/nomo-test";

class GetClipboardTest extends NomoTest {
  constructor() {
    super({
      name: "nomo.getClipboard",
      description: "Check if clipboard text can be read successfully.",
    });
  }

  async run() {
    const res = await nomo.getClipboard();
    if (res.clipboard === null) {
      throw new Error("Clipboard is empty or permission denied.");
    }
    if (typeof res.clipboard !== "string") {
      throw new Error("Clipboard content is not a string.");
    }
  }
}

class SetClipboardTest extends NomoTest {
  constructor() {
    super({
      name: "nomo.setClipboard",
      description: "Check if text can be written to the clipboard.",
    });
  }

  async run() {
    const testText = "Test Clipboard Content";

    // Attempt to set clipboard content
    await nomo.setClipboard({ text: testText });

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
      description: "Ensure nomo.setClipboard throws an error for invalid input.",
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
      throw new Error("nomo.setClipboard did not throw an error for invalid input.");
    }
  }
}

export const clipboardTests: Array<NomoTest> = [
  new GetClipboardTest(),
  new SetClipboardTest(),
  new SetClipboardInvalidInputTest(),
];
