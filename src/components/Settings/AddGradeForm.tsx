import { FC, useEffect, useState } from 'react';
import Select from 'react-select';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchSubjects } from '../../redux/thunks/subjectsThunks';
import { fetchStudents } from '../../redux/thunks/studentsThunks';
import { Subject, Student, Grades } from '../../types/types';
import { updateStudentWithGrades } from '../../redux/thunks/studentsThunks';
import { fetchGrades } from '../../redux/thunks/gradesThunks.ts';

type SelectOption = {
  value: string;
  label: string | number;
};

interface FormValues {
  studentId: string;
  subject: string;
  gradeId: string;
  description: string;
}

const AddGradeForm: FC = () => {
  const { register, handleSubmit, setValue, reset } = useForm<FormValues>({
    defaultValues: {
      studentId: '',
      subject: '',
      gradeId: '',
      description: '',
    },
  });

  const [selectedStudent, setSelectedStudent] = useState<SelectOption | null>(
    null
  );
  const [selectedSubject, setSelectedSubject] = useState<SelectOption | null>(
    null
  );
  const [selectedGrade, setSelectedGrade] = useState<SelectOption | null>(null);

  const dispatch = useAppDispatch();
  const { subjects } = useAppSelector((state) => state.subjects);
  const { students } = useAppSelector((state) => state.students);
  const { grades } = useAppSelector((state) => state.grades);

  useEffect(() => {
    dispatch(fetchSubjects());
    dispatch(fetchStudents());
    dispatch(fetchGrades());
  }, [dispatch]);

  const studentOptions: SelectOption[] =
    students &&
    Object.values(students).map((student: Student) => ({
      value: student.id,
      label: student.name,
    }));

  const subjectOptions: SelectOption[] =
    subjects &&
    Object.values(subjects).map((subject: Subject) => ({
      value: subject.id,
      label: subject.name,
    }));
  const gradeOptions: SelectOption[] =
    grades &&
    Object.values(grades).map((grade: Grades) => ({
      value: grade.id,
      label: grade.value,
    }));

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const newGrades = [
      {
        subjectId: data.subject,
        grade: data.gradeId,
        description: data.description,
      },
    ];

    try {
      const resultAction = await dispatch(
        updateStudentWithGrades({
          studentId: data.studentId,
          newGrades,
        })
      );

      if (updateStudentWithGrades.rejected.match(resultAction)) {
        console.error('Failed to add grade:', resultAction.payload);
      } else {
        console.log('Grade added successfully:', resultAction.payload);
        reset();
        setSelectedStudent(null);
        setSelectedSubject(null);
        setSelectedGrade(null);
      }
    } catch (error) {
      console.error('Error adding grade:', error);
    }
  };

  return (
    <form
      className="max-w-sm mx-auto space-y-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Student select */}
      <Select
        options={studentOptions}
        value={selectedStudent}
        onChange={(selectedOption) => {
          setSelectedStudent(selectedOption as SelectOption);
          setValue('studentId', (selectedOption as SelectOption).value); // Set selected student ID
        }}
        placeholder="Select student..."
        className="basic-select"
        classNamePrefix="select"
      />

      {/* Subject select */}
      <Select
        options={subjectOptions}
        value={selectedSubject}
        onChange={(selectedOption) => {
          setSelectedSubject(selectedOption as SelectOption);
          setValue('subject', (selectedOption as SelectOption).value);
        }}
        placeholder="Select subject..."
        className="basic-select"
        classNamePrefix="select"
      />

      {/* Grade input */}
      <Select
        options={gradeOptions}
        value={selectedGrade}
        onChange={(selectedOption) => {
          setSelectedGrade(selectedOption as SelectOption);
          setValue('gradeId', (selectedOption as SelectOption).value); // Set selected grade ID
        }}
        placeholder="Select grade..."
        className="basic-select"
        classNamePrefix="select"
      />

      {/* Description input */}
      <input
        type="text"
        {...register('description')}
        placeholder="Description (optional)"
        className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
      />

      <button
        type="submit"
        className="block py-2.5 px-0 w-full text-sm text-white bg-green-500 rounded"
      >
        Add Grade
      </button>
    </form>
  );
};

export default AddGradeForm;
