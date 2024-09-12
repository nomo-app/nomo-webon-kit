import { useEffect } from "react";
import { NomoTestState, NomoUITest } from "./nomo-ui-test";
import { LoadingSpinner } from "../../app/components/async_button";

const gridRowStyle = {
  gridColumn: "span 1",
  border: "1px solid black",
  padding: "5px",
  overflowWrap: "anywhere" as any,
};

function formatDateWithoutMilliseconds(date: Date | string | null) {
  if (!date) return "";

  // Convert to ISO string and remove milliseconds
  const isoString = typeof date === "string" ? date : date.toISOString();
  return isoString.split(".")[0] + "Z"; // Keep the part before the milliseconds and add 'Z' for UTC
}

function getStateColor(state: NomoTestState) {
  if (state.state === "PASS") {
    return "lightgreen";
  } else if (state.state === "FAIL") {
    return "lightcoral";
  } else if (state.state === "PENDING") {
    return "lightyellow";
  } else {
    return "white";
  }
}

export function UITestRow(props: { test: NomoUITest }) {
  useEffect(() => {}, []);
  return (
    <div
      style={{
        display: "contents",
      }}
    >
      <div style={{ ...gridRowStyle }}>{props.test.name}</div>
      <div style={{ ...gridRowStyle }}>{props.test.description}</div>
      <div
        style={{
          ...gridRowStyle,
          backgroundColor: getStateColor(props.test.state),
        }}
      >
        {"" + (props.test.state.state ?? "-")}
        <br />
        <div style={{ height: "5px" }} />
        {formatDateWithoutMilliseconds(props.test.state.time ?? null)}
        <br />
        {props.test.state.error ? JSON.stringify(props.test.state.error) : ""}
      </div>
      <div
        style={{
          ...gridRowStyle,
          backgroundColor: "lightblue",
          padding: "5px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
        onClick={async () => {
          if (props.test.state.state !== "PENDING") {
            await props.test.runTest();
          }
        }}
      >
        {props.test.state.state === "PENDING" ? <LoadingSpinner /> : "RUN"}
      </div>
    </div>
  );
}

const gridHeaderStyle = {
  gridColumn: "span 1",
  fontWeight: "bold",
  border: "2px solid black",
  padding: "5px",
  whiteSpace: "pre-wrap",
  overflowWrap: "anywhere" as any,
};

export function UITestHeader() {
  return (
    <div
      style={{
        display: "contents",
      }}
    >
      <div style={{ ...gridHeaderStyle }}>{"Name"}</div>
      <div style={{ ...gridHeaderStyle }}>{"Description"}</div>
      <div style={{ ...gridHeaderStyle }}>{"State"}</div>
      <div
        style={{
          ...gridHeaderStyle,
        }}
      >
        {"Action"}
      </div>
    </div>
  );
}
