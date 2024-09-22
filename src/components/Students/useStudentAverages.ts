import { useMemo } from 'react';
import useFormattedStudentData from '../Table/FormattedStudentData.tsx';

const useStudentAverages = () => {
  const { formattedData } = useFormattedStudentData();

  const { bestStudent, worstStudent } = useMemo(() => {
    const studentAverages: Record<string, { total: number; count: number }> =
      {};

    formattedData.forEach(({ name, grade }) => {
      if (grade !== undefined) {
        if (!studentAverages[name]) {
          studentAverages[name] = { total: 0, count: 0 };
        }
        studentAverages[name].total += grade;
        studentAverages[name].count += 1;
      }
    });

    const averages = Object.entries(studentAverages).map(
      ([name, { total, count }]) => ({
        name,
        average: count ? total / count : 0,
      })
    );

    const bestStudent = averages.reduce(
      (prev, curr) => (prev.average > curr.average ? prev : curr),
      averages[0]
    );
    const worstStudent = averages.reduce(
      (prev, curr) => (prev.average < curr.average ? prev : curr),
      averages[0]
    );

    return { bestStudent, worstStudent };
  }, [formattedData]);
  return { bestStudent, worstStudent };
};

export default useStudentAverages;
