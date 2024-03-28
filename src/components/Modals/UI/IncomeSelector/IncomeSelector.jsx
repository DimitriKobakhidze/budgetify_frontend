import "./incomeSelector.css";

const IncomeSelector = ({ isIncome, setIsIncome }) => {
  return (
    <div className="modal-income-selector-ctn">
      <div
        className={`modal-income-selector ${isIncome ? "" : "active"}`}
        onClick={() => setIsIncome(false)}
      >
        <img src="/expense-icon.png" alt="expense" />
        Expenses
      </div>
      <div
        className={`modal-income-selector income ${isIncome ? "active" : ""}`}
        onClick={() => setIsIncome(true)}
      >
        <img src="/income-icon.png" alt="income" />
        Income
      </div>
    </div>
  );
};

export default IncomeSelector;
