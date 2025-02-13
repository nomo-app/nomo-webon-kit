import { useEffect, useState } from "react";
import Dialog, { DialogContent } from "./components/dialog";
import { useNomoState } from "./hooks/custom_hooks";
import { nomo } from "nomo-webon-kit";
import { injectNomoCSSVariables } from "nomo-webon-kit";
import styles from "./page.module.css";
import "./globals.css";
import { nomoFallbackQRCode } from "nomo-webon-kit";
import { routes } from "../routes";
export default function Home() {
  // nomo.disableFallbackWallet(); // uncomment this line to disable fallback-wallets like MetaMask
  const [dialog, setDialog] = useState<DialogContent | null>(null);
  const evmAddress = useNomoState(nomo.getEvmAddress, {
    errorValue: "fallback wallets are disabled",
  });
  const executionMode = useNomoState(nomo.getExecutionMode);
  const deviceName = useNomoState(nomo.getDeviceName);
  const [pictureFromCamera, setPictureFromCamera] = useState<string | null>(
    null
  );
  useEffect(() => {
    if (window.location.protocol !== "http:") {
      nomoFallbackQRCode();
    }
    injectNomoCSSVariables();
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
        <p>Nomo Dev WebOn - Run the tests to explore features of WebOns!</p>
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
          <b>WebOn mode:</b> {JSON.stringify(executionMode)}
        </div>
        <div style={{ height: "10px" }} />
        <div style={{ width: "100%" }}>
          <b>EVM address:</b> {evmAddress ?? null}
        </div>
        <div style={{ height: "10px" }} />
        <div style={{ width: "100%" }}>
          <b>Device name:</b> {JSON.stringify(deviceName)}
        </div>

        <div className={styles.card}>
          <h2
            onClick={async () => {
              window.location.href = routes.apiTests;
            }}
          >
            API Tests<span>-&gt;</span>
          </h2>
          <p>
            Tests for the WebOn-API. Including both manual tests and unit tests.
          </p>
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
        <div style={{ marginBottom: "10px" }}>
          <div
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
            Take picture
          </div>
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
        <a href={"https://nomo.app/webon/faucet.nomo.zone"}>
          Click on WebOn deeplinks
        </a>
      </div>
    </main>
  );
}
