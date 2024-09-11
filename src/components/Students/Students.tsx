import Card from '../Card.tsx';
import StudentsTable from '../Table/StudentsTable.tsx';

const Students = () => {
  return (
    <div className="grid gap-4 p-5 h-full grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
      <Card
        title="Students in class"
        content="This card 1"
        className="row-span-2 lg:col-span-2 md:col-span-2 sm:col-span-2"
      />
      <Card
        title="Statistics"
        content="This card 2"
        className="lg:col-span-4 md:col-span-4 sm:col-span-2"
      />
      <Card
        title="Best students"
        content="This card 3"
        className="lg:col-span-2 md:col-span-2 sm:col-span-2"
      />
      <Card
        title="Worst students"
        content="This card 4"
        className="lg:col-span-2 md:col-span-2 sm:col-span-2"
      />
      <Card
        title="Students List"
        content={<StudentsTable />}
        className="lg:col-span-6 md:col-span-4 sm:col-span-2 row-span-2"
      />
    </div>
  );
};

export default Students;
