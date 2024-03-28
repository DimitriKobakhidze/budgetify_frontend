import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import "./monthlyLineChart.css";

const MonthlyLineChart = ({ statistic }) => {
  return (
    <div className="monthly-chart-wrapper">
      <LineChart
        width={700}
        height={390}
        data={statistic?.monthlyData || []}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <Legend
          className="test-class"
          layout="vertical"
          verticalAlign="top"
          align="right"
          wrapperStyle={{
            right: 0,
          }}
        />
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Line
          type="linear"
          dataKey="income"
          stroke="#21C206"
          strokeWidth={3}
          activeDot={{ r: 8 }}
          dot={{ fill: "#21C206" }}
        />
        <Line
          type="linear"
          dataKey="expense"
          stroke="#EE3F19"
          strokeWidth={3}
          activeDot={{ r: 8 }}
          dot={{ fill: "#EE3F19" }}
        />
        <Line
          type="linear"
          dataKey="economy"
          stroke="#6200EE"
          strokeWidth={3}
          activeDot={{ r: 8 }}
          dot={{ fill: "#6200EE" }}
        />
      </LineChart>
    </div>
  );
};

export default MonthlyLineChart;
