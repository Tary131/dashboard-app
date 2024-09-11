import { FC } from 'react';
import { subjectsData } from './subjectsData';
import SubjectCard from './SubjectCard';

const SubjectDashboard: FC = () => {
  const handleAddStudent = (subject: string) => {
    alert(`Add a new student to ${subject}`);
  };

  const handleUpdateStudents = (subject: string) => {
    alert(`Update the student list for ${subject}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {subjectsData.map((subjectData, index) => (
        <SubjectCard
          key={index}
          subject={subjectData.subject}
          students={subjectData.students}
          avgGrade={subjectData.avgGrade}
          classes={subjectData.classes}
          onAddStudent={handleAddStudent}
          onUpdateStudents={handleUpdateStudents}
        />
      ))}
    </div>
  );
};

export default SubjectDashboard;
