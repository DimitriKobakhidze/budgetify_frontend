import { forwardRef } from "react";
import "./alertModal.css";

const AlertModal = forwardRef(
  ({ captionText, alertParagraph, handleAccept }, ref) => {
    const closeDialog = () => ref.current.close();

    return (
      <dialog ref={ref} className="alert-dialog">
        <section className="alert-modal-section">
          <header className="default-modal-header">
            {captionText}
            <div className="view-modal-icons-ctn">
              <img src="/close-icon.png" alt="close" onClick={closeDialog} />
            </div>
          </header>
          <p className="alert-modal-paragraph">{alertParagraph}</p>
          {handleAccept && (
            <footer className="modal-footer">
              <span className="modal-footer-close" onClick={handleAccept}>
                Yes
              </span>
              <span className="modal-footer-save" onClick={closeDialog}>
                No
              </span>
            </footer>
          )}
        </section>
      </dialog>
    );
  }
);

export default AlertModal;
