import { useEffect, useState } from "react";
import { NomoTestHeader, NomoTestRow } from "./test-kit/NomoTest";
import { sandBoxingTests } from "./tests/tc-sandboxing";
import {
  sendAssetsManualTests,
  sendAssetsUnitTests,
} from "./tests/tc-send-assets";
import { proofOfWorkTests } from "./tests/tc-proof-of-work";
import { signTxTests } from "./tests/tc-sign-transactions";
import { useNomoVersion, useWebOnVersion } from "./test-kit/test-util";
import { NomoTest } from "./test-kit/nomo-test";
import { nomoAuthTests } from "./tests/tc-nomo-auth";
import { LoadingSpinner } from "../app/components/async_button";

const manualTests: Array<NomoTest> = [
  ...signTxTests,
  ...sandBoxingTests,
  ...sendAssetsManualTests,
];

const unitTests: Array<NomoTest> = [
  ...proofOfWorkTests,
  ...nomoAuthTests,
  ...sendAssetsUnitTests,
];

function UnitTestRunner() {
  const [isRunning, setIsRunning] = useState(false);
  const runTests = async () => {
    if (isRunning) {
      return;
    }
    setIsRunning(true);
    for (const test of unitTests) {
      const timeoutPromise = new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });
      const testPromise = test.runTest({ allowPending: true });
      await Promise.race([testPromise, timeoutPromise]);
    }
    setIsRunning(false);
  };
  return (
    <div
      onClick={runTests}
      style={{
        display: "flex",
        justifyContent: "center",
        fontSize: "x-large",
        backgroundColor: "lightblue",
        margin: "15px",
        padding: "5px",
        textAlign: "center",
        borderRadius: "10px",
        border: "2px solid black",
      }}
    >
      {isRunning ? <LoadingSpinner /> : "Run Unit Tests"}
    </div>
  );
}

export default function ApiTestPage() {
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
          WebOn-API Tests
        </div>
      </div>
      <div style={{ height: "5px" }} />
      <div style={{ fontSize: "large" }}>Test Version: {webOnVersion}</div>
      <div style={{ fontSize: "large" }}>Nomo App Version: {nomoVersion}</div>
      <div style={{ height: "10px" }} />
      <UnitTestRunner />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
        }}
      >
        <NomoTestHeader manualTests={false} />
        {Object.values(unitTests).map((test) => (
          <NomoTestRow test={test} key={test.name} manual={false} />
        ))}
      </div>
      <div style={{ height: "20px" }} />

      <div
        style={{
          fontSize: "x-large",
          fontWeight: "bold",
        }}
      >
        Manual Tests
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
        }}
      >
        <NomoTestHeader manualTests={true} />
        {Object.values(manualTests).map((test) => (
          <NomoTestRow test={test} key={test.name} manual={true} />
        ))}
      </div>
    </main>
  );
}
