import ReactDOM from "react-dom";
import Popup from "./Popup";

interface IShowPopup {
  type: "success" | "error";
  message: string;
}

export const showPopup = (param: IShowPopup) => {
  const portalElement = document.createElement("div");
  portalElement.id = "portal-container";
  document.body.appendChild(portalElement);

  setTimeout(() => {
    handleHideElement();
  }, 5000);

  ReactDOM.render(
    <Popup type={param.type} message={param.message} />,
    portalElement
  );
};

const handleHideElement = () => {
  const portalElement = document.getElementById("success-portal-container");
  if (portalElement) {
    ReactDOM.unmountComponentAtNode(portalElement);
    portalElement.remove();
  }
};
