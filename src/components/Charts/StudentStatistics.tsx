import { FC } from 'react';
import useFormattedStudentData from '../Table/FormattedStudentData.tsx';
import StatisticsChart from './StatisticsChart.tsx';
import { Student } from '../Table/FormattedStudentData.tsx';
export interface GradeCounts {
  [key: number]: number;
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
}
const StudentStatistics: FC = () => {
  const { formattedData, loading, error } = useFormattedStudentData();

  const countGrades = (data: Student[]) => {
    const counts: GradeCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

    data.forEach((student) => {
      if (
        student.grade !== undefined &&
        student.grade >= 1 &&
        student.grade <= 5
      ) {
        counts[student.grade] += 1;
      }
    });

    return counts;
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const gradeCounts = countGrades(formattedData);

  return <StatisticsChart gradeCounts={gradeCounts} />;
};

export default StudentStatistics;
