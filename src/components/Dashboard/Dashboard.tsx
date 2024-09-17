import { FC } from 'react';
import Card from '../Card.tsx';
import AverageGradesChart from '../Charts/AverageGradesChart.tsx';
import TodoList from './TodoList.tsx';

const Dashboard: FC = () => (
  <div className="grid gap-4 p-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    <Card
      title="Average Grades by Month"
      content={<AverageGradesChart />}
      className="col-span-3 row-span-2"
    />
    <Card
      title="Total student count"
      content={<p>1000</p>}
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
      content={<p>1.1.2025</p>}
      className="col-span-1 row-span-1"
    />
    <Card
      title="Total class count"
      content={<p>21</p>}
      className="col-span-1 row-span-1"
    />
    <Card
      title="Teacher class list"
      content={<p>A1,B2</p>}
      className="col-span-2 row-span-2"
    />
    <Card
      title="Teacher class list"
      content={<p>Math,Art</p>}
      className="col-span-2 row-span-2"
    />
  </div>
);
export default Dashboard;
