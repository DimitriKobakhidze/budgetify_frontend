import { useState } from "react";

import SidebarButton from "../../UI/SidebarButton/SidebarButton";
import ObligatoryFormModal from "../../Modals/Obligatory/ObligatoryFormModal/ObligatoryFormModal";
import usePaymentAddition from "../../../hooks/usePaymentAddition";
import { useNavigate } from "react-router";

const AddObligatoryButton = () => {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const { addPayment } = usePaymentAddition();

  const handleObligatoryAddition = async (obligatoryData, handleClose) => {
    try {
      await addPayment("obligatories", obligatoryData, handleClose);
    } catch (e) {
      navigate("/error");
    }
  };

  return (
    <>
      {showModal && (
        <ObligatoryFormModal
          formTitle="Add Obligatory"
          handleClose={() => setShowModal(false)}
          handleForm={handleObligatoryAddition}
        />
      )}
      <SidebarButton
        handleOnclick={() => setShowModal(true)}
        captionText="Add Obligatory"
      />
    </>
  );
};

export default AddObligatoryButton;
