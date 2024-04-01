import { useState } from "react";

import SidebarButton from "../../UI/SidebarButton/SidebarButton";
import ObligatoryFormModal from "../../Modals/Obligatory/ObligatoryFormModal/ObligatoryFormModal";
import usePaymentAddition from "../../../hooks/usePaymentAddition";

const AddObligatoryButton = () => {
  const [showModal, setShowModal] = useState(false);
  const { addPayment } = usePaymentAddition("obligatories");

  return (
    <>
      {showModal && (
        <ObligatoryFormModal
          formTitle="Add Obligatory"
          handleClose={() => setShowModal(false)}
          handleForm={addPayment}
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
