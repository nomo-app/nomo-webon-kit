/* eslint-disable @next/next/no-img-element */
"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Dialog, { DialogContent } from "./components/dialog";
import { useNomoState } from "./hooks/custom_hooks";
import { nomo } from "nomo-plugin-kit/dist/nomo_api";
import {
  getCurrentNomoTheme,
  injectNomoCSSVariables,
} from "nomo-plugin-kit/dist/nomo_theming";
import styles from "./page.module.css";
import "./nomo.css";
import { sendDemoTransaction } from "ethersjs-nomo-plugins/dist/ethersjs_provider";

export default function Home() {
  const [dialog, setDialog] = useState<DialogContent | null>(null);
  const platformInfo = useNomoState(nomo.getPlatformInfo);
  const walletAddresses = useNomoState(nomo.getWalletAddresses);
  const messengerAddress = useNomoState(nomo.getMessengerAddress);
  const deviceName = useNomoState(nomo.getDeviceName);
  const theme = useNomoState(getCurrentNomoTheme);
  const [pictureFromCamera, setPictureFromCamera] = useState<string | null>(
    null
  );
  const [pictureFromGallery, setPictureFromGallery] = useState<string | null>(
    null
  );
  useEffect(() => {
    nomo.enableMobileConsoleDebugging();
    console.log("test console log");
    console.warn("test console warning");
    console.info("test console info");
    console.log(
      "test console with multiple args",
      1,
      { object: 3 },
      { nesting: { key: "some value" } },
      false
    );
    nomo.localStorage.setItem("foo", "bar");
    nomo.localStorage.getItem("foo").then((value) => {
      console.log("Got value from nomoLocalStorage: " + value);
    });
    nomo.getDeviceHashes().then(console.log).catch(console.error);
    injectNomoCSSVariables();
  }, []);

  const openDialog = (content: DialogContent) => {
    console.log("openDialog", content); // console logs should appear in nomoNativeLog as well
    setDialog(content);
  };

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          NOMO Demo Plugin - Get started by editing src/app/page.tsx. Scroll
          down to explore features of NOMO-plugins!
        </p>
      </div>

      <div className={styles.flex}>
        <Dialog content={dialog} handleClose={() => setDialog(null)} />
        <div style={{ height: "10px" }} />
        <Image
          className={styles.logo}
          src="/nomo-logo-square.jpg"
          alt="NOMO Logo"
          width={180}
          height={37}
          priority
        />
        <div style={{ height: "10px" }} />
        <div style={{ width: "100%" }}>
          <b>Platform info:</b> {JSON.stringify(platformInfo)}
        </div>
        <div style={{ height: "10px" }} />
        <div style={{ width: "100%" }}>
          <b>Wallet addresses:</b> {JSON.stringify(walletAddresses)}
        </div>
        <div style={{ height: "10px" }} />
        <div style={{ width: "100%" }}>
          <b>Chat messenger address:</b>{" "}
          {JSON.stringify(messengerAddress).substring(0, 70)}..
        </div>
        <div style={{ height: "10px" }} />
        <div style={{ width: "100%" }}>
          <b>NOMO theme:</b> {JSON.stringify(theme).substring(0, 70)}..
        </div>
        <div style={{ height: "10px" }} />
        <div style={{ width: "100%" }}>
          <b>Device name:</b> {JSON.stringify(deviceName)}
        </div>

        <div className={styles.card}>
          <h2
            onClick={() => {
              sendDemoTransaction()
                .then((res) => {
                  openDialog({
                    title: "Transaction submitted to the ZENIQ Smartchain!",
                    content: JSON.stringify(res),
                  });
                })
                .catch((e) => {
                  console.error(e);
                  openDialog({
                    title: "sendDemoTransaction failed",
                    content:
                      e instanceof Error ? e.toString() : JSON.stringify(e),
                  });
                });
            }}
          >
            Sign EVM transaction <span>-&gt;</span>
          </h2>
          <p>
            Send a transaction to the ZENIQ Smartchain, signed by the Nomo app.
          </p>
        </div>

        <div className={styles.card}>
          <h2
            onClick={() => {
              nomo
                .takePicture({
                  maxWidth: 800,
                  maxHeight: 800,
                })
                .then((res) => {
                  setPictureFromCamera(res.imageBase64);
                })
                .catch((e) => {
                  console.error(e);
                  openDialog({
                    title: "nomoTakePicture failed",
                    content: JSON.stringify(e),
                  });
                });
            }}
          >
            Take picture <span>-&gt;</span>
          </h2>
          <p>Use the NOMO-app for getting a picture into the plugin.</p>
        </div>
        {!!pictureFromCamera ? (
          <img
            src={pictureFromCamera}
            alt=""
            style={{ maxWidth: "100%" }}
          ></img>
        ) : (
          <div>Your camera image will be shown here</div>
        )}

        <div className={styles.card}>
          <h2
            onClick={() => {
              nomo
                .pickFromGallery({
                  maxWidth: 1000,
                  maxHeight: 1000,
                })
                .then((res) => {
                  setPictureFromGallery(res.imageBase64);
                })
                .catch((e) => {
                  console.error(e);
                  openDialog({
                    title: "nomoPickFromGallery failed",
                    content: JSON.stringify(e),
                  });
                });
            }}
          >
            Open gallery<span>-&gt;</span>
          </h2>
          <p>Upload documents or images from a NOMO-plugin.</p>
        </div>
        {!!pictureFromGallery ? (
          <img
            src={pictureFromGallery}
            alt=""
            style={{ maxWidth: "100%" }}
          ></img>
        ) : (
          <div>Your gallery image will be shown here</div>
        )}

        <div className={styles.card}>
          <h2
            onClick={() => {
              const chatInvitationLink =
                "https://nomo.id/@0x6b65b7eadc7544dcf04869136466ba6224e799a2:zeniq.chat";
              nomo
                .injectQRCode({
                  qrCode: chatInvitationLink,
                  navigateBack: true,
                })
                .catch((e) => {
                  console.error(e);
                  openDialog({
                    title: "Opening a chat failed",
                    content: JSON.stringify(e),
                  });
                });
            }}
          >
            Open a chat <span>-&gt;</span>
          </h2>
          <p>
            Open a chat with a human or with a chat-bot, powered by the
            zeniq.chat service.
          </p>
        </div>

        <div className={styles.card}>
          <h2
            onClick={() => {
              openDialog({
                title: "Feature not yet available",
                content:
                  "Future updates of the NOMO-app will bring AI capabilities.",
              });
            }}
          >
            Speech to text<span>-&gt;</span>
          </h2>
          <p>Say something to the NOMO-app and get the text into the plugin.</p>
        </div>

        <div className={styles.card}>
          <h2
            onClick={() => {
              nomo
                .authHttp({
                  // url: "http://localhost:3001/get_test",
                  url: "https://price.zeniq.services/v2/currentprice/avinoc/usd",
                })
                .then((res) => {
                  openDialog({
                    title: "NOMO-Auth",
                    content:
                      "Used nomoAuthHttp for fetching an AVINOC-price: " +
                      res.response,
                  });
                })
                .catch((e) => {
                  console.error(e);
                  openDialog({
                    title: "nomoAuthHttp failed",
                    content: JSON.stringify(e),
                  });
                });
            }}
          >
            NOMO-Auth<span>-&gt;</span>
          </h2>
          <p>
            NOMO-Auth is a protocol for seamless authentication of plugins,
            utilizing the NOMO-wallet.
          </p>
        </div>

        <div className={styles.card}>
          <h2
            onClick={() => {
              openDialog({
                title: "NOMO-ID",
                content:
                  "For NOMO-ID, a plugin can inject QRCodes without actually scanning QRCodes. See GitHub for more information about the NOMO-ID protocol.",
              });
            }}
          >
            NOMO-ID<span>-&gt;</span>
          </h2>
          <p>
            Log in instantly with NOMO-ID. With NOMO-plugins, there is no need
            to scan a QRCode.
          </p>
        </div>

        <div className={styles.card}>
          <h2
            onClick={() => {
              nomo
                .sendAssets({
                  assetSymbol: "ZENIQ Token",
                  targetAddress: "0x7561DEAf4ECf96dc9F0d50B4136046979ACdAD3e",
                  amount: "100000000000000000", // must be in the smallest unit (e.g. wei or satoshi)
                })
                .catch((e) => {
                  console.error(e);
                  openDialog({
                    title: "nomoSendAssets failed",
                    content: JSON.stringify(e),
                  });
                });
            }}
          >
            Send assets<span>-&gt;</span>
          </h2>
          <p>
            With consent from the user, plugins can send assets from the
            NOMO-wallet.
          </p>
        </div>

        <div className={styles.card}>
          <h2
            onClick={() => {
              nomo
                .signEvmMessage({
                  message: "this message comes from my wallet",
                })
                .then((res) => {
                  openDialog({
                    title: "Message was signed!",
                    content: JSON.stringify(res),
                  });
                })
                .catch((e) => {
                  console.error(e);
                  openDialog({
                    title: "signEvmMessage failed",
                    content: JSON.stringify(e),
                  });
                });
            }}
          >
            Sign EVM message<span>-&gt;</span>
          </h2>
          <p>
            With consent from the user, plugins can sign messages to prove that
            the user controls a specific wallet.
          </p>
        </div>
      </div>
    </main>
  );
}
