import Card from '../Card.tsx';
import StudentsTable from '../Table/StudentsTable.tsx';
import GradePieChart from '../Charts/GradePieChart.tsx';
import StudentStatistics from '../Charts/StudentStatistics.tsx';

const Students = () => {
  return (
    <div className="grid gap-4 p-5 h-full grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
      <Card
        title="Students in class"
        content={<GradePieChart />}
        className="row-span-2 lg:col-span-2 md:col-span-2 sm:col-span-2"
      />
      <Card
        title="Statistics"
        content={<StudentStatistics />}
        className="lg:col-span-4 md:col-span-4 sm:col-span-2"
      />
      <Card
        title="Best students"
        content="John Doe"
        className="lg:col-span-2 md:col-span-2 sm:col-span-2"
      />
      <Card
        title="Worst students"
        content="Sam Johnson"
        className="lg:col-span-2 md:col-span-2 sm:col-span-2"
      />
      <Card
        title="Students List"
        content={<StudentsTable />}
        className="lg:col-span-6 md:col-span-4 sm:col-span-2 row-span-2"
      />
      <Card
        title="Students List"
        content={''}
        className="lg:col-span-6 md:col-span-4 sm:col-span-2 row-span-2"
      />
    </div>
  );
};

export default Students;
