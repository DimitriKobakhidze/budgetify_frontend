import { useState } from "react";

import SidebarButton from "../../UI/SidebarButton/SidebarButton";
import SubscriptionFormModal from "../../Modals/Subscription/SubscriptionFormModal";
import usePaymentAddition from "../../../hooks/usePaymentAddition";

const AddSubscriptionButton = () => {
  const [showModal, setShowModal] = useState(false);
  const { addPayment } = usePaymentAddition("subscriptions");

  return (
    <>
      {showModal && (
        <SubscriptionFormModal
          formTitle="Add Subscription"
          handleClose={() => setShowModal(false)}
          handleForm={addPayment}
        />
      )}
      <SidebarButton
        handleOnclick={() => setShowModal(true)}
        captionText="Add Subscription"
      />
    </>
  );
};

export default AddSubscriptionButton;
