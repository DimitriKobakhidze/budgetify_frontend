import "./modalAmount.css";

const ModalAmount = ({ isIncome = false, amount, captionElement }) => {
  return (
    <div className="modal-properties-important">
      {captionElement}
      <span
        className={isIncome ? "modal-amount-income" : "modal-amount-expense"}
      >
        {amount.toFixed(2)}$
      </span>
    </div>
  );
};

export default ModalAmount;
