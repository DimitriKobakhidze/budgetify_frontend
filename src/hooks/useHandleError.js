import { useRef, useState } from "react";

const useHandleError = () => {
  const errorModalRef = useRef();
  const [errorMessage, setErrorMessage] = useState();

  const handleError = (err) => {
    setErrorMessage(err.response.data.msg);
    errorModalRef.current.showModal();
  };

  return { errorModalRef, errorMessage, handleError };
};

export default useHandleError;
