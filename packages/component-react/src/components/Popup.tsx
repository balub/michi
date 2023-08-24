import React from "react";

interface IPopupProp {
  type: "success" | "error";
  message: string;
}

function Popup({ message, type }: IPopupProp) {
  return (
    <div className="popup">
      <div
        className="popup__head"
        style={{ background: type === "error" ? "#c70039" : "" }}
      >
        <div></div>
      </div>
      <div className="popup__body">
        <p className="popup__title">{message}</p>
        <p className="popup__subtitle">
          {type === "success" ? "Thanks for your feedback" : "Sorry"}
        </p>
      </div>
    </div>
  );
}

export default Popup;
