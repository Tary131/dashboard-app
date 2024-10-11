import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks.ts';
import {
  selectClasses,
  selectGrades,
  selectStudents,
  selectSubjects,
} from '../redux/selectors';
import { StudentUtility as Student } from '../types/types.ts';
import { thunks } from '../redux/thunks';

const formattedStudentData = () => {
  const dispatch = useAppDispatch();
  const subjects = useAppSelector(selectSubjects);
  const students = useAppSelector(selectStudents);
  const grades = useAppSelector(selectGrades);
  const classes = useAppSelector(selectClasses);

  const [formattedData, setFormattedData] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        await Promise.all([
          dispatch(thunks.fetchSubjects()),
          dispatch(thunks.fetchStudents()),
          dispatch(thunks.fetchGrades()),
          dispatch(thunks.fetchClasses()),
        ]);
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const data = Object.values(students).flatMap(
      (student) =>
        student.subjectGrades?.map((subjectGrade) => ({
          name: student.name,
          grade: getGradeValue(subjectGrade.grade) ?? 0,
          subject: getSubjectValue(subjectGrade.subjectId) ?? 'Unknown Subject',
          class: getClassValue(student.classIds) ?? 'No Class',
          date: formatToYYYYMMDD(
            subjectGrade.createdAt || 'Date not available'
          ),
        })) || []
    );
    setFormattedData(data);
  }, [students, grades, subjects, classes]);

  const formatToYYYYMMDD = (timestamp: string): string => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  const getGradeValue = (gradeId: string): number | undefined => {
    const foundGrade = Object.values(grades).find(
      (grade) => grade.id === gradeId
    );
    return foundGrade ? foundGrade.value : undefined;
  };

  const getSubjectValue = (subjectId: string): string | undefined => {
    const foundSubject = Object.values(subjects).find(
      (subject) => subject.id === subjectId
    );
    return foundSubject ? foundSubject.name : undefined;
  };

  const getClassValue = (classId: string): string | undefined => {
    const foundClass = Object.values(classes).find(
      (classe) => classe.id === classId
    );
    return foundClass ? foundClass.name : 'No Class';
  };

  return { formattedData, loading, error };
};

export default formattedStudentData;
