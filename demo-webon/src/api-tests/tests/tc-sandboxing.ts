import { sleep } from "nomo-webon-kit";
import { NomoTest } from "../test-kit/nomo-test";
import { load } from "recaptcha-v3";

class NavigateToGitHub extends NomoTest {
  constructor() {
    super({
      name: "Sandbox 1: Navigate to GitHub",
      description:
        "Open GitHub in a new window and then close it. Also check if nomo.onWebOnVisible() is called.",
    });
  }

  async run() {
    alert("If this test works, then GitHub will be shown within a new window!");

    const promise = new Promise<void>((resolve, reject) => {
      document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "visible") {
          resolve();
        }
      });
      setTimeout(() => {
        reject(
          new Error(
            "Timeout: You did not come back from GitHub within 10 seconds!"
          )
        );
      }, 10000);
    });

    // do the navigation to open a new window outside the sandbox
    window.location.href = "https://github.com/nomo-app";

    return promise;
  }
}

class RecaptchaV3 extends NomoTest {
  constructor() {
    super({
      name: "Sandbox 2: Google Recaptcha V3",
      description:
        "Do a captcha verfication and hopefully stay within the sandbox.",
    });
  }

  async run() {
    const recaptcha_public_key = "6LeMtp4cAAAAAJ-wc7qqFHmfPgqzYA0SNQi_Nz4o";
    const recaptcha = await load(recaptcha_public_key, { autoHideBadge: true });
    const token = await recaptcha.execute();
    console.log("Recaptcha token:", token);
    await sleep(1000); // test is successful if we stay within the sandbox
  }
}

class IFrameTest extends NomoTest {
  constructor() {
    super({
      name: "Sandbox 3: IFrame injection",
      description: "Launch an iframe and hopefully stay within the sandbox.",
    });
  }

  injectGoogleIFrame() {
    const iframe = document.createElement("iframe");
    iframe.src = "https://www.google.com";
    document.body.appendChild(iframe);
  }

  async run() {
    this.injectGoogleIFrame();
    await sleep(1000); // test is successful if we stay within the sandbox
  }
}

export const sandBoxingTests: Array<NomoTest> = [
  new NavigateToGitHub(),
  new RecaptchaV3(),
  new IFrameTest(),
];
