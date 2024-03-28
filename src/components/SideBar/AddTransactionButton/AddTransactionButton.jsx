import { useState } from "react";

import SidebarButton from "../../UI/SidebarButton/SidebarButton";
import TransactionFormModal from "../../Modals/Transaction/TransactionFormModal/TransactionFormModal";
import usePaymentAddition from "../../../hooks/usePaymentAddition";
import { useNavigate } from "react-router";

const AddTransactionButton = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const { addPayment } = usePaymentAddition();

  const handleTransactionAddition = async (transactionData, handleClose) => {
    try {
      await addPayment("transactions", transactionData, handleClose);
    } catch (e) {
      navigate("/error");
    }
  };

  return (
    <>
      {showModal && (
        <TransactionFormModal
          formTitle="Add Transaction"
          handleClose={() => setShowModal(false)}
          handleForm={handleTransactionAddition}
        />
      )}
      <SidebarButton
        handleOnclick={() => setShowModal(true)}
        captionText="Add Transaction"
      />
    </>
  );
};

export default AddTransactionButton;
