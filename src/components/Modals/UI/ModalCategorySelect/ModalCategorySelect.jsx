import Select from "react-select";
import { useStore } from "../../../../store/store";

import "./ModalCategorySelect.css";

const customStyles = {
  control: (provided) => ({
    ...provided,
    border: "none",
    boxShadow: "none",
    outline: "none",
  }),
  multiValue: (base) => ({
    ...base,
    border: "1px solid rgba(55, 55, 55, 0.5)",
    borderRadius: 10,
    padding: "5px",
    fontWeight: "bold",
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: "var(--primaryColor)",
    fontSize: "1rem",
  }),
  multiValueRemove: (base) => ({
    ...base,
    ":after": {
      width: "20px",
      height: "20px",
    },
  }),
};

const ModalCategorySelect = ({
  inputTitle,
  defaultValue = [],
  setSelectState,
}) => {
  const userCategories = useStore((state) => state.userData.categories);

  const selectOptions = userCategories.map((categoryObject) => ({
    value: categoryObject.categoryName,
    label: categoryObject.categoryName,
  }));

  return (
    <fieldset className="default-modal-fieldset select">
      <legend className="default-modal-legend">{inputTitle}</legend>
      {defaultValue.length ? (
        <Select
          styles={customStyles}
          isMulti
          name="colors"
          defaultValue={defaultValue.map((categoryName) => ({
            label: categoryName,
            value: categoryName,
          }))}
          options={selectOptions}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={(choises) => setSelectState(choises)}
        />
      ) : (
        <Select
          styles={customStyles}
          isMulti
          name="colors"
          options={selectOptions}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={(choises) => setSelectState(choises)}
        />
      )}
    </fieldset>
  );
};

export default ModalCategorySelect;
