import { FC } from 'react';
import formattedStudentData from '../../hooks/FormattedStudentData.ts';
import StatisticsChart from './StatisticsChart.tsx';
import { StudentUtility as Student } from '../../types/types';
import { COUNTS } from '../../constants/gradeCounts.ts';
const StudentStatistics: FC = () => {
  const { formattedData, loading, error } = formattedStudentData();

  const countGrades = (data: Student[]) => {
    data.forEach((student) => {
      if (
        student.grade !== undefined &&
        student.grade >= 1 &&
        student.grade <= 5
      ) {
        COUNTS[student.grade] += 1;
      }
    });

    return COUNTS;
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const gradeCounts = countGrades(formattedData);

  return <StatisticsChart gradeCounts={gradeCounts} />;
};

export default StudentStatistics;
