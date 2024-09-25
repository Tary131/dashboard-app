import { FC } from 'react';
import Card from '../Card.tsx'; // Adjust the import path as needed

interface SubjectCardProps {
  subject: string;
  students: number;
  avgGrade: number;
}

const SubjectCard: FC<SubjectCardProps> = ({ subject, students, avgGrade }) => {
  return (
    <Card
      title={subject}
      className="text-center"
      content={
        <div className="flex flex-col space-y-2">
          <p>{`Students:${students}`}</p>
          <p>{`AVG:${avgGrade.toFixed(2)}`}</p>
        </div>
      }
    />
  );
};

export default SubjectCard;
