import { nomo } from "nomo-webon-kit";
import { NomoTest } from "../test-kit/nomo-test";
import { launchOtherWebOnsDemo } from "../../app/multi-webons/multi_webon_demo";
import { themeSwitchDemo } from "../../app/theming/theme_switch_demo";
import { faqDemo } from "../../app/faq/faq_demo";

class EvmChecksumTest extends NomoTest {
  constructor() {
    super({
      name: "EVM-address",
      description: "Check if your EVM-address has a mixed-case checksum.",
    });
  }

  async run() {
    const evmAddress = await nomo.getEvmAddress();
    if (!evmAddress.startsWith("0x")) {
      throw new Error("EVM-address should start with 0x");
    }
    if (evmAddress.toLowerCase() === evmAddress) {
      throw new Error("EVM-address should have mixed-case checksum");
    }
    if (evmAddress.length !== 42) {
      throw new Error("EVM-address should have 42 characters");
    }
    if (evmAddress.toUpperCase() === evmAddress) {
      throw new Error("EVM-address should not be all uppercase");
    }
  }
}

class GetPriceTest extends NomoTest {
  constructor() {
    super({
      name: "nomo.getAssetPrice()",
      description: "Check if prices are available.",
    });
  }

  async run() {
    const res = await nomo.getAssetPrice({
      symbol: "AVINOC",
      contractAddress: "0xF1cA9cb74685755965c7458528A36934Df52A3EF",
      network: "zeniq-smart-chain",
      uuid: "fbe0420d-983c-35f7-8209-e5ac1942c281",
    });
    if (!res.price) {
      throw new Error("AVINOC price is " + res.price);
    }
    if (!res.currencySymbol) {
      throw new Error("missing currencySymbol");
    }
    if (!res.currencyDisplayName) {
      throw new Error("missing currencyDisplayName");
    }
  }
}

class NomoCloseTest extends NomoTest {
  constructor() {
    super({
      name: "nomo.close()",
      description: "Closes the current WebOn and then launches a deeplink.",
    });
  }

  async run() {
    const manifest = await nomo.getManifest();
    const url = manifest.webon_url;
    const deeplink = url
      .replace("https://", "https://nomo.app/webon/")
      .replace("http://", "http://nomo.app/webon/");
    await nomo.close({ deeplink, launchMode: null }); // re-open the current WebOn after closing it
  }
}

class NomoShareTest extends NomoTest {
  constructor() {
    super({
      name: "nomo.share()",
      description: "Should open a native share dialog.",
    });
  }

  async run() {
    await nomo.share({ text: "some text to share" });
  }
}

class LaunchOtherWebOnsTest extends NomoTest {
  constructor() {
    super({
      name: "Launch other WebOns",
      description: "WebOns can be combined to enable more powerful use cases.",
    });
  }

  async run() {
    await launchOtherWebOnsDemo();
  }
}

class QrScanTest extends NomoTest {
  constructor() {
    super({
      name: "QR Scan",
      description: "Scan a QRCode with rapid speed",
    });
  }

  async run() {
    await nomo.qrScan();
  }
}

class QrInjectionTest extends NomoTest {
  constructor() {
    super({
      name: "QR Injection",
      description: "Inject QRCodes to use features like the Nomo-ID protocol",
    });
  }

  async run() {
    const nomoIdTestQRCode =
      "https://nomo.id/qrtest.zeniq.dev/backend/qrExecuteDefault?n=732341402ea1b483c523f83a2c79fee7&r=/backend/qrScanDefault";
    nomo.injectQRCode({
      qrCode: nomoIdTestQRCode,
      navigateBack: false,
    });
  }
}

class SwitchThemeTest extends NomoTest {
  constructor() {
    super({
      name: "Switch theme",
      description: "WebOns can switch between different Nomo themes.",
    });
  }

  async run() {
    await themeSwitchDemo();
  }
}

class FAQDemo extends NomoTest {
  constructor() {
    super({
      name: "FAQ Demo",
      description: "Open frequently asked questions.",
    });
  }

  async run() {
    await faqDemo();
  }
}

export const nomoCoreTests: Array<NomoTest> = [
  new EvmChecksumTest(),
  new GetPriceTest(),
];

export const nomoCoreManualTests: Array<NomoTest> = [
  new NomoCloseTest(),
  new NomoShareTest(),
  new LaunchOtherWebOnsTest(),
  new QrScanTest(),
  new QrInjectionTest(),
  new FAQDemo(),
  new SwitchThemeTest(),
];
