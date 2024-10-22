import { NomoTest } from "../test-kit/nomo-test";

class NomoIdDeeplinkTest extends NomoTest {
  constructor() {
    super({
      name: "Nomo-ID Deeplink",
      description: "Regular navigation instead of nomo.injectQRCode().",
    });
  }

  async run() {
    alert(
      "If this test works, then a Nomo-ID-page will open, but it must *NOT* open an external browser!"
    );

    const nomoIdDeeplink =
      "https://nomo.id/qrtest.zeniq.dev/backend/qrExecuteDefault?n=38b7050f85a06317a2cc21611240fedd&r=/backend/qrScanDefault";
    window.location.href = nomoIdDeeplink;
  }
}

class WebOnDeeplinkTest extends NomoTest {
  constructor() {
    super({
      name: "WebOn Deeplink",
      description: "Regular navigation instead of nomo.installWebOn().",
    });
  }

  async run() {
    alert(
      "If this test works, then the Discover-WebOn will open, but it must *NOT* open an external browser!"
    );

    const discoverWebOnsDeeplink = "https://nomo.app/webon/discover.webon.info";
    window.location.href = discoverWebOnsDeeplink;
  }
}

export const deeplinkTests: Array<NomoTest> = [
  new NomoIdDeeplinkTest(),
  new WebOnDeeplinkTest(),
];
