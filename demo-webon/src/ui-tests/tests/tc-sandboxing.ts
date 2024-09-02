import { sleep } from "nomo-webon-kit";
import { NomoUITest } from "../test-kit/nomo-ui-test";
// TODO: navigation to other WebOn (with deeplink)
// TODO: window.location, <a href> tag, form navigation
// TODO: nomo.injectQRCode({ qrCode: "https://nomo.id/stuff" });

class NavigateToGitHub extends NomoUITest {
  constructor() {
    super({
      name: "Sandbox Test 1: Navigate to GitHub",
      description: "Open GitHub in a new window and then close it.",
    });
  }

  async run() {
    window.location.href = "https://github.com/nomo-app";
    await sleep(1000); // test is successful if the user is able to navigate back to the test page
  }
}

export const sandBoxingTests = {
  navigateToGitHub: new NavigateToGitHub(),
};
