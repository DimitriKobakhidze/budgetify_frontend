import { useRef } from "react";
import { useQueryClient } from "react-query";
import { useStore } from "../store/store";
import { deleteUserPayment } from "../services/apiService";
import { useNavigate } from "react-router";

const usePaymentDelete = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const primaryCard = useStore((state) => state.userData.primaryCard);
  const dialogRef = useRef();

  const handleDeletePayment = async (paymentType, paymentId) => {
    try {
      await deleteUserPayment(primaryCard._id, paymentType, paymentId);
      queryClient.invalidateQueries(paymentType);
    } catch (err) {
      navigate("/error");
    }
  };

  return { dialogRef, handleDeletePayment };
};

export default usePaymentDelete;
