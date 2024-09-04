import { useEffect, useState } from "react";
import { UITestHeader, UITestRow } from "./test-kit/NomoUITest";
import { sandBoxingTests } from "./tests/tc-sandboxing";
import { sendAssetsTests } from "./tests/tc-send-assets";
import { proofOfWorkTests } from "./tests/tc-proof-of-work";
import { nomo } from "nomo-webon-kit";

function useWebOnVersion() {
  const [version, setVersion] = useState<string | null>(null);
  useEffect(() => {
    nomo.getManifest().then((res) => {
      setVersion(res.webon_version);
    });
  }, []);
  return version;
}

function useNomoVersion() {
  const [version, setVersion] = useState<string | null>(null);
  useEffect(() => {
    nomo.getPlatformInfo().then((res) => {
      setVersion(
        res.version + "-" + res.buildNumber + "-" + res.operatingSystem
      );
    });
  }, []);
  return version;
}

export default function UITestPage() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const webOnVersion = useWebOnVersion();
  const nomoVersion = useNomoVersion();
  useEffect(() => {
    const updateTimer = () => {
      setCurrentTime(new Date());
    };
    const intervalId = setInterval(updateTimer, 50);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        fontFamily: "Helvetica",
      }}
    >
      <div>
        <div
          style={{
            marginBottom: "0px",
            fontSize: "xx-large",
            fontWeight: "bold",
          }}
        >
          WebOn-API UI Tests
        </div>
      </div>
      <div style={{ height: "5px" }} />
      <div style={{ fontSize: "large" }}>Test Version: {webOnVersion}</div>
      <div style={{ fontSize: "large" }}>Nomo App Version: {nomoVersion}</div>
      <div style={{ height: "5px" }} />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
        }}
      >
        <UITestHeader />
        <UITestRow test={sandBoxingTests.navigateToGitHub} />
        <UITestRow test={sandBoxingTests.recaptchaV3} />
        <UITestRow test={sandBoxingTests.iframe} />
        <UITestRow test={sendAssetsTests.sendAssetsCancel} />
        <UITestRow test={sendAssetsTests.sendAssetsAmbiguous} />
        <UITestRow test={proofOfWorkTests.proofOfWorkTest3Seconds} />
      </div>
    </main>
  );
}
