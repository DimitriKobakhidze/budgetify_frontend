import { useState } from "react";
import { addDays } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import ModalFooter from "../../UI/ModalFooter/ModalFooter";
import DefaultModalInput from "../../UI/DefaultModalInput/DefaultModalInput";
import { validatePaymentForm } from "../../../../utils/utils";
import usePaymentFormSetup from "../../../../hooks/usePaymentFormSetup";
import ModalFormErrors from "../../UI/ModalFormErrors/ModalFormErrors";
import ModalDatePicker from "../../UI/ModalDatePicker/ModalDatePicker";
import ModalCard from "../../UI/ModalCard/ModalCard";

const ObligatoryFormModal = ({
  formTitle,
  formData = {},
  handleClose,
  handleForm,
}) => {
  const [validationErrors, setValidationErrors] = useState([]);
  const [date, setDate] = useState([
    {
      startDate: formData.date?.from
        ? new Date(formData.date.from)
        : new Date(),
      endDate: formData.date?.to
        ? new Date(formData.date.to)
        : addDays(new Date(), 7),
      key: "selection",
    },
  ]);
  const { titleRef, amountRef, descriptionRef } = usePaymentFormSetup(formData);

  const validateForm = () => {
    const obligatoryData = {
      title: titleRef.current.value,
      amount: amountRef.current.value,
      description: descriptionRef.current.value,
      date: { from: date[0].startDate, to: date[0].endDate },
    };

    const errors = validatePaymentForm(obligatoryData, "Obligatories");

    if (errors.length) {
      setValidationErrors(errors);
    } else {
      handleForm(obligatoryData, handleClose);
    }
  };

  return (
    <ModalCard captionText={formTitle} handleClose={handleClose}>
      <section className="default-modal-section">
        <DefaultModalInput
          defaultValue={formData.title || ""}
          inputTitle="Title"
          ref={titleRef}
        />
        <DefaultModalInput
          defaultValue={formData.amount || ""}
          inputTitle="Amount"
          inputType="number"
          ref={amountRef}
        />
        <DefaultModalInput
          defaultValue={formData.description || ""}
          inputTitle="Description"
          ref={descriptionRef}
        />
        <ModalDatePicker date={date} setDate={setDate} />
        {validationErrors.length > 0 && (
          <ModalFormErrors validationErrors={validationErrors} />
        )}
      </section>
      <ModalFooter handleClose={handleClose} handleSave={validateForm} />
    </ModalCard>
  );
};

export default ObligatoryFormModal;
