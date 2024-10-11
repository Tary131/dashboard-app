import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import formattedStudentData from '../../hooks/FormattedStudentData.ts';
import { getClassStudentCounts } from './getClassStudentCounts.tsx';
import { COLORS } from '../../constants/pieChartColors.ts';

const GradePieChart: React.FC = () => {
  const { formattedData, loading, error } = formattedStudentData();
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const data = getClassStudentCounts(formattedData);
  console.log(data);
  return (
    <div className="w-full h-64 md:h-80 lg:h-96">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="students"
            nameKey="className"
            cx="50%"
            cy="50%"
            outerRadius="80%"
            fill="#8884d8"
            label
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GradePieChart;
