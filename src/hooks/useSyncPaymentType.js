import { useEffect } from "react";
import { useStore } from "../store/store";

const useSyncPaymentType = (wantedPaymentType) => {
  const paymentType = useStore((state) => state.paymentType);
  const setPaymentType = useStore((state) => state.setPaymentType);

  useEffect(() => {
    if (paymentType !== wantedPaymentType) {
      setPaymentType(wantedPaymentType);
    }
  }, [paymentType, setPaymentType, wantedPaymentType]);

  return paymentType === wantedPaymentType;
};

export default useSyncPaymentType;
