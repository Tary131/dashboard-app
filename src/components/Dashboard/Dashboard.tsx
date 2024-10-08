import { FC } from 'react';
import Card from '../Card.tsx';
import TodoList from './TodoList.tsx';
import StudentCountDisplay from '../Charts/StudentCountDisplay.tsx';
import ClassCountDisplay from '../Charts/ClassCountDisplay.tsx';
import AverageGradesByTime from '../Charts/AverageGradesByTime.tsx';
import { useTranslation } from 'react-i18next';

// Function to get the formatted date
const getFormattedDate = () => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();

  return (
    <p className="text-center text-3xl font-bold mt-9 text-cyan-700">{`${day}.${month}.${year}`}</p>
  );
};

const Dashboard: FC = () => {
  const { t } = useTranslation();

  return (
    <div className="grid gap-4 p-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <Card
        title={t('dashboard.avg-grade-week')}
        content={<AverageGradesByTime />}
        className="col-span-1 md:col-span-2 lg:col-span-3 row-span-1 md:row-span-2"
      />
      <Card
        title={t('dashboard.date')} //
        content={getFormattedDate()}
        className="col-span-1 row-span-1"
      />
      <Card
        title={t('dashboard.total-class-count')}
        content={<ClassCountDisplay />}
        className="col-span-1 row-span-1"
      />
      <Card
        title={t('dashboard.total-student-count')}
        content={<StudentCountDisplay />}
        className="col-span-1 md:row-span-2 row-span-1"
      />
      <Card
        title={t('dashboard.todo-list')}
        content={<TodoList />}
        className="col-span-1 md:col-span-2 lg:col-span-4 row-span-1 md:row-span-2"
      />
    </div>
  );
};

export default Dashboard;
