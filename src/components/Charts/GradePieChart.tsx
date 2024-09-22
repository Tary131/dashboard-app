import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import useFormattedStudentData from '../Table/FormattedStudentData.tsx'; // Ensure correct path to the hook
import { getClassStudentCounts } from './getClassStudentCounts.tsx';

const COLORS = ['#8e44ad', '#16a085', '#f1c40f', '#a93226', '#2471a3'];

const GradePieChart: React.FC = () => {
  const { formattedData, loading, error } = useFormattedStudentData();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const data = getClassStudentCounts(formattedData);

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
