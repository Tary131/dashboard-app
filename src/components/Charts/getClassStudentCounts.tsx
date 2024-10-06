import { Student } from '../../hooks/FormattedStudentData.ts';

export const getClassStudentCounts = (students: Student[]) => {
  const classStudentCount = students.reduce<{ [key: string]: Set<string> }>(
    (acc, student) => {
      const className = student.class || 'Unknown Class';

      if (!acc[className]) {
        acc[className] = new Set();
      }

      acc[className].add(student.name);

      return acc;
    },
    {}
  );

  return Object.keys(classStudentCount).map((className) => ({
    className,
    students: classStudentCount[className].size, //todo check if working correct before merge
  }));
};
