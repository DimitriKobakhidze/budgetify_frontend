import { format, parseISO } from "date-fns";

import ModalFooter from "../../UI/ModalFooter/ModalFooter";
import IncomeSelector from "../../UI/IncomeSelector/IncomeSelector";
import DefaultModalInput from "../../UI/DefaultModalInput/DefaultModalInput";
import ModalCategorySelect from "../../UI/ModalCategorySelect/ModalCategorySelect";
import usePaymentFormSetup from "../../../../hooks/usePaymentFormSetup";
import { validatePaymentForm } from "../../../../utils/utils";
import { useState } from "react";
import ModalFormErrors from "../../UI/ModalFormErrors/ModalFormErrors";
import ModalCard from "../../UI/ModalCard/ModalCard";

const TransactionFormModal = ({
  formTitle,
  formData = {},
  handleClose,
  handleForm,
}) => {
  const [validationErrors, setValidationErrors] = useState([]);
  const {
    isIncome,
    setIsIncome,
    selectedCategories,
    setSelectedCategories,
    titleRef,
    amountRef,
    paymentDateRef,
    payeeRef,
    descriptionRef,
  } = usePaymentFormSetup(formData);

  const validateForm = () => {
    const transactionData = {
      isIncome,
      categories: selectedCategories.map(
        (categoryObject) => categoryObject.value
      ),
      title: titleRef.current.value,
      amount: amountRef.current.value,
      description: descriptionRef.current.value,
      date: paymentDateRef.current.value,
      payee: payeeRef.current.value,
    };

    const errors = validatePaymentForm(transactionData, "Transactions");

    if (errors.length) {
      setValidationErrors(errors);
    } else {
      handleForm(transactionData, handleClose);
    }
  };

  return (
    <ModalCard captionText={formTitle} handleClose={handleClose}>
      <section className="default-modal-section">
        <IncomeSelector isIncome={isIncome} setIsIncome={setIsIncome} />
        <DefaultModalInput
          defaultValue={formData.title || ""}
          inputTitle="Title"
          ref={titleRef}
        />
        <ModalCategorySelect
          inputTitle="Categories"
          defaultValue={formData.categories || []}
          setSelectState={setSelectedCategories}
        />
        <DefaultModalInput
          defaultValue={formData.amount || ""}
          inputTitle="Amount"
          inputType="number"
          ref={amountRef}
        />
        <DefaultModalInput
          defaultValue={
            formData.date
              ? format(parseISO(formData.date), "yyyy-MM-dd")
              : format(new Date(), "yyyy-MM-dd")
          }
          inputTitle="Payment Date"
          inputType="date"
          ref={paymentDateRef}
        />
        <DefaultModalInput
          defaultValue={formData.payee || ""}
          inputTitle="Payee"
          ref={payeeRef}
        />
        <DefaultModalInput
          defaultValue={formData.description || ""}
          inputTitle="Description"
          ref={descriptionRef}
        />
        {validationErrors.length > 0 && (
          <ModalFormErrors validationErrors={validationErrors} />
        )}
      </section>
      <ModalFooter handleClose={handleClose} handleSave={validateForm} />
    </ModalCard>
  );
};

export default TransactionFormModal;
