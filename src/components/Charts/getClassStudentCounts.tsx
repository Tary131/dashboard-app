import { Student } from '../../hooks/FormattedStudentData.ts';
export const getClassStudentCounts = (students: Student[]) => {
  const classStudentCount: { [key: string]: { [name: string]: number } } = {};

  students.forEach((student) => {
    const className = student.class || 'Unknown Class';
    if (!classStudentCount[className]) {
      classStudentCount[className] = {};
    }

    if (classStudentCount[className][student.name]) {
      classStudentCount[className][student.name] += 1;
    } else {
      classStudentCount[className][student.name] = 1;
    }
  });

  return Object.keys(classStudentCount).map((className) => ({
    className,
    students: Object.values(classStudentCount[className]).reduce(
      (total, count) => total + count,
      0
    ),
  }));
};
