import "./modalFormErrors.css";

const ModalFormErrors = ({ validationErrors }) => {
  return (
    <div className="modal-form-errors-container">
      {validationErrors.map((errorText) => (
        <span key={errorText} className="modal-form-error">
          {errorText}
        </span>
      ))}
    </div>
  );
};

export default ModalFormErrors;
