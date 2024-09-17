import { FC } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface CustomBarProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  fill?: string;
  payload?: { students: number };
}
// Sample data
const data = [
  { name: '0-10', students: 40 },
  { name: '11-20', students: 30 },
  { name: '21-30', students: 20 },
  { name: '31-40', students: 80 },
  { name: '41-50', students: 190 },
  { name: '51-60', students: 239 },
  { name: '61-70', students: 249 },
  { name: '71-80', students: 149 },
  { name: '81-90', students: 99 },
  { name: '91-100', students: 91 },
];

const getColor = (value: number): string => {
  const colors = [
    '#ff4d4d', // Red
    '#ff6f61', // Slightly lighter red
    '#ff8c42', // Orange
    '#ffb74d', // Light orange
    '#ffee58', // Yellow
    '#dce775', // Light green
    '#cddc39', // Green
    '#8bc34a', // Darker green
    '#7cb342', // Even darker green
    '#388e3c', // Best green
  ];

  const index = Math.min(Math.floor(value / 10), colors.length - 1);

  return colors[index];
};

// CustomBar component
const CustomBar: FC<CustomBarProps> = (props) => {
  const { x, y, width, height, payload } = props;
  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      fill={getColor(payload?.students || 0)}
      rx={8}
      ry={8}
    />
  );
};

const StatisticsChart: FC = () => {
  return (
    <BarChart width={600} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="students" shape={<CustomBar />} />
    </BarChart>
  );
};

export default StatisticsChart;
