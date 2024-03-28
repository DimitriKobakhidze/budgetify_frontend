import { useState } from "react";
import CategoriesStatistic from "./CategoriesStatistic/CategoriesStatistic";
import StatisticSelector from "./StatisticSelector/StatisticSelector";
import MonthlyStatistic from "./MonthlyStatistic/MonthlyStatistic";

const StatisticSection = () => {
  const [activeSelector, setActiveSelector] = useState("categories");
  return (
    <section>
      <StatisticSelector
        activeSelector={activeSelector}
        setActiveSelector={setActiveSelector}
      />
      {activeSelector === "categories" && <CategoriesStatistic />}
      {activeSelector === "monthly" && <MonthlyStatistic />}
    </section>
  );
};

export default StatisticSection;
