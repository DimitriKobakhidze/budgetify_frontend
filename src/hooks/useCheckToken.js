import { useEffect, useState } from "react";

import { useStore } from "../store/store";
import { verifyAuthToken } from "../services/apiService";

const useCheckToken = () => {
  const updateUserData = useStore((state) => state.updateUserData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const userData = await verifyAuthToken();
        updateUserData(userData);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };

    checkToken();
  }, [updateUserData]);

  return { isLoading };
};

export default useCheckToken;
