import { dateToCorrectStringFormat } from "../../../utils/utils";
import ModalDescriptionElement from "../UI/ModalDescriptionElement/ModalDescriptionElement";
import ModalCategories from "../UI/ModalCategories/ModalCategories";
import ModalPriceSection from "../UI/ModalPriceSection/ModalPriceSection";
import ModalCloseFooter from "../UI/ModalFooter/ModalFooter";
import AlertModal from "../Alert/AlertModal";
import usePaymentDelete from "../../../hooks/usePaymentDelete";
import ModalCard from "../UI/ModalCard/ModalCard";

const SubscriptionViewModal = ({
  subscriptionData,
  handleClose,
  handleEdit,
}) => {
  const { _id, isIncome, amount, title, categories, date, description } =
    subscriptionData;
  const { dialogRef, handleDeletePayment } = usePaymentDelete();

  const paymentCaptionElement = (
    <h2 className="default-modal-title">{title}</h2>
  );

  return (
    <ModalCard
      captionText="Subscription Information"
      handleClose={handleClose}
      handleEdit={handleEdit}
      handleDelete={() => dialogRef.current.showModal()}
    >
      <AlertModal
        ref={dialogRef}
        captionText="Delete Subscription"
        alertParagraph="Are you sure you want to delete subscription?"
        handleAccept={() => handleDeletePayment("subscriptions", _id)}
      />
      <section className="default-modal-section">
        <div className="default-modal-properties-ctn">
          <div className="default-modal-properties-top">
            <ModalPriceSection
              isIncome={isIncome}
              amount={amount}
              captionElement={paymentCaptionElement}
            />
            <ModalCategories categories={categories} />
          </div>
        </div>
        <div className="default-modal-properties-middle">
          <ModalDescriptionElement
            captionText="Payment Dates"
            descriptionText={`${dateToCorrectStringFormat(
              date.from
            )} - ${dateToCorrectStringFormat(date.to)}`}
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

export default SubscriptionViewModal;
