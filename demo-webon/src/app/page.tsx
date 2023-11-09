/* eslint-disable @next/next/no-img-element */
"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Dialog, { DialogContent } from "./components/dialog";
import { useNomoState } from "./hooks/custom_hooks";
import { nomo } from "nomo-webon-kit";
import { getCurrentNomoTheme, injectNomoCSSVariables } from "nomo-webon-kit";
import styles from "./page.module.css";
import "./nomo.css";
import { sendDemoTransaction as sendDemoTxEthers } from "ethersjs-nomo-webons";
// import { sendDemoTransaction as sendDemoTxWeb3Js } from "web3js-nomo-webons";
import { testSigning } from "../../test/web3_signing_test";
import { NomoTheme, switchNomoTheme } from "nomo-webon-kit/dist/nomo_theming";
import { stringifyWithBigInts } from "nomo-webon-kit/dist/nomo_api";
import { mintNFT } from "./evm/mint_nft";
import { openFaucetIfNeeded } from "./evm/evm_utils";
export default function Home() {
  const [dialog, setDialog] = useState<DialogContent | null>(null);
  const platformInfo = useNomoState(nomo.getPlatformInfo);
  const evmAddress = useNomoState(nomo.getEvmAddress);
  const executionMode = useNomoState(nomo.getExecutionMode);
  const deviceName = useNomoState(nomo.getDeviceName);
  const [pictureFromCamera, setPictureFromCamera] = useState<string | null>(
    null
  );
  const [pictureFromGallery, setPictureFromGallery] = useState<string | null>(
    null
  );
  useEffect(() => {
    const minVersion = "0.3.3";
    nomo.hasMinimumNomoVersion({ minVersion }).then((res: any) => {
      console.log("hasMinimumNomoVersion", res);
      if (!res.minVersionFulfilled) {
        openDialog({
          title: "Nomo App outdated!",
          content:
            "This WebOn requires at least Nomo " +
            minVersion +
            " but you have Nomo " +
            res.nomoVersion,
        });
      }
    });
    nomo.enableMobileConsoleDebugging();
    nomo.localStorage.setItem("foo", "bar");
    nomo.getDeviceHashes().then(console.log).catch(console.error);
    injectNomoCSSVariables();
    nomo.registerOnWebOnVisible((args: { cardMode: boolean }) => {
      console.log("onWebOnVisible called", args);
    });
    nomo.getManifest().then(console.log).catch(console.error);
  }, []);

  const openDialog = (content: DialogContent) => {
    console.log("openDialog", content); // console logs should appear in nomoNativeLog as well
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
                const res = await sendDemoTxEthers();
                const resJson = stringifyWithBigInts(res);
                openDialog({
                  title: "ethersjs-TX submitted to the ZENIQ Smartchain!",
                  content: resJson,
                });
              } catch (e) {
                console.error(e);
                openDialog({
                  title: "ethersjs-demo failed",
                  content:
                    e instanceof Error ? e.toString() : stringifyWithBigInts(e),
                });
              }
            }}
          >
            Sign EVM transaction<span>-&gt;</span>
          </h2>
          <p>
            Send a transaction to the ZENIQ Smartchain, signed by the Nomo app
            with ethersjs-nomo-webons.
          </p>
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
            Mint NomoDev Token<span>-&gt;</span>
          </h2>
          <p>
            Mint NomoDev Token on the ZENIQ Smartchain, signed by the Nomo app
            with ethersjs-nomo-webons.
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
          <p>Use the NOMO-app for getting a picture into the WebOn.</p>
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
          <p>Upload documents or images from a Nomo WebOn.</p>
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
          <p>Open a decentralized chat with a human or with a chat-bot.</p>
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
            NOMO-Auth is a protocol for seamless authentication of WebOns,
            utilizing the NOMO-wallet.
          </p>
        </div>

        <div className={styles.card}>
          <h2
            onClick={async () => {
              try {
                const res = await nomo.selectAssetFromDialog();
                const asset = res.selectedAsset;
                const balance = BigInt(asset.balance);
                const amount = balance / 100n;
                await nomo.sendAssets({
                  assetSymbol: asset.symbol,
                  targetAddress: "0x7561DEAf4ECf96dc9F0d50B4136046979ACdAD3e",
                  amount: amount.toString(), // must be in the smallest unit (e.g. wei or satoshi)
                });
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
            With consent from the user, WebOns can send assets from the
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
            With consent from the user, WebOns can sign messages to prove that
            the user controls a specific wallet.
          </p>
        </div>
        <div className={styles.card}>
          <h2
            onClick={() => {
              nomo
                .addCustomToken({
                  contractAddress: "0x83B58BC6CB9653117c206DDAFA3018b9344F8070",
                  network: "zeniqSmartChain",
                })
                .catch(console.error);
            }}
          >
            Add custom token<span>-&gt;</span>
          </h2>
          <p>WebOns can expand the list of tokens</p>
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
              const oldTheme: NomoTheme = (await getCurrentNomoTheme())
                .name as NomoTheme;
              const newTheme: NomoTheme =
                oldTheme === "LIGHT"
                  ? "DARK"
                  : oldTheme == "DARK"
                  ? "TUPAN"
                  : oldTheme == "TUPAN"
                  ? "AVINOC"
                  : "LIGHT";
              await switchNomoTheme({ theme: newTheme });
              await injectNomoCSSVariables(); // refresh css variables after switching theme
            }}
          >
            Switch theme<span>-&gt;</span>
          </h2>
          <p>WebOns can switch between different Nomo themes</p>
        </div>
        <div className={styles.card}>
          <h2
            onClick={async () => {
              nomo
                .installWebOn({
                  deeplink: "https://nomo.app/webon/demowebon.nomo.app",
                  skipPermissionDialog: true,
                  navigateBack: true,
                })
                .catch((e) => {
                  console.error(e);
                  openDialog({
                    title: "failed to install WebOn",
                    content: JSON.stringify(e),
                  });
                });
            }}
          >
            Install WebOn<span>-&gt;</span>
          </h2>
          <p>WebOns can install other WebOns</p>
        </div>
        <div className={styles.card}>
          <h2
            onClick={() => {
              testSigning()
                .then((res) => {
                  openDialog({
                    title: "Unittest Result",
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
            Unittest transaction signing <span>-&gt;</span>
          </h2>
          <p>Unittest for signing a transaction with the Nomo app.</p>
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
          onClick={() => {
            nomo.openFAQPage({
              initiallyExpanded: true,
              supportButtonTitle: "Contact Support",
              supportButtonUrl: "mailto:support@nomo.app",
              faqContent: {
                "Section 1": {
                  "Entry 1.a": "Content 1.a",
                  "Entry 1.b": "Content 1.b",
                },
                "Section 2": {
                  "Entry 2.a": "Content 2.a",
                  "Entry 2.b": "Content 2.b",
                  "Entry 2.c": "Content 2.c",
                },
              },
            });
          }}
        >
          Open FAQs
        </div>
      </div>
    </main>
  );
}
