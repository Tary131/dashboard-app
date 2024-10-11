import { FC, useEffect, useMemo } from 'react';
import Select from 'react-select';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchSubjects } from '../../redux/subjects/thunks/subjectsThunks.ts';
import {
  fetchStudents,
  updateStudentWithGrades,
} from '../../redux/students/thunks/studentsThunks.ts';
import { fetchGrades } from '../../redux/grades/thunks/gradesThunks.ts';
import { Subject, Student, Grades } from '../../types/types';
import Button from '../custom/Button.tsx';
import Input from '../custom/Input.tsx';
import {
  selectSubjects,
  selectStudents,
  selectGrades,
} from '../../redux/selectors';
import { selectIsDarkMode } from '../../redux/darkMode/darkModeSlice.ts';
import { customSelectStyles } from '../custom/customSelectStyles.ts';
import { FIELD_NAMES } from '../../constants/formConstants.ts';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { SelectOption } from '../../types/types';

type FormValues = {
  [FIELD_NAMES.STUDENT_ID]: string;
  [FIELD_NAMES.SUBJECT]: string;
  [FIELD_NAMES.GRADE_ID]: string;
  [FIELD_NAMES.DESCRIPTION]: string;
};

const AddGradeForm: FC = () => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      [FIELD_NAMES.STUDENT_ID]: '',
      [FIELD_NAMES.SUBJECT]: '',
      [FIELD_NAMES.GRADE_ID]: '',
      [FIELD_NAMES.DESCRIPTION]: '',
    },
  });

  const dispatch = useAppDispatch();
  const subjects = useAppSelector(selectSubjects);
  const students = useAppSelector(selectStudents);
  const grades = useAppSelector(selectGrades);
  const isDarkMode = useAppSelector(selectIsDarkMode);
  useEffect(() => {
    dispatch(fetchSubjects());
    dispatch(fetchStudents());
    dispatch(fetchGrades());
  }, [dispatch]);

  const studentOptions: SelectOption[] = useMemo(
    () =>
      students
        ? Object.values(students).map((student: Student) => ({
            value: student.id,
            label: student.name,
          }))
        : [],
    [students]
  );

  const subjectOptions: SelectOption[] = useMemo(
    () =>
      subjects
        ? Object.values(subjects).map((subject: Subject) => ({
            value: subject.id,
            label: subject.name,
          }))
        : [],
    [subjects]
  );

  const gradeOptions: SelectOption[] = useMemo(
    () =>
      grades
        ? Object.values(grades).map((grade: Grades) => ({
            value: grade.id,
            label: grade.value,
          }))
        : [],
    [grades]
  );

  const selectedStudent = watch(FIELD_NAMES.STUDENT_ID);
  const selectedSubject = watch(FIELD_NAMES.SUBJECT);
  const selectedGrade = watch(FIELD_NAMES.GRADE_ID);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const newGrades = [
      {
        subjectId: data[FIELD_NAMES.SUBJECT],
        grade: data[FIELD_NAMES.GRADE_ID],
        description: data[FIELD_NAMES.DESCRIPTION],
      },
    ];

    try {
      const resultAction = await dispatch(
        updateStudentWithGrades({
          studentId: data[FIELD_NAMES.STUDENT_ID],
          newGrades,
        })
      );

      if (updateStudentWithGrades.rejected.match(resultAction)) {
        toast.error(t('error.addGrade'));
      } else {
        toast.success(t('success.addGrade'));
        reset();
      }
    } catch (error) {
      toast.error(t('error.addingGrade'));
    }
  };

  // Reusable Error Message Component
  const ErrorMessage = ({ message }: { message: string }) => (
    <p className="text-red-600 text-sm mt-1">{message}</p>
  );

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      {/* Student select */}
      <div>
        <Select
          options={studentOptions}
          value={studentOptions.find(
            (option) => option.value === selectedStudent
          )}
          onChange={(selectedOption) =>
            setValue(
              FIELD_NAMES.STUDENT_ID,
              (selectedOption as SelectOption).value
            )
          }
          placeholder={t('form.selectStudent')}
          className="basic-select"
          classNamePrefix="select"
          styles={customSelectStyles(isDarkMode)}
        />
        {errors[FIELD_NAMES.STUDENT_ID] && (
          <ErrorMessage message={t('form.studentRequired')} />
        )}
      </div>

      {/* Subject select */}
      <div>
        <Select
          options={subjectOptions}
          value={subjectOptions.find(
            (option) => option.value === selectedSubject
          )}
          onChange={(selectedOption) =>
            setValue(
              FIELD_NAMES.SUBJECT,
              (selectedOption as SelectOption).value
            )
          }
          placeholder={t('form.selectSubject')}
          className="basic-select"
          classNamePrefix="select"
          styles={customSelectStyles(isDarkMode)}
        />
        {errors[FIELD_NAMES.SUBJECT] && (
          <ErrorMessage message={t('form.subjectRequired')} />
        )}
      </div>

      {/* Grade select */}
      <div>
        <Select
          options={gradeOptions}
          value={gradeOptions.find((option) => option.value === selectedGrade)}
          onChange={(selectedOption) =>
            setValue(
              FIELD_NAMES.GRADE_ID,
              (selectedOption as SelectOption).value
            )
          }
          placeholder={t('form.selectGrade')}
          className="basic-select"
          classNamePrefix="select"
          styles={customSelectStyles(isDarkMode)}
        />
        {errors[FIELD_NAMES.GRADE_ID] && (
          <ErrorMessage message={t('form.gradeRequired')} />
        )}
      </div>

      {/* Description input */}
      <div>
        <Input
          label={t('form.description')}
          id="description"
          {...register(FIELD_NAMES.DESCRIPTION)}
          className="block w-full py-2 px-4 mt-1"
          placeholder={t('form.enterGradeDescription')}
        />
      </div>

      <Button label={t('form.addGrade')} type="submit" className="w-full" />
    </form>
  );
};

export default AddGradeForm;
