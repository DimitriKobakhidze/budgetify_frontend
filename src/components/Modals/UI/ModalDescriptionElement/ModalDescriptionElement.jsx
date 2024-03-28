import "./modalDescriptionElement.css";

const ModalDescriptionElement = ({ captionText, descriptionText }) => {
  return (
    <div className="modal-description-element">
      <span className="modal-description-element-caption">{captionText}:</span>
      <span className="modal-description-element-description">
        {descriptionText}
      </span>
    </div>
  );
};

export default ModalDescriptionElement;
