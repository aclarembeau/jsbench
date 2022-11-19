import { useEffect, useState } from "react";
import { getCompletions, setupScriptFunctions } from "./scriptFunctions.js";
import { AceEditor } from "../aceEditor.jsx";
import * as stats from "simple-statistics";

export function EditorCode({
  contextData,
  setContextData,
  setPlotModal,
  setResult,
}) {
  let [code, setCode] = useState();

  let { setContext, getContext, removeContext, plot } = setupScriptFunctions({
    contextData,
    setContextData,
    setPlotModal,
  });

  function runCode() {
    try {
      setResult(JSON.stringify(eval(code), null, 2)?.slice(0, 1000));
    } catch (e) {
      setResult(e.message);
    }
  }

  useEffect(() => {
    let listener = (e) => {
      if (e.key === "Enter" && e.ctrlKey) {
        runCode();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [runCode]);

  return (
    <AceEditor
      data={code}
      setData={setCode}
      completions={getCompletions(contextData)}
    />
  );
}
