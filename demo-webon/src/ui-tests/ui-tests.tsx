import { UITestRow } from "./test-kit/NomoUITest";
import { sandBoxingTests } from "./tests/tc-sandboxing";
import { sendAssetsTests } from "./tests/tc-send-assets";

export default function UITestPage() {
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
        <div>Read the instructions to run the tests!</div>
      </div>
      <div style={{ height: "10px" }} />
      <UITestRow test={sandBoxingTests.navigateToGitHub} />
      <UITestRow test={sendAssetsTests.sendAssetsCancel} />
    </main>
  );
}
