import "./modalFooter.css";

const ModalFooter = ({ handleClose, handleSave = null }) => {
  return (
    <footer className="modal-footer">
      <span className="modal-footer-close" onClick={handleClose}>
        {handleSave ? "Cancel" : "Close"}
      </span>
      {handleSave && (
        <span className="modal-footer-save" onClick={handleSave}>
          Save
        </span>
      )}
    </footer>
  );
};

export default ModalFooter;
