import { FC } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

// Sample data
const data = [
  { month: 'Jan', avgGrade: 75 },
  { month: 'Feb', avgGrade: 80 },
  { month: 'Mar', avgGrade: 85 },
  { month: 'Apr', avgGrade: 90 },
  { month: 'May', avgGrade: 95 },
  { month: 'Jun', avgGrade: 88 },
  { month: 'Jul', avgGrade: 82 },
  { month: 'Aug', avgGrade: 80 },
  { month: 'Sep', avgGrade: 85 },
  { month: 'Oct', avgGrade: 90 },
  { month: 'Nov', avgGrade: 92 },
  { month: 'Dec', avgGrade: 94 },
];

const AverageGradesChart: FC = () => (
  <LineChart width={600} height={300} data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="month" />
    <YAxis />
    <Tooltip />
    <Line type="monotone" dataKey="avgGrade" stroke="#8884d8" />
  </LineChart>
);

export default AverageGradesChart;
