import { useEffect, useState } from "react";
import { UITestHeader, UITestRow } from "./test-kit/NomoUITest";
import { sandBoxingTests } from "./tests/tc-sandboxing";
import { sendAssetsTests } from "./tests/tc-send-assets";
import { proofOfWorkTests } from "./tests/tc-proof-of-work";

export default function UITestPage() {
  const [currentTime, setCurrentTime] = useState(new Date());
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
        <h1>WebOn-API UI Tests</h1>
      </div>
      <div style={{ height: "10px" }} />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
        }}
      >
        <UITestHeader />
        <UITestRow test={sandBoxingTests.navigateToGitHub} />
        <UITestRow test={sendAssetsTests.sendAssetsCancel} />
        <UITestRow test={sendAssetsTests.sendAssetsAmbiguous} />
        <UITestRow test={proofOfWorkTests.proofOfWorkTest3Seconds} />
      </div>
    </main>
  );
}
