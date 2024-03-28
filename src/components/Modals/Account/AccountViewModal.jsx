import { useRef } from "react";
import AlertModal from "../Alert/AlertModal";
import ModalCard from "../UI/ModalCard/ModalCard";
import ModalDescriptionElement from "../UI/ModalDescriptionElement/ModalDescriptionElement";
import ModalCloseFooter from "../UI/ModalFooter/ModalFooter";
import { deleteUserCard } from "../../../services/apiService";
import { useStore } from "../../../store/store";
import { useNavigate } from "react-router";

const AccountViewModal = ({ cardData, handleClose, handleEdit }) => {
  const navigate = useNavigate();
  const dialogRef = useRef();

  const handleDeleteAccout = async () => {
    try {
      await deleteUserCard(cardData._id);
      await useStore.getState().refetchUserCards(false);
      dialogRef.current.close();
      handleClose();
    } catch (e) {
      navigate("/error");
    }
  };

  return (
    <ModalCard
      captionText="Account Information"
      handleClose={handleClose}
      handleDelete={() => dialogRef.current.showModal()}
      handleEdit={handleEdit}
    >
      <AlertModal
        ref={dialogRef}
        captionText="Delete Account"
        alertParagraph="Are you sure you want to delete account?"
        handleAccept={handleDeleteAccout}
      />
      <section className="default-modal-section">
        <div className="default-modal-properties-middle">
          <ModalDescriptionElement
            captionText="Title"
            descriptionText={cardData.name}
          />
          <ModalDescriptionElement
            captionText="Balance"
            descriptionText={`${cardData.amount.toFixed(2)} ${
              cardData.currency.symbol
            }`}
          />
          <ModalDescriptionElement
            captionText="Currency"
            descriptionText={`${cardData.currency.name} [${cardData.currency.symbol}]`}
          />
          <ModalDescriptionElement
            captionText="Description"
            descriptionText={cardData.description}
          />
        </div>
      </section>
      <ModalCloseFooter handleClose={handleClose} />
    </ModalCard>
  );
};

export default AccountViewModal;
