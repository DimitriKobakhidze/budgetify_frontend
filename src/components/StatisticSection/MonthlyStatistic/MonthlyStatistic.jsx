import "./monthlyStatistic.css";
import useStatisticSetup from "../../../hooks/useStatisticSetup";
import { getMonthlyStatistics } from "../../../services/apiService";
import ModalDatePicker from "../../Modals/UI/ModalDatePicker/ModalDatePicker";
import MonthlyStatisticTable from "./MonthlyStatisticTable";
import Spinner from "../../UI/Spinner/Spinner";
import MonthlyLineChart from "./MonthlyLineChart";

const MonthlyStatistic = () => {
  const { error, isLoading, statisticData, date, setDate } = useStatisticSetup(
    getMonthlyStatistics,
    "monthlyStatistic",
    4
  );

  if (error) return <h1 className="default-page-error-caption">{error.msg}</h1>;

  return (
    <div className="statistic-monthly-ctn">
      <ModalDatePicker
        title="Date range"
        date={date}
        setDate={setDate}
        customClasses="statistic-page"
      />
      {isLoading ? (
        <Spinner />
      ) : (
        <MonthlyStatisticTable statistic={statisticData} />
      )}
      {isLoading ? <Spinner /> : <MonthlyLineChart statistic={statisticData} />}
    </div>
  );
};

export default MonthlyStatistic;
