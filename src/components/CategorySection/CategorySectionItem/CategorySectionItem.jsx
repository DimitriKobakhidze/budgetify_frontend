import { useRef, useState, useEffect } from "react";

import "./categorySectionItem.css";
import { deleteCategory, updateCategory } from "../../../services/apiService";
import { useQueryClient } from "react-query";

const CategorySectionItem = ({ categoryData }) => {
  const queryClient = useQueryClient();
  const [error, setError] = useState();
  const [inputDisabled, setInputDisabled] = useState(true);
  const inputRef = useRef();

  useEffect(() => {
    if (!inputDisabled) {
      inputRef.current.focus();
    }
  }, [inputDisabled]);

  const handleCategoryEdit = async () => {
    if (!(inputRef.current.value === categoryData.categoryName)) {
      try {
        await updateCategory(categoryData.categoryName, inputRef.current.value);
        queryClient.invalidateQueries("userCategories");
      } catch (err) {
        setError(err.msg);
      }
    }

    setInputDisabled(true);
  };

  const handleCategoryDelete = async () => {
    try {
      await deleteCategory(categoryData._id);
      queryClient.invalidateQueries("userCategories");
    } catch (err) {
      setError(err.msg);
    }
  };

  if (error) return <h1 className="default-page-error-caption">{error}</h1>;

  return (
    <div
      className={
        categoryData.isIncome ? "category-item income" : "category-item expense"
      }
      key={categoryData.categoryName}
    >
      <input
        className={`category-item-input ${inputDisabled ? "" : "active"}`}
        disabled={inputDisabled}
        ref={inputRef}
        defaultValue={categoryData.categoryName}
      />
      <div className="category-item-controls">
        {inputDisabled ? (
          <img
            src="/edit-icon.png"
            alt="edit"
            onClick={() => {
              inputRef.current.focus();
              setInputDisabled(false);
            }}
          />
        ) : (
          <img
            src="/checkmark-icon.png"
            alt="edit"
            onClick={handleCategoryEdit}
          />
        )}
        <img
          src="/delete-icon.png"
          alt="delete"
          onClick={handleCategoryDelete}
        />
      </div>
    </div>
  );
};

export default CategorySectionItem;
