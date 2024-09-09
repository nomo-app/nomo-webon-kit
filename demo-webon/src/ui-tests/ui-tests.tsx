import { useEffect, useState } from "react";
import { UITestHeader, UITestRow } from "./test-kit/NomoUITest";
import { sandBoxingTests } from "./tests/tc-sandboxing";
import { sendAssetsTests } from "./tests/tc-send-assets";
import { proofOfWorkTests } from "./tests/tc-proof-of-work";
import { signTxTests } from "./tests/tc-sign-transactions";
import { useNomoVersion, useWebOnVersion } from "./test-kit/test-util";
import { NomoUITest } from "./test-kit/nomo-ui-test";

const allTests: Array<NomoUITest> = [
  ...signTxTests,
  ...sandBoxingTests,
  ...sendAssetsTests,
  ...proofOfWorkTests,
];

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
        {Object.values(allTests).map((test) => (
          <UITestRow test={test} key={test.name} />
        ))}
      </div>
    </main>
  );
}
