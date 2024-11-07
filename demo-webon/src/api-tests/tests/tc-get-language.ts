import { nomo } from "nomo-webon-kit";
import { NomoTest } from "../test-kit/nomo-test";

class GetLanguageTest extends NomoTest {
  constructor() {
    super({
      name: "nomo.getLanguage",
      description: "Check the Nomo App language as well as the system language.",
    });
  }

  async run() {
    const res = await nomo.getLanguage();
    if (!res.language) {
      throw new Error("No language returned.");
    }
    if (!res.systemLanguage) {
      throw new Error("No systemLanguage returned.");
    }
  }
}

export const getLanguageTests: Array<NomoTest> = [
  new GetLanguageTest(),
];
