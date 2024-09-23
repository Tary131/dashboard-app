import { FC } from 'react';
import useFormattedStudentData from '../Table/FormattedStudentData.tsx';
import SubjectCard from './SubjectCard';

const SubjectDashboard: FC = () => {
  const { formattedData, loading, error } = useFormattedStudentData();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Process data to calculate number of students per subject and average grade
  const subjectsSummary = formattedData.reduce(
    (acc, student) => {
      if (!student.subject) return acc;

      const subject = acc[student.subject] || {
        totalStudents: 0,
        totalGrade: 0,
        avgGrade: 0,
      };

      acc[student.subject] = {
        totalStudents: subject.totalStudents + 1,
        totalGrade: subject.totalGrade + (student.grade || 0),
        avgGrade: 0, // We'll calculate this after the loop
      };

      return acc;
    },
    {} as Record<
      string,
      { totalStudents: number; totalGrade: number; avgGrade: number }
    >
  );

  // Calculate the average grade for each subject
  Object.keys(subjectsSummary).forEach((subject) => {
    const summary = subjectsSummary[subject];
    summary.avgGrade =
      summary.totalStudents > 0
        ? summary.totalGrade / summary.totalStudents
        : 0;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Object.keys(subjectsSummary).map((subjectName) => (
        <SubjectCard
          key={subjectName}
          subject={subjectName}
          students={subjectsSummary[subjectName].totalStudents}
          avgGrade={subjectsSummary[subjectName].avgGrade}
        />
      ))}
    </div>
  );
};

export default SubjectDashboard;
