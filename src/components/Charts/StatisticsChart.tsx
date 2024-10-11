import { FC } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from 'recharts';
import { GradeCounts } from '../../types/types';
import { COLORS } from '../../constants/statisticsChartColors.ts';

type StatisticsChartProps = {
  gradeCounts: GradeCounts;
};

const getColor = (value: number): string => {
  // Choose color based on the range of student count
  const index = Math.min(Math.floor(value), COLORS.length - 1);
  return COLORS[index];
};

const StatisticsChart: FC<StatisticsChartProps> = ({ gradeCounts }) => {
  const data = Object.keys(gradeCounts).map((grade) => ({
    name: grade,
    students: gradeCounts[Number(grade)],
  }));

  return (
    <BarChart width={600} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="students" radius={[8, 8, 0, 0]}>
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={getColor(entry.students)} />
        ))}
      </Bar>
    </BarChart>
  );
};

export default StatisticsChart;
