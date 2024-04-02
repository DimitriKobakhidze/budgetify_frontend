import { useRef, useState } from "react";

import ModalCard from "../UI/ModalCard/ModalCard";
import ModalFooter from "../UI/ModalFooter/ModalFooter";
import DefaultModalInput from "../UI/DefaultModalInput/DefaultModalInput";
import {
  vaildateNumberInput,
  valdateInputNotEmpty,
} from "../../../utils/utils";
import ModalFormErrors from "../UI/ModalFormErrors/ModalFormErrors";
import { addToPiggyBank } from "../../../services/apiService";
import { useQueryClient } from "react-query";
import { format } from "date-fns";
import { useNavigate } from "react-router";
import { useStore } from "../../../store/store";

const PiggyBankAddMoneyModal = ({ piggyData, handleClose }) => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const [validationErrors, setValidationErrors] = useState([]);

  const amountRef = useRef();
  const dateRef = useRef();

  const handleAddMoneyToPiggy = async () => {
    const errors = [];
    if (!vaildateNumberInput(amountRef.current.value))
      errors.push("Amount field is empty or invalid");
    if (!valdateInputNotEmpty(dateRef.current.value))
      errors.push("Date field is empty");

    if (errors.length) return setValidationErrors(errors);

    try {
      await addToPiggyBank({
        _id: piggyData._id,
        date: dateRef.current.value,
        savedAmount: amountRef.current.value,
        cardId: piggyData.cardId,
      });
      await useStore.getState().refetchUserCards();
      queryClient.invalidateQueries("piggyBanks");
      handleClose();
    } catch (err) {
      navigate("/error");
    }
  };

  return (
    <ModalCard captionText="Add money to Piggy Bank" handleClose={handleClose}>
      <section className="default-modal-section">
        <DefaultModalInput
          inputTitle="Goal"
          inputDisabled={true}
          defaultValue={piggyData.piggyTitle}
        />
        <DefaultModalInput
          ref={amountRef}
          inputTitle="Amount to save"
          inputType="number"
        />
        <DefaultModalInput
          ref={dateRef}
          inputType="date"
          inputTitle="Date"
          defaultValue={format(new Date(), "yyyy-MM-dd")}
        />
        <DefaultModalInput
          inputTitle="Goal amount"
          inputDisabled={true}
          defaultValue={piggyData.goalAmount.toFixed(2)}
        />
        {validationErrors.length > 0 && (
          <ModalFormErrors validationErrors={validationErrors} />
        )}
      </section>
      <ModalFooter
        handleClose={handleClose}
        handleSave={handleAddMoneyToPiggy}
      />
    </ModalCard>
  );
};

export default PiggyBankAddMoneyModal;
