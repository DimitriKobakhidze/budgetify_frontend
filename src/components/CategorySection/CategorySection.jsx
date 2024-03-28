import { useQuery } from "react-query";
import SearchBar from "../UI/SearchBar/SearchBar";
import CategorySectionItem from "./CategorySectionItem/CategorySectionItem";

import "./categorySection.css";
import { getUserCategories } from "../../services/apiService";
import Spinner from "../UI/Spinner/Spinner";
import { useSearchParams } from "react-router-dom";

const CategorySection = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortByIncome = searchParams.get("sortByIncome");
  const searchByCategoryName = searchParams.get("searchByCategoryName");

  const {
    isLoading,
    data: responseObject,
    error,
  } = useQuery({
    queryKey: ["userCategories", sortByIncome, searchByCategoryName],
    queryFn: () => getUserCategories(sortByIncome, searchByCategoryName),
  });

  const handleCategorySearch = (inputCategoryName) => {
    setSearchParams((prevParams) => {
      prevParams.set("searchByCategoryName", inputCategoryName);
      return prevParams;
    });
  };

  if (isLoading) return <Spinner />;

  if (error)
    return (
      <h1 className="default-page-error-caption">
        {error.response.data.msg || "Something went wrong, try later"}
      </h1>
    );

  if (responseObject.status === 204)
    return (
      <h1 className="default-page-error-caption">
        You have not added any categories yet
      </h1>
    );

  return (
    <section className="category-section">
      <SearchBar
        handleSearch={handleCategorySearch}
        defaultValue={searchByCategoryName}
      />
      <div className="categories-container">
        {responseObject.data.length ? (
          responseObject.data.map((categoryObject) => (
            <CategorySectionItem
              key={categoryObject._id}
              categoryData={categoryObject}
            />
          ))
        ) : (
          <h1 className="default-page-error-caption">Nothing found</h1>
        )}
      </div>
    </section>
  );
};

export default CategorySection;
