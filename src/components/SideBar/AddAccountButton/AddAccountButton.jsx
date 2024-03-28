import { useState } from "react";
import { useNavigate } from "react-router";

import SidebarButton from "../../UI/SidebarButton/SidebarButton";
import AccountFormModal from "../../Modals/Account/AccountFormModal";
import { useStore } from "../../../store/store";
import { addUserCard } from "../../../services/apiService";

const AddAccountButton = () => {
  const navigate = useNavigate();
  const [showFormModal, setShowFormModal] = useState(false);

  const handleAddAccount = async (account, handleClose) => {
    try {
      await addUserCard(account);
      await useStore.getState().refetchUserCards();
      handleClose();
    } catch (err) {
      navigate("/error");
    }
  };

  return (
    <>
      {showFormModal && (
        <AccountFormModal
          formTitle="Add Account"
          handleClose={() => setShowFormModal(false)}
          handleForm={handleAddAccount}
        />
      )}
      <SidebarButton
        handleOnclick={() => setShowFormModal(true)}
        captionText="Add Account"
      />
    </>
  );
};

export default AddAccountButton;
