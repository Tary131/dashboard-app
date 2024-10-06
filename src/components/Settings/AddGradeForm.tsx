import { FC, useEffect } from 'react';
import Select from 'react-select';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchSubjects } from '../../redux/thunks/subjectsThunks';
import { fetchStudents } from '../../redux/thunks/studentsThunks';
import { Subject, Student, Grades } from '../../types/types';
import { updateStudentWithGrades } from '../../redux/thunks/studentsThunks';
import { fetchGrades } from '../../redux/thunks/gradesThunks.ts';
import Button from './Button';
import Input from './Input';
import { selectSubjects } from '../../redux/slices/subjectsSlice.ts';
import { selectStudents } from '../../redux/slices/studentsSlice.ts';
import { selectGrades } from '../../redux/slices/gradesSlice.ts';

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
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      studentId: '',
      subject: '',
      gradeId: '',
      description: '',
    },
  });

  const dispatch = useAppDispatch();
  const subjects = useAppSelector(selectSubjects);
  const students = useAppSelector(selectStudents);
  const grades = useAppSelector(selectGrades);

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

  // Watch selected values via React Hook Form
  const selectedStudent = watch('studentId');
  const selectedSubject = watch('subject');
  const selectedGrade = watch('gradeId');

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
      }
    } catch (error) {
      console.error('Error adding grade:', error);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      {/* Student select */}
      <div>
        <Select
          options={studentOptions}
          value={studentOptions.find(
            (option) => option.value === selectedStudent
          )}
          onChange={(selectedOption) => {
            setValue('studentId', (selectedOption as SelectOption).value);
          }}
          placeholder="Select student..."
          className="basic-select"
          classNamePrefix="select"
        />
        {errors.studentId && (
          <p className="text-red-600 text-sm mt-1">Student is required.</p>
        )}
      </div>

      {/* Subject select */}
      <div>
        <Select
          options={subjectOptions}
          value={subjectOptions.find(
            (option) => option.value === selectedSubject
          )}
          onChange={(selectedOption) => {
            setValue('subject', (selectedOption as SelectOption).value);
          }}
          placeholder="Select subject..."
          className="basic-select"
          classNamePrefix="select"
        />
        {errors.subject && (
          <p className="text-red-600 text-sm mt-1">Subject is required.</p>
        )}
      </div>

      {/* Grade select */}
      <div>
        <Select
          options={gradeOptions}
          value={gradeOptions.find((option) => option.value === selectedGrade)}
          onChange={(selectedOption) => {
            setValue('gradeId', (selectedOption as SelectOption).value);
          }}
          placeholder="Select grade..."
          className="basic-select"
          classNamePrefix="select"
        />
        {errors.gradeId && (
          <p className="text-red-600 text-sm mt-1">Grade is required.</p>
        )}
      </div>

      {/* Description input */}
      <div>
        <Input
          label="Description (optional)"
          id="description"
          {...register('description')}
          className="block w-full py-2 px-4 mt-1"
        />
      </div>

      <Button label="Add Grade" type="submit" className="w-full" />
    </form>
  );
};

export default AddGradeForm;
