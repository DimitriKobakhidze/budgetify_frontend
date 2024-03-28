import { Bar, BarChart, Cell, Label, LabelList, XAxis, YAxis } from "recharts";
import { chartRandomRgbColor } from "../../../utils/utils";

const CategoriesStatisticBarchart = ({ statisticData }) => {
  return (
    <div className="category-statistic-barchart-wrapper">
      <BarChart
        width={342}
        height={400}
        data={statisticData.categoriesData || []}
        barGap={11}
        barCategoryGap={11}
        margin={{ top: 40 }}
      >
        <XAxis tick={false} stroke="rgb(55, 55, 55, 0.5)">
          <Label
            value="Category"
            position="insideBottom"
            content={(props) => (
              <text
                x={props.viewBox.x + props.viewBox.width}
                y={props.viewBox.y + props.viewBox.height - 12}
                textAnchor="end"
                fill="#373737"
              >
                {props.value}
              </text>
            )}
          />
        </XAxis>
        <YAxis stroke="rgb(55, 55, 55, 0.5)" />
        <Bar barSize={30} dataKey="totalAmount">
          {statisticData.categoriesData?.map((entry, index) => (
            <LabelList
              key={`label-${index}`}
              dataKey="category"
              position="top"
              fill="#373737"
              fontSize={12}
            />
          ))}
          {statisticData.categoriesData?.map((entry, index) => (
            <Cell key={`label-${index}`} fill={chartRandomRgbColor()} />
          ))}
        </Bar>
      </BarChart>
    </div>
  );
};

export default CategoriesStatisticBarchart;
