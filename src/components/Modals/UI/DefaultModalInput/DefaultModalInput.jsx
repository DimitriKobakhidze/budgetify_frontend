import { forwardRef } from "react";

import "./defaultModalInput.css";

const DefaultModalInput = forwardRef(
  (
    {
      inputTitle,
      inputType = "text",
      defaultValue = "",
      inputDisabled = false,
      customClasses = "",
    },
    ref
  ) => {
    return (
      <fieldset className={`default-modal-fieldset ${customClasses}`}>
        <legend className="default-modal-legend">{inputTitle}</legend>
        <input
          type={inputType}
          disabled={inputDisabled}
          className="default-modal-input"
          defaultValue={defaultValue}
          ref={ref}
        />
      </fieldset>
    );
  }
);

export default DefaultModalInput;
