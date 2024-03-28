import "./toast.css";

import { MdOutlineClose } from "react-icons/md";

const Toast = ({ tooltipText, setShowToast, customClasses = "" }) => {
  return (
    <div className={`toast-container ${customClasses}`}>
      <span>{tooltipText}</span>
      <MdOutlineClose
        className="toast-close-icon"
        onClick={() => setShowToast(false)}
      />
    </div>
  );
};

export default Toast;
