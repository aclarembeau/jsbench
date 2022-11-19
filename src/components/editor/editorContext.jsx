import { useDropzone } from "react-dropzone";
import * as xlsx from "node-xlsx";
import { useState } from "react";
import { Resizable } from "re-resizable";
import { Modal } from "../modal.jsx";

export function EditorContext({ contextData, setContextData }) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop: (files) => upload(files),
  });
  let upload = (files) => {
    let file = files[0];
    let reader = new FileReader();
    if (
      file.name.endsWith(".xls") ||
      file.name.endsWith(".xlsx") ||
      file.name.endsWith(".csv")
    ) {
      reader.readAsArrayBuffer(file);
      reader.onload = (e) => {
        let xls = xlsx.parse(e.target.result);
        setContextData({ ...contextData, [file.name]: xls[0].data });
      };
    } else {
      reader.readAsText(file);
      reader.onload = (e) => {
        try {
          let preview = JSON.parse(e.target.result);
          setContextData({ ...contextData, [file.name]: preview });
        } catch (e) {
          alert("Cannot parse input: " + e.toString());
        }
      };
    }
  };
  let [expandedContext, setExpandedContext] = useState(null);
  return (
    <Resizable className={"editor-context"} defaultSize={{ width: 200 }}>
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>Drag XLS or CSV files here</p>
      </div>

      {expandedContext && (
        <Modal onClose={() => setExpandedContext(null)}>
          <pre>
            {JSON.stringify(contextData[expandedContext], null, 2).slice(
              0,
              1000
            )}
          </pre>
        </Modal>
      )}

      <ul>
        {Object.entries(contextData).map(([key, value]) => (
          <li>
            <a
              href={"#"}
              onClick={() =>
                expandedContext === key
                  ? setExpandedContext(null)
                  : setExpandedContext(key)
              }
            >
              {key}
            </a>
          </li>
        ))}
      </ul>
    </Resizable>
  );
}
