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
import { customSelectStyles } from '../custom/customSelectStyles.ts';
import { FIELD_NAMES } from '../../constants/formConstants.ts';
import { useTranslation } from 'react-i18next';

type SelectOption = {
  value: string;
  label: string | number;
};

interface FormValues {
  [FIELD_NAMES.STUDENT_ID]: string;
  [FIELD_NAMES.SUBJECT]: string;
  [FIELD_NAMES.GRADE_ID]: string;
  [FIELD_NAMES.DESCRIPTION]: string;
}

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
        console.error(t('error.addGrade'));
      } else {
        console.log(t('success.addGrade'));
        reset();
      }
    } catch (error) {
      console.error(t('error.addingGrade'));
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
            setValue(
              FIELD_NAMES.STUDENT_ID,
              (selectedOption as SelectOption).value
            );
          }}
          placeholder={t('form.selectStudent')}
          className="basic-select"
          classNamePrefix="select"
        />
        {errors[FIELD_NAMES.STUDENT_ID] && (
          <p className="text-red-600 text-sm mt-1">
            {t('form.studentRequired')}
          </p>
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
            setValue(
              FIELD_NAMES.SUBJECT,
              (selectedOption as SelectOption).value
            );
          }}
          placeholder={t('form.selectSubject')}
          className="basic-select"
          classNamePrefix="select"
          styles={customSelectStyles}
        />
        {errors[FIELD_NAMES.SUBJECT] && (
          <p className="text-red-600 text-sm mt-1">
            {t('form.subjectRequired')}
          </p>
        )}
      </div>

      {/* Grade select */}
      <div>
        <Select
          options={gradeOptions}
          value={gradeOptions.find((option) => option.value === selectedGrade)}
          onChange={(selectedOption) => {
            setValue(
              FIELD_NAMES.GRADE_ID,
              (selectedOption as SelectOption).value
            );
          }}
          placeholder={t('form.selectGrade')}
          className="basic-select"
          classNamePrefix="select"
        />
        {errors[FIELD_NAMES.GRADE_ID] && (
          <p className="text-red-600 text-sm mt-1">{t('form.gradeRequired')}</p>
        )}
      </div>

      {/* Description input */}
      <div>
        <Input
          label={t('form.description')}
          id="description"
          {...register(FIELD_NAMES.DESCRIPTION)}
          className="block w-full py-2 px-4 mt-1"
        />
      </div>

      <Button label="Add Grade" type="submit" className="w-full" />
    </form>
  );
};

export default AddGradeForm;
