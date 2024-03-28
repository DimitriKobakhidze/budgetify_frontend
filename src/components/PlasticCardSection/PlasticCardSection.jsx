import "./plasticCardSection.css";
import PlasticCard from "../UI/PlasticCard/PlasticCard";
import { useStore } from "../../store/store";
import { useState } from "react";
import AccountViewModal from "../Modals/Account/AccountViewModal";
import AccountFormModal from "../Modals/Account/AccountFormModal";
import { editUserCard } from "../../services/apiService";
import { useNavigate } from "react-router";

const PlasticCardSection = () => {
  const navigate = useNavigate();
  const primaryCard = useStore((state) => state.userData.primaryCard);
  const allCards = useStore((state) => state.userData.cards);
  const changePrimaryCard = useStore((state) => state.changePrimaryCard);
  const [viewPrimaryDetails, setViewPrimaryDetails] = useState(false);
  const [editPrimaryDetails, setEditPrimaryDetails] = useState(false);

  const handleEdit = () => {
    setViewPrimaryDetails(false);
    setEditPrimaryDetails(true);
  };

  const handleEditAccount = async (newAccount, handleClose) => {
    try {
      await editUserCard({ ...newAccount, _id: primaryCard._id });
      await useStore.getState().refetchUserCards();
      handleClose();
    } catch (err) {
      navigate("/error");
    }
  };

  return (
    <section className="plastic-card-section">
      {viewPrimaryDetails && (
        <AccountViewModal
          cardData={primaryCard}
          handleClose={() => setViewPrimaryDetails(false)}
          handleEdit={handleEdit}
        />
      )}
      {editPrimaryDetails && (
        <AccountFormModal
          cardData={primaryCard}
          handleClose={() => setEditPrimaryDetails(false)}
          formData={primaryCard}
          handleForm={handleEditAccount}
        />
      )}
      <PlasticCard
        key={primaryCard._id}
        primary={true}
        cardTitle={primaryCard.name}
        amount={primaryCard.amount}
        symbol={primaryCard.currency.symbol}
        handleOnClick={() => setViewPrimaryDetails(true)}
      />
      {allCards.map((cardData) =>
        cardData._id === primaryCard._id ? null : (
          <PlasticCard
            key={cardData._id}
            handleOnClick={() => changePrimaryCard(cardData._id)}
            cardTitle={cardData.name}
            amount={cardData.amount}
            symbol={cardData.currency.symbol}
          />
        )
      )}
    </section>
  );
};

export default PlasticCardSection;
