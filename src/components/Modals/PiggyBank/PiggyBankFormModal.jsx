import { useRef, useState } from "react";

import ModalFooter from "../UI/ModalFooter/ModalFooter";
import DefaultModalInput from "../UI/DefaultModalInput/DefaultModalInput";
import ModalFormErrors from "../UI/ModalFormErrors/ModalFormErrors";
import ModalCard from "../UI/ModalCard/ModalCard";
import {
  vaildateNumberInput,
  valdateInputNotEmpty,
} from "../../../utils/utils";
import { useStore } from "../../../store/store";

const PiggyBankFormModal = ({
  formTitle,
  formData = {},
  handleClose,
  handleForm,
}) => {
  const [validationErrors, setValidationErrors] = useState([]);
  const titleRef = useRef();
  const amountRef = useRef();

  const validateForm = () => {
    const errors = [];
    if (!vaildateNumberInput(amountRef.current.value)) {
      errors.push("Amount field is empty or invalid");
    }
    if (!valdateInputNotEmpty(titleRef.current.value)) {
      errors.push("Title field is empty");
    }

    if (errors.length) return setValidationErrors(errors);

    const primaryCard = useStore.getState().userData.primaryCard;

    const piggyData = {
      piggyTitle: titleRef.current.value,
      goalAmount: amountRef.current.value,
      currency: primaryCard.currency,
      cardId: primaryCard._id,
    };

    handleForm(piggyData);
  };

  return (
    <ModalCard captionText={formTitle} handleClose={handleClose}>
      <section className="default-modal-section">
        <DefaultModalInput
          defaultValue={formData.piggyTitle || ""}
          inputTitle="Goal"
          ref={titleRef}
        />
        <DefaultModalInput
          defaultValue={formData.goalAmount || ""}
          inputTitle="Goal Amount"
          inputType="number"
          ref={amountRef}
        />
        {validationErrors.length > 0 && (
          <ModalFormErrors validationErrors={validationErrors} />
        )}
      </section>
      <ModalFooter handleClose={handleClose} handleSave={validateForm} />
    </ModalCard>
  );
};

export default PiggyBankFormModal;
