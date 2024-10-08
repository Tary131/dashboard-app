import Card from '../Card.tsx';
import StudentsTable from '../Table/StudentsTable.tsx';
import GradePieChart from '../Charts/GradePieChart.tsx';
import StudentStatistics from '../Charts/StudentStatistics.tsx';
import useStudentAverages from './useStudentAverages.ts';
import { useTranslation } from 'react-i18next'; // Import useTranslation

const Students = () => {
  const { bestStudent, worstStudent } = useStudentAverages();
  const { t } = useTranslation(); // Initialize translation

  return (
    <div className="grid gap-4 p-5 h-full grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
      <Card
        title={t('students.in-class')} // Use translated title
        content={<GradePieChart />}
        className="row-span-2 lg:col-span-2 md:col-span-2 sm:col-span-2"
      />
      <Card
        title={t('students.statistics')} // Use translated title
        content={<StudentStatistics />}
        className="lg:col-span-4 md:col-span-4 sm:col-span-2"
      />
      <Card
        title={t('students.best-student')} // Use translated title
        content={
          bestStudent
            ? `${bestStudent.name} (Avg: ${bestStudent.average.toFixed(2)})`
            : t('students.n-a') // Use translated N/A text
        }
        className="lg:col-span-2 md:col-span-2 sm:col-span-2"
      />
      <Card
        title={t('students.worst-student')} // Use translated title
        content={
          worstStudent
            ? `${worstStudent.name} (Avg: ${worstStudent.average.toFixed(2)})`
            : t('students.n-a') // Use translated N/A text
        }
        className="lg:col-span-2 md:col-span-2 sm:col-span-2"
      />
      <Card
        title={t('students.students-list')} // Use translated title
        content={<StudentsTable />}
        className="lg:col-span-6 md:col-span-4 sm:col-span-2 row-span-2"
      />
    </div>
  );
};

export default Students;
