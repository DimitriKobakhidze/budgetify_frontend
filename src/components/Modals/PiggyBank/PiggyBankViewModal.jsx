import ProgressBar from "@ramonak/react-progress-bar";

import "./piggyBankViewModal.css";
import ModalCard from "../UI/ModalCard/ModalCard";
import ModalFooter from "../UI/ModalFooter/ModalFooter";
import { crashPiggyBank } from "../../../services/apiService";
import { useQueryClient } from "react-query";
import { useStore } from "../../../store/store";
import { useNavigate } from "react-router";

const PiggyBankViewModal = ({
  piggyData,
  handleClose,
  handleEdit,
  handleAddToPiggy,
}) => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const handleCrashPiggyBank = async () => {
    try {
      await crashPiggyBank(piggyData.cardId, piggyData._id);
      queryClient.invalidateQueries("piggyBanks");
      await useStore.getState().refetchUserCards();
      handleClose();
    } catch (e) {
      navigate("/error");
    }
  };
  return (
    <ModalCard
      captionText="Piggy Bank Information"
      handleClose={handleClose}
      handleEdit={handleEdit}
      handleAddToPiggy={handleAddToPiggy}
    >
      <section className="default-modal-section">
        <div className="piggy-view-modal-progress-ctn">
          <span className="modal-description-element-description">{`${piggyData.savedAmount.toFixed()} / ${piggyData.goalAmount.toFixed()} ${
            piggyData.currency.symbol
          }`}</span>
          <ProgressBar
            height="10px"
            isLabelVisible={false}
            bgColor="var(--piggyDarkPink)"
            baseBgColor="var(--piggyLightPink)"
            className="piggy-details-pr-bar"
            completed={(piggyData.savedAmount * 100) / piggyData.goalAmount}
          />
        </div>
        <div className="default-modal-properties-middle">
          <div className="modal-description-element">
            <span className="modal-description-element-caption">Goal:</span>
            <span className="modal-description-element-description">
              {piggyData.piggyTitle}
            </span>
          </div>
          <div className="modal-description-element">
            <span className="modal-description-element-caption">
              Goal Amount:
            </span>
            <span className="modal-description-element-description">
              {piggyData.goalAmount.toFixed()} {piggyData.currency.symbol}
            </span>
          </div>
          <div className="modal-description-element">
            <span className="modal-description-element-caption">
              Saved Amount:
            </span>
            <span className="modal-description-element-description">
              {piggyData.savedAmount} {piggyData.currency.symbol}
            </span>
          </div>
        </div>
        <div className="piggy-view-modal-crash" onClick={handleCrashPiggyBank}>
          <img src="/piggy-bank-icon.png" alt="piggy" />
          Crash
        </div>
      </section>
      <ModalFooter handleClose={handleClose} />
    </ModalCard>
  );
};

export default PiggyBankViewModal;
