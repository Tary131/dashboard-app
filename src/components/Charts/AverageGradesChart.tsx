import { FC } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';

interface WeeklyChartData {
  week: string;
  avgGrade: number;
}

interface AverageGradesChartProps {
  weeklyData: WeeklyChartData[];
}

const AverageGradesChart: FC<AverageGradesChartProps> = ({ weeklyData }) => (
  <LineChart
    width={800}
    height={400}
    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
  >
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="week" />
    <YAxis />
    <Tooltip />
    <Legend />

    {/* Weekly average grades */}
    <Line
      type="monotone"
      dataKey="avgGrade"
      data={weeklyData}
      name="Weekly Avg"
      stroke="#82ca9d"
    />
  </LineChart>
);

export default AverageGradesChart;
