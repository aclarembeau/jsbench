import ace from "ace-builds/src-noconflict/ace";
import jsonWorkerUrl from "ace-builds/src-noconflict/worker-javascript?url";
import modeJavascript from "ace-builds/src-noconflict/mode-javascript?url";
import extTools from "ace-builds/src-noconflict/ext-language_tools";
import themeMonokai from "ace-builds/src-noconflict/theme-one_dark  ";
import { useCallback, useEffect, useRef, useState } from "react";
import { edit } from "ace-builds";

ace.config.setModuleUrl("ace/mode/javascript_worker", jsonWorkerUrl);
ace.config.setModuleUrl("ace/mode/javascript", modeJavascript);

export function AceEditor({ data, setData, completions }) {
  let [editor, setEditor] = useState();
  let unboundCompletions = useRef();
  unboundCompletions.current = completions;

  useEffect(() => {
    let instance = ace.edit("editor", { lines: 10 });
    setEditor(instance);

    instance.setTheme(themeMonokai);
    instance.session.setMode("ace/mode/javascript");
    instance.setValue(data, -1);

    instance.setOptions({
      enableBasicAutocompletion: [
        {
          getCompletions: (editor, session, pos, prefix, callback) => {
            callback(null, unboundCompletions.current);
          },
        },
      ],
      // to make popup appear automatically, without explicit _ctrl+space_
      enableLiveAutocompletion: true,
    });

    instance.session.on("change", (e) => {
      setData(instance.getValue());
    });
  }, []);

  useEffect(() => {
    if (editor) {
      if (editor.getValue() != data) editor.setValue(data?.toString());
    }
  }, [data]);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <div id={"editor"} style={{ width: "100%", height: "100%" }}></div>
    </div>
  );
}
