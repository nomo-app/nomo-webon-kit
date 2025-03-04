import { nomo } from "nomo-webon-kit";
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

const discoverWebOnsDeeplink = "https://nomo.app/webon/discover.webon.info";

class DuplicateWebOnTest extends NomoTest {
  constructor() {
    super({
      name: "Duplicate WebOn Opening",
      description: "Navigate twice to the Discover-WebOn.",
    });
  }

  async run() {
    alert(
      "If this test works, then the Discover-WebOn will open twice!"
    );

    await nomo.installWebOn({ deeplink: discoverWebOnsDeeplink });
    await nomo.installWebOn({ deeplink: discoverWebOnsDeeplink });
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

    window.location.href = discoverWebOnsDeeplink;
  }
}

class MessengerDeeplinkTest extends NomoTest {
  constructor() {
    super({
      name: "Messenger Deeplink",
      description: "Opening a chat with nomo.injectQRCode().",
    });
  }

  async run() {
    alert("If this test works, then the Decentralized Messenger will open!");

    const messengerDeeplink = "https://nomo.id/@0xcb70cc866077dd5f4c9c98eafb44e10d7eb6c58d";
    await nomo.injectQRCode({
      qrCode: messengerDeeplink,
      navigateBack: false,
    });
  }
}

export const deeplinkTests: Array<NomoTest> = [
  new DuplicateWebOnTest(),
  new NomoIdDeeplinkTest(),
  new WebOnDeeplinkTest(),
  new MessengerDeeplinkTest(),
];
