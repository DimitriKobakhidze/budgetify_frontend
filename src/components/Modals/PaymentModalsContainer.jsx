import { useQueryClient } from "react-query";

import { editUserPayment } from "../../services/apiService";
import { useStore } from "../../store/store";
import SubscriptionViewModal from "./Subscription/SubscriptionViewModal";
import TransactionViewModal from "./Transaction/TransactionViewModal/TransactionViewModal";
import ObligatoryViewModal from "./Obligatory/ObligatoryViewModal";
import TransactionFormModal from "./Transaction/TransactionFormModal/TransactionFormModal";
import SubscriptionFormModal from "./Subscription/SubscriptionFormModal";
import ObligatoryFormModal from "./Obligatory/ObligatoryFormModal/ObligatoryFormModal";
import { useNavigate } from "react-router";

const PaymentModalsContainer = ({
  paymentType,
  paymentActivityData,
  showViewModal,
  setShowViewModal,
  showEditModal,
  setShowEditModal,
}) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  if (!showViewModal && !showEditModal) return null;

  const closeViewModal = () => setShowViewModal(false);
  const closeEditModal = () => setShowEditModal(false);

  const openEditForm = () => {
    setShowViewModal(false);
    setShowEditModal(true);
  };

  const handlePaymentEdit = async (paymentData, handleClose) => {
    const primaryCard = useStore.getState().userData.primaryCard;
    try {
      await editUserPayment(primaryCard._id, paymentType, {
        ...paymentData,
        _id: paymentActivityData._id,
        currency: primaryCard.currency,
      });
      handleClose();
      queryClient.invalidateQueries(paymentType);
    } catch (e) {
      navigate("/error");
    }
  };

  const viewModalsObject = {
    transactions: (
      <TransactionViewModal
        transasctionData={paymentActivityData}
        handleEdit={openEditForm}
        handleClose={closeViewModal}
      />
    ),
    subscriptions: (
      <SubscriptionViewModal
        subscriptionData={paymentActivityData}
        handleEdit={openEditForm}
        handleClose={closeViewModal}
      />
    ),
    obligatories: (
      <ObligatoryViewModal
        obligatoryData={paymentActivityData}
        handleEdit={openEditForm}
        handleClose={closeViewModal}
      />
    ),
  };

  const editModalsObject = {
    transactions: (
      <TransactionFormModal
        formTitle="Edit Transaction"
        formData={paymentActivityData}
        handleClose={closeEditModal}
        handleForm={handlePaymentEdit}
      />
    ),
    subscriptions: (
      <SubscriptionFormModal
        formTitle="Edit Subscription"
        formData={paymentActivityData}
        handleClose={closeEditModal}
        handleForm={handlePaymentEdit}
      />
    ),
    obligatories: (
      <ObligatoryFormModal
        formTitle="Edit Obligatory"
        formData={paymentActivityData}
        handleClose={closeEditModal}
        handleForm={handlePaymentEdit}
      />
    ),
  };

  if (!Object.keys(viewModalsObject).includes(paymentType))
    throw new Error("Modal on that payment type does not exist");

  if (showViewModal) {
    return viewModalsObject[paymentType];
  } else if (showEditModal) {
    return editModalsObject[paymentType];
  }
};

export default PaymentModalsContainer;
