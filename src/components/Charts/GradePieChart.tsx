import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

// Sample data for the pie chart
const data = [
  { className: 'A1', students: 200 },
  { className: 'B2', students: 150 },
  { className: 'C1', students: 180 },
  { className: 'D3', students: 120 },
  { className: 'E4', students: 250 },
];

const COLORS = ['#ff4d4d', '#ff6f61', '#ff8c42', '#ffb74d', '#ffee58'];

const GradePieChart: React.FC = () => {
  return (
    <PieChart width={600} height={300}>
      <Pie
        data={data}
        dataKey="students"
        nameKey="className"
        cx="50%"
        cy="50%"
        outerRadius={100}
        fill="#8884d8"
        label
      >
        {data.map((_, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default GradePieChart;
