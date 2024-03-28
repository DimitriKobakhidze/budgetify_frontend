import { useState, useRef } from "react";
import { useQueryClient } from "react-query";

import ModalFooter from "../UI/ModalFooter/ModalFooter";
import { addCategory } from "../../../services/apiService";
import IncomeSelector from "../UI/IncomeSelector/IncomeSelector";
import ModalFormErrors from "../UI/ModalFormErrors/ModalFormErrors";
import ModalCard from "../UI/ModalCard/ModalCard";
import { useNavigate } from "react-router";

const AddCategoryModal = ({ handleClose }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isIncome, setIsIncome] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);
  const categoryNameRef = useRef();

  const handleCategoryAddition = async () => {
    if (!categoryNameRef.current.value)
      return setValidationErrors(["Title field is empty"]);

    try {
      await addCategory(categoryNameRef.current.value, isIncome);
      queryClient.invalidateQueries("userCategories");
      handleClose();
    } catch (e) {
      navigate("/error");
    }
  };

  return (
    <ModalCard captionText="Add Category" handleClose={handleClose}>
      <section className="default-modal-section">
        <IncomeSelector isIncome={isIncome} setIsIncome={setIsIncome} />
        <fieldset className="default-modal-fieldset">
          <legend className="default-modal-legend">Title</legend>
          <input className="default-modal-input" ref={categoryNameRef} />
        </fieldset>
        {validationErrors.length > 0 && (
          <ModalFormErrors validationErrors={validationErrors} />
        )}
      </section>
      <ModalFooter
        handleClose={handleClose}
        handleSave={handleCategoryAddition}
      />
    </ModalCard>
  );
};

export default AddCategoryModal;
