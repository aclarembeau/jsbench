import { Modal } from "../modal.jsx";
import { Resizable } from "re-resizable";

export function EditorChart({ onClose }) {
  return (
    <Modal onClose={() => onClose()}>
      <Resizable
        style={{
          border: "1px solid black",
          overflow: "hidden",
        }}
      >
        <div id={"chart"} />
      </Resizable>
    </Modal>
  );
}
