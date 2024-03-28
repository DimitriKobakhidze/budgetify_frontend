import IncomeFilter from "../../components/IncomeFilter/IncomeFilter";
import CategorySection from "../../components/CategorySection/CategorySection";
import AddCategoryButton from "../../components/SideBar/AddCategoryButton/AddCategoryButton";

const Category = () => {
  return (
    <main className="default-main">
      <CategorySection />
      <aside className="default-aside">
        <IncomeFilter />
        <AddCategoryButton />
      </aside>
    </main>
  );
};

export default Category;
