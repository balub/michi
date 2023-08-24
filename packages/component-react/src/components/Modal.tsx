// packages
import React from "react";

interface IModal {
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
  title: string;
  children: React.ReactNode;
  disable?: boolean;
}

function Modal({
  title,
  visible,
  onOk,
  onCancel,
  children,
  disable = false,
}: IModal) {
  if (!visible) return <></>;

  return (
    <div className="modal">
      <div className="modal-root">
        <h1 className="modal-root__title">{title}</h1>
        {children}

        <div className="modal__footer">
          <button onClick={onCancel} className="modal__cancel-btn">
            Cancel
          </button>

          <button
            disabled={disable}
            onClick={onOk}
            className="modal__submit-btn"
            style={{ opacity: disable ? 0.3 : 1 }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
