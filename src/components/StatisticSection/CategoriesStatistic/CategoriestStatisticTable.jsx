import { calculatePercentage } from "../../../utils/utils";

const CategoriesStatisticTable = ({ statisticData }) => {
  return (
    <table className="default-statistic-table">
      <thead>
        <tr>
          <th className="default-statistic-table-title-th">Category</th>
          <th>Amount</th>
          <th>% in total</th>
        </tr>
      </thead>
      <tbody>
        {statisticData.categoriesData?.map((c) => (
          <tr key={c.category}>
            <td>{c.category}</td>
            <td>{c.totalAmount.toFixed(2)} $</td>
            <td>
              {calculatePercentage(
                c.totalAmount,
                statisticData.totalExpense
              ).toFixed(2)}
              %
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CategoriesStatisticTable;
