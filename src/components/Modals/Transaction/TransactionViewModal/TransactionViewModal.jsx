import "./transactionViewModal.css";
import { dateToCorrectStringFormat } from "../../../../utils/utils";
import ModalDescriptionElement from "../../UI/ModalDescriptionElement/ModalDescriptionElement";
import ModalCategories from "../../UI/ModalCategories/ModalCategories";
import ModalPriceSection from "../../UI/ModalPriceSection/ModalPriceSection";
import ModalCloseFooter from "../../UI/ModalFooter/ModalFooter";
import AlertModal from "../../Alert/AlertModal";
import usePaymentDelete from "../../../../hooks/usePaymentDelete";
import ModalCard from "../../UI/ModalCard/ModalCard";

const TransactionViewModal = ({
  transasctionData,
  handleClose,
  handleEdit,
}) => {
  const { _id, isIncome, amount, title, categories, date, payee, description } =
    transasctionData;
  const { dialogRef, handleDeletePayment } = usePaymentDelete();

  const transactionCaptionElement = (
    <span className="transaction-modal-type">
      <img
        src={isIncome ? "/income-icon.png" : "/expense-icon.png"}
        alt="type"
      />
      {isIncome ? "Icome" : "Expenses"}
    </span>
  );

  return (
    <ModalCard
      captionText="Transaction Information"
      handleClose={handleClose}
      handleEdit={handleEdit}
      handleDelete={() => dialogRef.current.showModal()}
    >
      <AlertModal
        ref={dialogRef}
        captionText="Delete Transaction"
        alertParagraph="Are you sure you want to delete transaction?"
        handleAccept={() => handleDeletePayment("transactions", _id)}
      />
      <section className="default-modal-section">
        <div className="default-modal-properties-ctn">
          <div className="default-modal-properties-top">
            <ModalPriceSection
              isIncome={isIncome}
              amount={amount}
              captionElement={transactionCaptionElement}
            />
            <span className="default-modal-title">{title}</span>
            <ModalCategories categories={categories} />
          </div>
        </div>
        <div className="default-modal-properties-middle">
          <ModalDescriptionElement
            captionText="Payment Date"
            descriptionText={dateToCorrectStringFormat(date)}
          />
          <ModalDescriptionElement
            captionText="Payee"
            descriptionText={payee}
          />
          <ModalDescriptionElement
            captionText="Description"
            descriptionText={description}
          />
        </div>
      </section>
      <ModalCloseFooter handleClose={handleClose} />
    </ModalCard>
  );
};

export default TransactionViewModal;
