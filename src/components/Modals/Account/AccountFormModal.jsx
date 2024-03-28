import { useRef, useState } from "react";

import ModalCard from "../UI/ModalCard/ModalCard";
import { valdateInputNotEmpty } from "../../../utils/utils";
import DefaultModalInput from "../UI/DefaultModalInput/DefaultModalInput";
import ModalFormErrors from "../UI/ModalFormErrors/ModalFormErrors";
import ModalFooter from "../UI/ModalFooter/ModalFooter";
import AccountSelectInput from "../UI/AccountSelectInput/AccountSelectInput";
import { currencyOptions } from "../../../utils/utils";

const AccountFormModal = ({
  formTitle = "Edit Account",
  formData = {},
  handleClose,
  handleForm,
}) => {
  const [validationErrors, setValidationErrors] = useState([]);
  const [selectState, setSelectState] = useState(
    formData.currency
      ? {
          label: `${formData.currency.name} [${formData.currency.symbol}]`,
          value: {
            name: formData.currency.name,
            symbol: formData.currency.symbol,
          },
        }
      : currencyOptions[0]
  );
  const titleRef = useRef();
  const descriptionRef = useRef();

  const validateForm = () => {
    const errors = [];
    if (!valdateInputNotEmpty(titleRef.current.value))
      errors.push("Title field is empty");
    if (!valdateInputNotEmpty(descriptionRef.current.value))
      errors.push("Description field is empty");

    const account = {
      name: titleRef.current.value,
      description: descriptionRef.current.value,
      currency: selectState.value,
    };

    if (errors.length) {
      setValidationErrors(errors);
    } else {
      handleForm(account, handleClose);
    }
  };

  return (
    <ModalCard captionText={formTitle} handleClose={handleClose}>
      <section className="default-modal-section">
        <DefaultModalInput
          defaultValue={formData.name || ""}
          inputTitle="Title"
          ref={titleRef}
        />
        <AccountSelectInput
          formData={formData}
          setSelectState={setSelectState}
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

export default AccountFormModal;
