import Select from "react-select";
import { currencyOptions } from "../../../../utils/utils";

const customStyles = {
  control: (provided) => ({
    ...provided,
    border: "none",
    boxShadow: "none",
    outline: "none",
  }),
};

const AccountSelectInput = ({ formData, setSelectState }) => {
  return (
    <fieldset className="default-modal-fieldset select">
      <legend className="default-modal-legend">Currency</legend>
      <Select
        styles={customStyles}
        name="colors"
        defaultValue={
          formData.currency
            ? {
                label: `${formData.currency.name} [${formData.currency.symbol}]`,
                value: {
                  name: formData.currency.name,
                  symbol: formData.currency.symbol,
                },
              }
            : currencyOptions[0]
        }
        options={currencyOptions}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={(choise) => setSelectState(choise)}
      />
    </fieldset>
  );
};

export default AccountSelectInput;
