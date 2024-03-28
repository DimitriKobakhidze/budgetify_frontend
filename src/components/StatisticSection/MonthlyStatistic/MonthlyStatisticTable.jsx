import "./monthlyStatisticTable.css";
import { calculatePercentage } from "../../../utils/utils";

const tableHead = (
  <thead>
    <tr>
      <th className="default-statistic-table-title-th">Month</th>
      <th>Income</th>
      <th>Expense</th>
      <th>Economy</th>
      <th>% of economy</th>
    </tr>
  </thead>
);

const MonthlyStatisticTable = ({ statistic }) => {
  if (!statistic || !statistic.monthlyData)
    return <table className="default-statistic-table">{tableHead}</table>;

  return (
    <table className="default-statistic-table">
      {tableHead}
      <tbody>
        {statistic.monthlyData?.map((c) => (
          <tr key={`${c.month}-${c.year}`}>
            <td>
              {c.month} {c.year}
            </td>
            <td>{c.income.toFixed(2)} $</td>
            <td>{c.expense.toFixed(2)} $</td>
            <td className={c.economy >= 0 ? "positive" : "negative"}>
              {c.economy.toFixed(2)} $
            </td>
            <td className={c.economy >= 0 ? "positive" : "negative"}>
              {calculatePercentage(c.economy, statistic.totalEconomy).toFixed(
                2
              )}
              %
            </td>
          </tr>
        ))}
        <tr>
          <td className="bold-td">Total</td>
          <td>{statistic.totalIncome.toFixed(2)} $</td>
          <td>{statistic.totalExpense.toFixed(2)} $</td>
          <td className={statistic.economySum >= 0 ? "positive" : "negative"}>
            {statistic.economySum.toFixed(2)} $
          </td>
        </tr>
        <tr>
          <td className="bold-td">Average</td>
          <td>{statistic.avgIncome.toFixed(2)} $</td>
          <td>{statistic.avgExpense.toFixed(2)} $</td>
          <td className={statistic.avgEconomy >= 0 ? "positive" : "negative"}>
            {statistic.avgEconomy.toFixed(2)} $
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default MonthlyStatisticTable;
