import { useState } from "react";

import "./piggyBankButton.css";
import SidebarButton from "../../UI/SidebarButton/SidebarButton";
import ProgressBar from "@ramonak/react-progress-bar";
import PiggyBankViewModal from "../../Modals/PiggyBank/PiggyBankViewModal";
import PiggyBankFormModal from "../../Modals/PiggyBank/PiggyBankFormModal";
import { useStore } from "../../../store/store";
import { updatePiggyBank } from "../../../services/apiService";
import { useQueryClient } from "react-query";
import PiggyBankAddMoneyModal from "../../Modals/PiggyBank/PiggyBankAddMoneyModal";
import { calculatePercentage } from "../../../utils/utils";
import useHandleError from "../../../hooks/useHandleError";
import AlertModal from "../../Modals/Alert/AlertModal";

const PiggyBankDetails = ({ piggyData, showAddMoneyModal }) => {
  const handleAddClick = (e) => {
    e.stopPropagation();

    showAddMoneyModal();
  };

  return (
    <div className="piggy-bank-details-ctn">
      <div className="piggy-details-wrapper">
        <div className="piggy-details">
          <h3 className="piggy-details-title">{piggyData.piggyTitle}</h3>
          <span className="piggy-details-numbers">
            {piggyData.savedAmount} / {piggyData.goalAmount}{" "}
            {piggyData.currency.symbol}
          </span>
        </div>
        <img
          src="/piggy-add-icon.png"
          alt="add-piggy"
          onClick={handleAddClick}
        />
      </div>
      <ProgressBar
        height="6px"
        isLabelVisible={false}
        bgColor="var(--piggyDarkPink)"
        className="piggy-details-pr-bar"
        completed={calculatePercentage(
          piggyData.savedAmount,
          piggyData.goalAmount
        )}
      />
    </div>
  );
};

const PiggyBankButton = ({ piggyData }) => {
  const queryClient = useQueryClient();
  const { errorMessage, errorModalRef, handleError } = useHandleError();
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddToPiggyModal, setShowAddToPiggyModal] = useState(false);

  const handleEditPiggyBank = async (piggyFormData) => {
    const primaryCard = useStore.getState().userData.primaryCard;
    try {
      await updatePiggyBank({
        piggyTitle: piggyFormData.piggyTitle,
        goalAmount: piggyFormData.goalAmount,
        _id: piggyData._id,
        cardId: primaryCard._id,
      });
      queryClient.invalidateQueries("piggyBanks");
      setShowEditModal(false);
    } catch (e) {
      handleError(e);
    }
  };

  if (showViewModal)
    return (
      <PiggyBankViewModal
        piggyData={piggyData}
        formTitle="Add Transaction"
        handleClose={() => setShowViewModal(false)}
        handleEdit={() => {
          setShowViewModal(false);
          setShowEditModal(true);
        }}
        handleAddToPiggy={() => {
          setShowViewModal(false);
          setShowAddToPiggyModal(true);
        }}
      />
    );

  if (showAddToPiggyModal)
    return (
      <PiggyBankAddMoneyModal
        piggyData={piggyData}
        handleClose={() => setShowAddToPiggyModal(false)}
      />
    );

  if (showEditModal)
    return (
      <>
        <AlertModal alertParagraph={errorMessage} ref={errorModalRef} />
        <PiggyBankFormModal
          formTitle="Edit Piggy Bank"
          formData={piggyData}
          handleClose={() => setShowEditModal(false)}
          handleForm={handleEditPiggyBank}
        />
      </>
    );

  return (
    <SidebarButton
      handleOnclick={() => setShowViewModal(true)}
      onClick={() => setShowViewModal(true)}
      iconSrc="/piggy-bank-icon.png"
      customClasses="pink"
      customElement={
        <PiggyBankDetails
          showAddMoneyModal={() => setShowAddToPiggyModal(true)}
          piggyData={piggyData}
        />
      }
    />
  );
};

export default PiggyBankButton;
