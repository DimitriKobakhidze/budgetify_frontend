import { useSearchParams } from "react-router-dom";
import SidebarButton from "../UI/SidebarButton/SidebarButton";

const IncomeFilter = () => {
  const [, setSearchParams] = useSearchParams();

  const changeIcnomeSort = (value) => {
    setSearchParams((prevParams) => {
      prevParams.set("sortByIncome", value);
      return prevParams;
    });
  };

  return (
    <>
      <SidebarButton
        handleOnclick={() => changeIcnomeSort("income")}
        captionText="Income"
        iconSrc="/income-icon.png"
        customClasses="bg-white"
      />
      <SidebarButton
        handleOnclick={() => changeIcnomeSort("expenses")}
        captionText="Expenses"
        iconSrc="/expense-icon.png"
        customClasses="bg-white"
      />
    </>
  );
};

export default IncomeFilter;
