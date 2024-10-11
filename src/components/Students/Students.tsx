import Card from '../Card';
import StudentsTable from '../Table/StudentsTable';
import GradePieChart from '../Charts/GradePieChart';
import StudentStatistics from '../Charts/StudentStatistics';
import useStudentAverages from './useStudentAverages';
import { useTranslation } from 'react-i18next';

const Students = () => {
  const { bestStudent, worstStudent } = useStudentAverages();
  const { t } = useTranslation();

  return (
    <div className="grid gap-4 p-5 h-full grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
      <Card
        title={t('students.in-class')}
        content={<GradePieChart />}
        className="row-span-2 lg:col-span-2 md:col-span-2 sm:col-span-2"
      />
      <Card
        title={t('students.statistics')}
        content={<StudentStatistics />}
        className="lg:col-span-4 md:col-span-4 sm:col-span-2"
      />
      <Card
        title={t('students.best-student')}
        content={
          bestStudent
            ? `${bestStudent.name} (Avg: ${bestStudent.average.toFixed(2)})`
            : t('students.n-a')
        }
        className="lg:col-span-2 md:col-span-2 sm:col-span-2"
      />
      <Card
        title={t('students.worst-student')}
        content={
          worstStudent
            ? `${worstStudent.name} (Avg: ${worstStudent.average.toFixed(2)})`
            : t('students.n-a')
        }
        className="lg:col-span-2 md:col-span-2 sm:col-span-2"
      />
      <Card
        title={t('students.students-list')}
        content={<StudentsTable />}
        className="lg:col-span-6 md:col-span-4 sm:col-span-2 row-span-2"
      />
    </div>
  );
};

export default Students;
