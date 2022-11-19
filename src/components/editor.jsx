import { useState } from "react";
import "c3/c3.min.css";
import { EditorContext } from "./editor/editorContext.jsx";
import { EditorResult } from "./editor/editorResult.jsx";
import { EditorCode } from "./editor/editorCode.jsx";
import { EditorChart } from "./editor/editorChart.jsx";

export function Editor() {
  let [contextData, setContextData] = useState({});
  let [result, setResult] = useState();
  let [plotModal, setPlotModal] = useState(false);

  return (
    <div className={"editor"}>
      <EditorContext
        setContextData={setContextData}
        contextData={contextData}
      />

      {plotModal && <EditorChart onClose={() => setPlotModal(false)} />}

      <div className={"editor-code"}>
        <EditorCode
          contextData={contextData}
          setContextData={setContextData}
          setPlotModal={setPlotModal}
          setResult={setResult}
        />
        <EditorResult result={result} />
      </div>
    </div>
  );
}
