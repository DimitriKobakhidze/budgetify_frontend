import { useState } from "react";

import SidebarButton from "../../UI/SidebarButton/SidebarButton";
import SubscriptionFormModal from "../../Modals/Subscription/SubscriptionFormModal";
import usePaymentAddition from "../../../hooks/usePaymentAddition";
import { useNavigate } from "react-router";

const AddSubscriptionButton = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const { addPayment } = usePaymentAddition();

  const handleSubscriptionAddition = async (subscriptionData, handleClose) => {
    try {
      await addPayment("subscriptions", subscriptionData, handleClose);
    } catch (e) {
      navigate("/error");
    }
  };

  return (
    <>
      {showModal && (
        <SubscriptionFormModal
          formTitle="Add Subscription"
          handleClose={() => setShowModal(false)}
          handleForm={handleSubscriptionAddition}
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
