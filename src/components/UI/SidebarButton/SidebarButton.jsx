import "./sidebarButton.css";

const SidebarButton = ({
  handleOnclick,
  captionText,
  customElement,
  iconSrc = "plus-icon.png",
  customClasses = "",
}) => {
  return (
    <div
      className={`sidebar-button-ctn ${customClasses}`}
      onClick={handleOnclick}
    >
      <img src={iconSrc} alt="sidebar-icon" />
      {captionText || customElement}
    </div>
  );
};

export default SidebarButton;
