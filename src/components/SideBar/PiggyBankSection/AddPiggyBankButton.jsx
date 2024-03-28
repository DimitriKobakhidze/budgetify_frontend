import { useRef, useState } from "react";

import PiggyBankFormModal from "../../Modals/PiggyBank/PiggyBankFormModal";
import SideBarButton from "../../UI/SidebarButton/SidebarButton";
import { addPiggyBank } from "../../../services/apiService";
import AlertModal from "../../Modals/Alert/AlertModal";
import { useQueryClient } from "react-query";
import useHandleError from "../../../hooks/useHandleError";

const AddPiggyBankButton = () => {
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const { errorMessage, errorModalRef, handleError } = useHandleError();

  const handlePiggyBankAddition = async (piggyData) => {
    try {
      await addPiggyBank(piggyData);
      queryClient.invalidateQueries("piggyBanks");
      setShowModal(false);
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <>
      {showModal && (
        <PiggyBankFormModal
          formTitle="Add Piggy Bank"
          handleClose={() => setShowModal(false)}
          handleForm={handlePiggyBankAddition}
        />
      )}
      <AlertModal alertParagraph={errorMessage} ref={errorModalRef} />
      <SideBarButton
        handleOnclick={() => setShowModal(true)}
        iconSrc="/piggy-bank-icon.png"
        captionText="Add Piggy Bank"
      />
    </>
  );
};

export default AddPiggyBankButton;
