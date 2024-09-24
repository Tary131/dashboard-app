import { FC } from 'react';
import Card from '../Card.tsx';
import TodoList from './TodoList.tsx';
import StudentCountDisplay from '../Charts/StudentCountDisplay.tsx';
import ClassCountDisplay from '../Charts/ClassCountDisplay.tsx';
import AverageGradesByTime from '../Charts/AverageGradesByTime.tsx';

const getFormattedDate = () => {
  const today = new Date();

  const day = String(today.getDate()).padStart(2, '0'); // Ensure two digits
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = today.getFullYear();

  return `${day}.${month}.${year}`;
};

const Dashboard: FC = () => (
  <div className="grid gap-4 p-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    <Card
      title="Average Grades by Week"
      content={<AverageGradesByTime />}
      className="col-span-3 row-span-2"
    />
    <Card
      title="Total student count"
      content={<StudentCountDisplay />}
      className="col-span-1 row-span-1"
    />
    <Card
      title="Total teacher count"
      content={<p>30</p>}
      className="col-span-1 row-span-1"
    />

    <Card
      title="To-Do List"
      content={<TodoList />}
      className="col-span-3 row-span-2"
    />
    <Card
      title="Today day"
      content={getFormattedDate()}
      className="col-span-1 row-span-1"
    />
    <Card
      title="Total class count"
      content={<ClassCountDisplay />}
      className="col-span-1 row-span-1"
    />
  </div>
);
export default Dashboard;
