/* eslint-disable @next/next/no-img-element */
"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Dialog, { DialogContent } from "./components/dialog";
import { useNomoState } from "./hooks/custom_hooks";
import { nomo } from "nomo-webon-kit";
import { injectNomoCSSVariables } from "nomo-webon-kit";
import styles from "./page.module.css";
import "./nomo.css";
import { testSigning } from "../../test/web3_signing_test";
import { stringifyWithBigInts } from "nomo-webon-kit";
import { mintNFT } from "./evm/mint_nft";
import { openFaucetIfNeeded } from "./evm/evm_utils";
import { launchAllWebOnsDemo } from "./multi-webons/multi_webon_demo";
import { themeSwitchDemo } from "./theming/theme_switch_demo";
import { faqDemo } from "./faq/faq_demo";
import { sendOnePercentOfBalance } from "./assets/send_demo";
import { ethSigDemo } from "./evm/eth_sig";
export default function Home() {
  const [dialog, setDialog] = useState<DialogContent | null>(null);
  const platformInfo = useNomoState(nomo.getPlatformInfo);
  const evmAddress = useNomoState(nomo.getEvmAddress);
  const executionMode = useNomoState(nomo.getExecutionMode);
  const deviceName = useNomoState(nomo.getDeviceName);
  const [pictureFromCamera, setPictureFromCamera] = useState<string | null>(
    null
  );
  useEffect(() => {
    const minVersion = "0.3.4";
    nomo.hasMinimumNomoVersion({ minVersion }).then(async (res: any) => {
      if (!res.minVersionFulfilled) {
        openDialog({
          title: "Nomo App outdated!",
          content:
            "This WebOn requires at least Nomo " +
            minVersion +
            " but you have Nomo " +
            res.nomoVersion,
        });
      } else {
        const manifest = await nomo.getManifest();
        if (!manifest.webon_url.includes("tar.gz")) {
          const new_deeplink =
            "https://nomo.app/webon/w.nomo.app/app.nomo.demowebon/nomo.tar.gz";
          await nomo.migrateAndSelfDestroy({ new_deeplink });
        }
      }
    });
    nomo.enableMobileConsoleDebugging();
    nomo.localStorage.setItem("foo", "bar");
    nomo.getDeviceHashes().then(console.log).catch(console.error);
    nomo
      .getAssetPrice({
        symbol: "AVINOC",
        contractAddress: "0xF1cA9cb74685755965c7458528A36934Df52A3EF",
        network: "zeniq-smart-chain",
      })
      .then(console.log)
      .catch(console.error);
    injectNomoCSSVariables();
    nomo.registerOnWebOnVisible((_args: { cardMode: boolean }) => {
      nomo.checkForWebOnUpdate();
    });
  }, []);

  const openDialog = (content: DialogContent) => {
    setDialog(content);
  };

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Nomo Demo WebOn - Get started by editing src/app/page.tsx. Scroll down
          to explore features of WebOns!
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
          <b>WebOn mode:</b> {JSON.stringify(executionMode)}
        </div>
        <div style={{ height: "10px" }} />
        <div style={{ width: "100%" }}>
          <b>EVM address:</b> {evmAddress}
        </div>
        <div style={{ height: "10px" }} />
        <div style={{ width: "100%" }}>
          <b>Device name:</b> {JSON.stringify(deviceName)}
        </div>

        <div className={styles.card}>
          <h2
            onClick={async () => {
              nomo.launchUrl({
                url: "https://dev.nomo.app",
                launchMode: "externalApplication",
              });
            }}
          >
            Developer docs<span>-&gt;</span>
          </h2>
          <p>Visit dev.nomo.app to learn more about the Nomo ecosystem.</p>
        </div>
        <div className={styles.card}>
          <h2
            onClick={async () => {
              try {
                const faucetNeeded = await openFaucetIfNeeded();
                if (faucetNeeded) {
                  return;
                }
                const res = await mintNFT();
                const resJson = stringifyWithBigInts(res);
                openDialog({
                  title: "ethersjs-contract submitted to the ZENIQ Smartchain!",
                  content: resJson,
                });
              } catch (e) {
                console.error(e);
                openDialog({
                  title: "ethersjs-contract-demo failed",
                  content:
                    e instanceof Error ? e.toString() : stringifyWithBigInts(e),
                });
              }
            }}
          >
            Demo with ethers.js<span>-&gt;</span>
          </h2>
          <p>
            Mint a NomoDev Token on the ZENIQ Smartchain, signed by the Nomo App
            via ethers.js-V6.
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
          <p>Your picture will be instantly shown below.</p>
        </div>
        {!!pictureFromCamera ? (
          <img
            src={pictureFromCamera}
            alt=""
            style={{ maxWidth: "100%" }}
          ></img>
        ) : (
          <div></div>
        )}

        <div className={styles.card}>
          <h2
            onClick={async () => {
              try {
                await sendOnePercentOfBalance();
              } catch (e) {
                console.error(e);
                openDialog({
                  title: "nomoSendAssets failed",
                  content: JSON.stringify(e),
                });
              }
            }}
          >
            Send assets<span>-&gt;</span>
          </h2>
          <p>
            With consent from the user, WebOns can send assets from the Nomo
            App.
          </p>
        </div>

        <div className={styles.card}>
          <h2
            onClick={async () => {
              try {
                const res = await ethSigDemo();
                openDialog({
                  title: "ETH Message was signed!",
                  content: JSON.stringify(res),
                });
              } catch (e) {
                console.error(e);
                openDialog({
                  title: "ethSigDemo failed",
                  content: JSON.stringify(e),
                });
              }
            }}
          >
            Sign ETH message<span>-&gt;</span>
          </h2>
          <p>
            WebOns can sign messages to prove that the user controls a specific
            wallet.
          </p>
        </div>
        <div className={styles.card}>
          <h2
            onClick={() => {
              nomo
                .qrScan()
                .then((res) => {
                  openDialog({
                    title: "QrScan successful!",
                    content: JSON.stringify(res),
                  });
                })
                .catch((e) => {
                  console.error(e);
                  openDialog({
                    title: "QrScan failed",
                    content: JSON.stringify(e),
                  });
                });
            }}
          >
            QRScan<span>-&gt;</span>
          </h2>
          <p>Scan a QRCode with rapid speed</p>
        </div>
        <div className={styles.card}>
          <h2
            onClick={async () => {
              await themeSwitchDemo();
            }}
          >
            Switch theme<span>-&gt;</span>
          </h2>
          <p>WebOns can switch between different Nomo themes</p>
        </div>
        <div className={styles.card}>
          <h2
            onClick={async () => {
              try {
                await launchAllWebOnsDemo();
              } catch (e) {
                console.error(e);
                openDialog({
                  title: "launchAllWebOnsDemo failed",
                  content:
                    e instanceof Error ? e.toString() : stringifyWithBigInts(e),
                });
              }
            }}
          >
            Launch other WebOns<span>-&gt;</span>
          </h2>
          <p>WebOns can be combined to enable more powerful use cases.</p>
        </div>
        <div className={styles.card}>
          <h2
            onClick={() => {
              testSigning()
                .then((res) => {
                  openDialog({
                    title: "Signature Result",
                    content: JSON.stringify(res),
                  });
                })
                .catch((e) => {
                  console.error(e);
                  openDialog({
                    title: "sign transaction failed",
                    content: e.toString(),
                  });
                });
            }}
          >
            EVM transaction signing <span>-&gt;</span>
          </h2>
          <p>A demo for the sign-security-dialog.</p>
        </div>
        <div
          onClick={() => {
            nomo.launchUrl({
              url: "mailto:support@nomo.app",
              launchMode: "platformDefault",
            });
          }}
        >
          Contact support
        </div>
        <div
          onClick={async () => {
            await faqDemo();
          }}
        >
          Open FAQs
        </div>
      </div>
    </main>
  );
}
