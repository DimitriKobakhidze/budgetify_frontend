import { useState } from "react";

import AddCategoryModal from "../../Modals/Category/AddCategoryModal";
import SidebarButton from "../../UI/SidebarButton/SidebarButton";

const AddCategoryButton = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      {showModal && (
        <AddCategoryModal handleClose={() => setShowModal(false)} />
      )}
      <SidebarButton
        handleOnclick={() => setShowModal(true)}
        captionText="Add Category"
      />
    </>
  );
};

export default AddCategoryButton;
