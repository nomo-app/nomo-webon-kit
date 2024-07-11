import { useEffect, useState } from "react";
import Dialog, { DialogContent } from "./components/dialog";
import { useNomoState } from "./hooks/custom_hooks";
import { NomoManifest, nomo } from "nomo-webon-kit";
import { injectNomoCSSVariables } from "nomo-webon-kit";
import styles from "./page.module.css";
import "./globals.css";
import { proofOfPaymentDemo, testSigning } from "../../test/web3_signing_test";
import { stringifyWithBigInts } from "nomo-webon-kit";
import { mintNFT } from "./evm/mint_nft";
import { openFaucetIfNeeded } from "./evm/evm_utils";
import { launchAllWebOnsDemo } from "./multi-webons/multi_webon_demo";
import { themeSwitchDemo } from "./theming/theme_switch_demo";
import { faqDemo } from "./faq/faq_demo";
import { ethSigDemo } from "./evm/eth_sig";
import { nomoFallbackQRCode } from "nomo-webon-kit";
import { AsyncButton } from "./components/async_button";
import { nomoFetchERC721, zscProvider } from "ethersjs-nomo-webons";
export default function Home() {
  const [dialog, setDialog] = useState<DialogContent | null>(null);
  const platformInfo = useNomoState(nomo.getPlatformInfo);
  const evmAddress = useNomoState(nomo.getEvmAddress);
  const executionMode = useNomoState(nomo.getExecutionMode);
  const deviceName = useNomoState(nomo.getDeviceName);
  const manifest: NomoManifest | null = useNomoState(nomo.getManifest);
  const [pictureFromCamera, setPictureFromCamera] = useState<string | null>(
    null
  );
  useEffect(() => {
    nomoFallbackQRCode();
    const minVersion = "0.3.6";
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
            "https://nomo.app/webon/w.nomo.app/demowebon/nomo.tar.gz";
          await nomo.migrateAndSelfDestroy({ new_deeplink });
        }
      }
    });
    nomo.enableMobileConsoleDebugging();
    nomo.localStorage.setItem("foo", "bar");
    nomo
      .getDeviceHashes()
      .then((r) => console.log("getDeviceHashes", r))
      .catch(console.error);
    nomo
      .getBalanceWaitUntilSynced({ symbol: "BTC", name: "Bitcoin" })
      .then((r) => console.log("getBalanceWaitUntilSynced", r))
      .catch(console.error);
    nomo
      .getAssetPrice({
        symbol: "AVINOC",
        contractAddress: "0xF1cA9cb74685755965c7458528A36934Df52A3EF",
        network: "zeniq-smart-chain",
      })
      .then((r) => console.log("getAssetPrice", r))
      .catch(console.error);
    injectNomoCSSVariables();
    nomo.registerOnWebOnVisible((_args: { cardMode: boolean }) => {
      nomo.checkForWebOnUpdate();
    });
    nomo
      .setWebOnParameters({
        urlParams: { a: [1, 2, 3], b: { c: 1n, d: { e: [4, "5//%20ss s"] } } },
      })
      .then(() => {
        nomo
          .getWebOnParameters()
          .then((res) => console.log("getWebOnParameters", res))
          .catch(console.error);
      });
  }, []);
  useEffect(() => {
    const provider = zscProvider;
    const testWalletAddress = "0x1464935f48ca992d1a0bEAA2358471d7Cb6374E5";
    const stakingContractAddress = "0x97F51eCDeEdecdb740DD1ff6236D013aFff0417d";
    nomoFetchERC721({
      evmAddress: testWalletAddress,
      provider,
      nftContractAddress: stakingContractAddress,
    }).then((res) => {
      console.log("fetched staking NFTs", res);
    });
  }, []);

  const openDialog = (content: DialogContent) => {
    setDialog(content);
  };

  return (
    <main
      className={styles.main}
      style={{
        /* The css variables that are prefixed with "nomo" adjust themselves according to the current Nomo theme */
        background:
          "linear-gradient(to bottom right, white, var(--nomoBackground))",
      }}
    >
      <div className={styles.description}>
        <p>Nomo Dev WebOn - Scroll down to explore features of WebOns!</p>
      </div>

      <div className={styles.flex}>
        <Dialog content={dialog} handleClose={() => setDialog(null)} />
        <div style={{ height: "10px" }} />
        <img
          className={styles.logo}
          src="/nomo-logo-square.jpg"
          alt="NOMO Logo"
          width={180}
          height={37}
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
        <div style={{ height: "10px" }} />
        <div style={{ width: "100%" }}>
          <b>WebOn version:</b> {manifest?.webon_version}
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
          <AsyncButton
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
            Demo with ethers.js
          </AsyncButton>
          <p>
            Mint a NomoDev Token on the ZENIQ Smartchain, signed by the Nomo App
            via ethers.js-V6.
          </p>
        </div>
        <div className={styles.card}>
          <AsyncButton
            onClick={async () => {
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
          </AsyncButton>
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
          <AsyncButton
            onClick={async () => {
              try {
                await nomo.sendAssets({});
              } catch (e) {
                console.error(e);
                openDialog({
                  title: "nomoSendAssets failed",
                  content: JSON.stringify(e),
                });
              }
            }}
          >
            Send asset<span>-&gt;</span>
          </AsyncButton>
          <p>
            With consent from the user, WebOns can send assets from the Nomo
            App. Here we have defined no Args.
          </p>
        </div>
        <div className={styles.card}>
          <AsyncButton
            onClick={async () => {
              try {
                await nomo.sendAssets({
                  asset: {
                    symbol: "zeniq token",
                  },
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
            Send asset with Asset<span>-&gt;</span>
          </AsyncButton>
          <p>
            With consent from the user, WebOns can send assets from the Nomo
            App. Here we have defined the Asset.
          </p>
        </div>
        <div className={styles.card}>
          <AsyncButton
            onClick={async () => {
              try {
                var own = await nomo.getEvmAddress();
                await nomo.sendAssets({
                  asset: {
                    symbol: "zeniq token",
                  },
                  targetAddress: own,
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
            Send asset with Recipient<span>-&gt;</span>
          </AsyncButton>
          <p>
            With consent from the user, WebOns can send assets from the Nomo
            App. Here we have defined the Assets & Recipient.
          </p>
        </div>
        <div className={styles.card}>
          <AsyncButton
            onClick={async () => {
              try {
                await nomo.sendAssets({
                  asset: {
                    symbol: "zeniq token",
                  },
                  amount: "1",
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
            Send asset with Amount<span>-&gt;</span>
          </AsyncButton>
          <p>
            With consent from the user, WebOns can send assets from the Nomo
            App. Here we have defined the Asset & the Amount.
          </p>
        </div>
        <div className={styles.card}>
          <AsyncButton
            onClick={async () => {
              try {
                var own = await nomo.getEvmAddress();
                await nomo.sendAssets({
                  asset: {
                    symbol: "zeniq token",
                  },
                  targetAddress: own,
                  amount: "1",
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
            Send asset with Recipient & Amount<span>-&gt;</span>
          </AsyncButton>
          <p>
            With consent from the user, WebOns can send assets from the Nomo
            App. Here we have defined the Asset aswell as the Amount and the
            Recipient.
          </p>
        </div>

        <div className={styles.card}>
          <AsyncButton
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
          </AsyncButton>
          <p>
            WebOns can sign messages to prove that the user controls a specific
            wallet.
          </p>
        </div>
        <div className={styles.card}>
          <AsyncButton
            onClick={async () => {
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
            QR Scan<span>-&gt;</span>
          </AsyncButton>
          <p>Scan a QRCode with rapid speed</p>
        </div>
        <div className={styles.card}>
          <AsyncButton
            onClick={async () => {
              const nomoIdTestQRCode =
                "https://nomo.id/qrtest.zeniq.dev/backend/qrExecuteDefault?n=732341402ea1b483c523f83a2c79fee7&r=/backend/qrScanDefault";
              nomo.injectQRCode({
                qrCode: nomoIdTestQRCode,
                navigateBack: false,
              });
            }}
          >
            QR Injection<span>-&gt;</span>
          </AsyncButton>
          <p>Inject QRCodes to use features like the Nomo-ID protocol</p>
        </div>
        <div className={styles.card}>
          <AsyncButton
            onClick={async () => {
              await themeSwitchDemo();
            }}
          >
            Switch theme<span>-&gt;</span>
          </AsyncButton>
          <p>WebOns can switch between different Nomo themes</p>
        </div>
        <div className={styles.card}>
          <AsyncButton
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
          </AsyncButton>
          <p>WebOns can be combined to enable more powerful use cases.</p>
        </div>
        <div className={styles.card}>
          <AsyncButton
            onClick={async () => {
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
          </AsyncButton>
          <p>A demo for the sign-security-dialog.</p>
        </div>
        <div className={styles.card}>
          <AsyncButton
            onClick={async () => {
              proofOfPaymentDemo()
                .then((res) => {
                  openDialog({
                    title: "Signature Result",
                    content: JSON.stringify(res),
                  });
                })
                .catch((e) => {
                  console.error(e);
                  openDialog({
                    title: "ProofOfPayment failed",
                    content: e.nomoProofOfPayment,
                  });
                });
            }}
          >
            Proof of Payment for UTXO Assets <span>-&gt;</span>
          </AsyncButton>
          <p>A demo for the ProofOfPayment Feature.</p>
        </div>
        <div className={styles.card}>
          <AsyncButton
            onClick={async () => {
              nomo
                //.getExtendedPublicKey({ symbol: "BTC" })
                .getTransactions({ symbol: "BTC" })
                .then((res: any) => {
                  openDialog({
                    title: "Transactions",
                    content: JSON.stringify(res),
                  });
                })
                .catch((e) => {
                  console.error(e);
                  openDialog({
                    title: "getTransactions failed",
                    content: e.toString(),
                  });
                });
            }}
          >
            Get transactions <span>-&gt;</span>
          </AsyncButton>
          <p>WebOns can implement fully-functional wallet-UIs.</p>
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
        <div style={{ height: "10px" }} />
        <div
          onClick={async () => {
            await faqDemo();
          }}
        >
          Open FAQs
        </div>
        <div style={{ height: "10px" }} />
        <div
          onClick={() => {
            nomo.share({}); // uses the deeplink of the current WebOn as default
          }}
        >
          Share deeplinks
        </div>
        <div style={{ height: "10px" }} />
        <a href={"https://nomo.app/webon/faucet.nomo.zone"}>
          Click on WebOn deeplinks
        </a>
      </div>
    </main>
  );
}
