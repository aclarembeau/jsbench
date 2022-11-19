import { Resizable } from "re-resizable";

export function EditorResult({ result }) {
  return (
    result?.length && (
      <Resizable defaultSize={{ height: 100 }} className={"editor-result"}>
        <pre className={"code-result"} style={{ height: "100%" }}>
          {result}
        </pre>
      </Resizable>
    )
  );
}
