import "./toast.css";

import { MdOutlineClose } from "react-icons/md";

const Toast = ({ tooltipText, closeToast, customClasses = "" }) => {
  return (
    <div className={`toast-container ${customClasses}`}>
      <span>{tooltipText}</span>
      <MdOutlineClose className="toast-close-icon" onClick={closeToast} />
    </div>
  );
};

export default Toast;
