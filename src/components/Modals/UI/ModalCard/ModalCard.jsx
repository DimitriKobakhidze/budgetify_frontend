import "./modalCard.css";

const ModalCard = ({
  children,
  captionText,
  handleEdit,
  handleDelete,
  handleClose,
  handleAddToPiggy,
}) => {
  return (
    <div className="default-modal-bg">
      <div className="default-modal-wrapper">
        <header className="default-modal-header">
          {captionText}
          <div className="view-modal-icons-ctn">
            {handleEdit && (
              <img src="/edit-icon.png" alt="edit" onClick={handleEdit} />
            )}
            {handleDelete && (
              <img src="/delete-icon.png" alt="delete" onClick={handleDelete} />
            )}
            {handleAddToPiggy && (
              <img
                className="piggy-modal-add-icon"
                src="/piggy-add-icon.png"
                alt="add to piggy"
                onClick={handleAddToPiggy}
              />
            )}
            <img src="/close-icon.png" alt="close" onClick={handleClose} />
          </div>
        </header>
        {children}
      </div>
    </div>
  );
};

export default ModalCard;
