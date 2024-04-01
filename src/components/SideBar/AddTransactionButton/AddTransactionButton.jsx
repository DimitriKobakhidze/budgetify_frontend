import { useState } from "react";

import SidebarButton from "../../UI/SidebarButton/SidebarButton";
import TransactionFormModal from "../../Modals/Transaction/TransactionFormModal/TransactionFormModal";
import usePaymentAddition from "../../../hooks/usePaymentAddition";

const AddTransactionButton = () => {
  const [showModal, setShowModal] = useState(false);
  const { addPayment } = usePaymentAddition("transactions");

  return (
    <>
      {showModal && (
        <TransactionFormModal
          formTitle="Add Transaction"
          handleClose={() => setShowModal(false)}
          handleForm={addPayment}
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
