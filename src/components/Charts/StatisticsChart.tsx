import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

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

const getColor = (value: number) => {
  if (value <= 10) return '#ff4d4d'; // Red
  if (value <= 20) return '#ff6f61'; // Slightly lighter red
  if (value <= 30) return '#ff8c42'; // Orange
  if (value <= 40) return '#ffb74d'; // Light orange
  if (value <= 50) return '#ffee58'; // Yellow
  if (value <= 60) return '#dce775'; // Light green
  if (value <= 70) return '#cddc39'; // Green
  if (value <= 80) return '#8bc34a'; // Darker green
  if (value <= 90) return '#7cb342'; // Even darker green
  return '#388e3c'; // Best green
};

// CustomBar component
const CustomBar = (props: any) => {
  const { x, y, width, height, payload } = props;
  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      fill={getColor(payload.students)}
      rx={8}
      ry={8}
    />
  );
};

const StatisticsChart: React.FC = () => {
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
