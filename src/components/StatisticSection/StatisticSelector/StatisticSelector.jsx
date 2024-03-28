import "./statisticSelector.css";

const StatisticSelector = ({ activeSelector, setActiveSelector }) => {
  return (
    <div className="statistic-selector-ctn">
      <div
        className={`statistic-selector ${
          activeSelector === "categories" ? "active" : ""
        }`}
        onClick={() => setActiveSelector("categories")}
      >
        Categories Statistic
      </div>
      <div
        className={`statistic-selector ${
          activeSelector === "monthly" ? "active" : ""
        }`}
        onClick={() => setActiveSelector("monthly")}
      >
        Monthly Statistics
      </div>
    </div>
  );
};

export default StatisticSelector;
