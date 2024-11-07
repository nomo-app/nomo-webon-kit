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
import { getTransactionTests } from "./tests/tc-get-transactions";
import { resolveNameTests } from "./tests/tc-resolve-names";
import { deeplinkTests } from "./tests/tc-deeplinks";
import { proofOfPaymentTests } from "./tests/tc-proof-of-payment";
import { useNavigate } from "react-router-dom";
import { getLanguageTests } from "./tests/tc-get-language";

const manualTests: Array<NomoTest> = [
  ...sendAssetsManualTests,
  ...signTxTests,
  ...sandBoxingTests,
  ...deeplinkTests,
];

const unitTests: Array<NomoTest> = [
  ...proofOfWorkTests,
  ...nomoAuthTests,
  ...sendAssetsUnitTests,
  ...getTransactionTests,
  ...proofOfPaymentTests,
  ...resolveNameTests,
  ...getLanguageTests,
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

function BackButton() {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(-1)}
      style={{
        textAlign: "center",
        marginRight: "5px",
        padding: "0px 10px",
        fontSize: "x-large",
        backgroundColor: "lightblue",
        border: "2px solid black",
        borderRadius: "5px",
      }}
    >
      {"←"}
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
      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <BackButton />
        <div
          style={{
            marginBottom: "0px",
            fontSize: "x-large",
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
