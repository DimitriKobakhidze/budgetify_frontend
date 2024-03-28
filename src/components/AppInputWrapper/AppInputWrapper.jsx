import classes from "./appInputWrapper.module.css";

const AppInputField = ({ children, error, captionText, showCaption }) => {
  const getWrapperClasses = () => {
    if (error) return `${classes["input-wrapper"]} ${classes["errored-input"]}`;
    return classes["input-wrapper"];
  };

  return (
    <div className={getWrapperClasses()}>
      {showCaption && (
        <span className={`${classes["input-caption"]}`}>{captionText}</span>
      )}
      {children}
    </div>
  );
};

export default AppInputField;
