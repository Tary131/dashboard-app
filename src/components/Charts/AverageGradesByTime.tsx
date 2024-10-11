import { useMemo } from 'react';
import formattedStudentData from '../../hooks/FormattedStudentData.ts';
import AverageGradesChart from './AverageGradesChart';

const AverageGradesByTime = () => {
  const { formattedData, loading, error } = formattedStudentData();

  const { weeklyData } = useMemo(() => {
    if (!formattedData.length)
      return {
        weeklyData: [],
      };

    const weekMap: { total: number; count: number }[] = new Array(5)
      .fill(null)
      .map(() => ({ total: 0, count: 0 }));

    formattedData.forEach(({ grade, date }) => {
      if (!grade) return;

      const dateObj = new Date(date);
      const weekIndex = Math.floor(dateObj.getDate() / 7);

      if (weekIndex < weekMap.length) {
        weekMap[weekIndex].total += grade;
        weekMap[weekIndex].count += 1;
      }
    });

    const weeklyData = weekMap.map((data, index) => ({
      week: `Week ${index + 1}`,
      avgGrade: data.count ? data.total / data.count : 0,
    }));

    return { weeklyData };
  }, [formattedData]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <div>
      <AverageGradesChart weeklyData={weeklyData} />
    </div>
  );
};

export default AverageGradesByTime;
