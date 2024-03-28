import { useState } from "react";

import { userCategoriesToSelectOptions } from "../utils/utils";
import { useRef } from "react";

const usePaymentFormSetup = (formData) => {
  const [isIncome, setIsIncome] = useState(formData.isIncome || false);
  const [selectedCategories, setSelectedCategories] = useState(
    formData.categories
      ? userCategoriesToSelectOptions(formData.categories)
      : []
  );
  const titleRef = useRef();
  const amountRef = useRef();
  const paymentDateRef = useRef();
  const payeeRef = useRef();
  const descriptionRef = useRef();

  return {
    isIncome,
    setIsIncome,
    selectedCategories,
    setSelectedCategories,
    titleRef,
    amountRef,
    paymentDateRef,
    payeeRef,
    descriptionRef,
  };
};

export default usePaymentFormSetup;
