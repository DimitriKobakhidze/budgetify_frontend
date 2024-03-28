import { useQueryClient } from "react-query";
import { useStore } from "../store/store";
import { addUserPayment } from "../services/apiService";
import { useNavigate } from "react-router";

const usePaymentAddition = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const primaryCard = useStore((state) => state.userData.primaryCard);

  const addPayment = async (paymentType, paymentData, handleCloseModal) => {
    try {
      await addUserPayment(primaryCard._id, paymentType, {
        ...paymentData,
        currency: primaryCard.currency,
      });
      handleCloseModal();
      queryClient.invalidateQueries(paymentType);
    } catch (err) {
      navigate("/error");
    }
  };

  return { addPayment };
};

export default usePaymentAddition;
