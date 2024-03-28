import "./categoriesStatistic.css";
import ModalDatePicker from "../../Modals/UI/ModalDatePicker/ModalDatePicker";
import DefaultModalInput from "../../Modals/UI/DefaultModalInput/DefaultModalInput";
import { getCategoriesStatistics } from "../../../services/apiService";
import Spinner from "../../UI/Spinner/Spinner";
import CategoriesStatisticTable from "./CategoriestStatisticTable";
import CategoriesStatisticBarchart from "./CategoriesStatisticBarchart";
import useStatisticSetup from "../../../hooks/useStatisticSetup";

const CategoriesStatistic = () => {
  const { error, isLoading, statisticData, date, setDate } = useStatisticSetup(
    getCategoriesStatistics,
    "categoriesStatistic"
  );

  if (error) return <h1 className="default-page-error-caption">{error.msg}</h1>;

  return (
    <div className="category-statistics-data-wrapper">
      <div className="category-statistics-table-wrapper">
        <ModalDatePicker
          title="Date range"
          date={date}
          setDate={setDate}
          customClasses="statistic-page"
        />
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="categories-statistics-details-ctn">
            <DefaultModalInput
              inputTitle="Total Expenses"
              defaultValue={`${statisticData.totalExpense?.toFixed(2) || 0}$`}
              inputDisabled={true}
              customClasses="statistic-page"
            />
            <CategoriesStatisticTable statisticData={statisticData} />
          </div>
        )}
      </div>
      {isLoading ? (
        <div className="category-barchart-spinner-wrapper">
          <Spinner />
        </div>
      ) : (
        <CategoriesStatisticBarchart statisticData={statisticData} />
      )}
    </div>
  );
};

export default CategoriesStatistic;
