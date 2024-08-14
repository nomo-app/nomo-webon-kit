import { NomoUITest } from "./nomo-ui-test";

export function UITestRow(props: { test: NomoUITest }) {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div>{"STATE:" + props.test.state.state}</div>
      <div>{props.test.name}</div>
      <div>{props.test.description}</div>
      <div>{props.test.state.time?.toTimeString()}</div>
      <div
        style={{
          backgroundColor: "lightblue",
          padding: "5px",
          cursor: "pointer",
        }}
        onClick={() => {
          props.test.runTest();
        }}
      >
        RUN
      </div>
    </div>
  );
}
