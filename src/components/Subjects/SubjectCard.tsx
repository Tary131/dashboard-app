import { FC } from 'react';
import Card from '../Card';

interface SubjectCardProps {
  subject: string;
  students: number;
  avgGrade: number;
  classes: number;
  onAddStudent: (subject: string) => void;
  onUpdateStudents: (subject: string) => void;
}

const SubjectCard: FC<SubjectCardProps> = ({
  subject,
  students,
  avgGrade,
  classes,
  onAddStudent,
  onUpdateStudents,
}) => {
  return (
    <Card
      title={subject}
      className="flex flex-col justify-between items-center h-full"
      content={
        <div className="flex flex-col items-center">
          <p>Students: {students}</p>
          <p>Average Grade: {avgGrade}%</p>
          <p>Classes: {classes}</p>
          <div className="mt-4 flex space-x-2">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
              onClick={() => onAddStudent(subject)}
            >
              Add
            </button>
            <button
              className="px-4 py-2 bg-green-500 text-white rounded-md"
              onClick={() => onUpdateStudents(subject)}
            >
              Update
            </button>
          </div>
        </div>
      }
    />
  );
};

export default SubjectCard;
