import "./modalCategories.css";

const ModalCategories = ({ categories }) => {
  return (
    <div className="modal-categories">
      {categories.map((categoryName) => (
        <div key={categoryName} className="modal-category-item">
          {categoryName}
        </div>
      ))}
    </div>
  );
};

export default ModalCategories;
