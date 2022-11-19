import React, { useEffect } from "react";

export function Modal({ onClose, children }) {
  useEffect(() => {
    let listener = (e) => {
      if (e.key === "Escape") onClose();
    };
    addEventListener("keydown", listener);
    return () => removeEventListener("keydown", listener);
  }, [onClose]);
  return (
    <div className={"modal-wrapper"} onClick={onClose}>
      <div className={"modal-body"} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
