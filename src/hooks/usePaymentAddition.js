import { useQueryClient } from "react-query";
import { useStore } from "../store/store";
import { addUserPayment } from "../services/apiService";
import { useNavigate } from "react-router";

const usePaymentAddition = (paymentType) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const primaryCard = useStore((state) => state.userData.primaryCard);

  const addPayment = async (paymentData, handleCloseModal) => {
    try {
      await addUserPayment(primaryCard._id, paymentType, {
        ...paymentData,
        currency: primaryCard.currency,
      });
      await useStore.getState().refetchUserCards();
      queryClient.invalidateQueries(paymentType);
      handleCloseModal();
    } catch (err) {
      navigate("/error");
    }
  };

  return { addPayment };
};

export default usePaymentAddition;
