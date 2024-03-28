import { useState } from "react";

import "./paymentActivityCard.css";
import { dateToCorrectStringFormat, nextPaymentDay } from "../../utils/utils";
import { useStore } from "../../store/store";
import PaymentModalsContainer from "../../components/Modals/PaymentModalsContainer";

const PaymentActivityCard = ({ paymentActivityData }) => {
  const paymentType = useStore((state) => state.paymentType);
  const { title, isIncome, amount, currency, date, categories, payee } =
    paymentActivityData;
  // {date} if transactions its string else its object with "to" amd "from" properties
  // {categories} only exists if paymentActivity is transactions or subscriptions
  //  {payee}only send if paymentActivity is transactions
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <>
      <PaymentModalsContainer
        paymentType={paymentType}
        paymentActivityData={paymentActivityData}
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
        showViewModal={showViewModal}
        setShowViewModal={setShowViewModal}
      />
      <div className="payment-card-ctn" onClick={() => setShowViewModal(true)}>
        {(paymentType === "transactions" ||
          paymentType === "subscriptions") && (
          <div className="payment-card-category">{categories[0]}</div>
        )}
        <div className="payment-card-details-ctn">
          <div className="payment-card-details-top">
            <span className="payment-card-title">{title}</span>
            <span
              className={
                isIncome
                  ? "payment-card-amount-income"
                  : "payment-card-amount-expenses"
              }
            >
              {amount.toFixed(2)}
              {currency.symbol}
            </span>
          </div>
          <div className="payment-card-details-bottom">
            {paymentType === "transactions" && (
              <>
                <img
                  className="payment-card-type-icon"
                  src={isIncome ? "/income-icon.png" : "/expense-icon.png"}
                  alt="type"
                />
                {isIncome ? "Income" : "Expenses"}
                <span className="payment-card-date">
                  - {dateToCorrectStringFormat(date)}
                </span>
                <span className="payment-card-payee">- {payee}</span>
              </>
            )}
            {paymentType === "subscriptions" && (
              <>
                <span className="payment-card-payment-date">
                  Next payment date:
                </span>
                <span className="payment-card-payment-date-value">
                  {nextPaymentDay(date.from)}
                </span>
              </>
            )}
            {paymentType === "obligatories" && (
              <>
                <span className="payment-card-payment-date">
                  Payment dates:
                </span>
                <span className="payment-card-payment-date-value">
                  {dateToCorrectStringFormat(date.from)} -{" "}
                  {dateToCorrectStringFormat(date.to)}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentActivityCard;
