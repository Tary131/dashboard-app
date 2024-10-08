import { FC, useEffect, useState } from 'react';
import Select from 'react-select';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchSubjects } from '../../redux/thunks/subjectsThunks';
import { Class, Subject } from '../../types/types';
import { addStudent } from '../../redux/thunks/studentsThunks';
import { fetchClasses } from '../../redux/thunks/classesThunks';
import Button from './Button';
import Input from './Input';
import { selectSubjects } from '../../redux/slices/subjectsSlice.ts';
import { selectClasses } from '../../redux/slices/classesSlice.ts';
import { FIELD_NAMES } from '../../constants/formConstants.ts';
import { useTranslation } from 'react-i18next';

type SelectOption = {
  value: string;
  label: string;
};

interface FormValues {
  [FIELD_NAMES.FULL_NAME]: string;
  [FIELD_NAMES.CLASSES]: string;
  [FIELD_NAMES.SUBJECTS]: string[];
}

const NewStudentForm: FC = () => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      [FIELD_NAMES.FULL_NAME]: '',
      [FIELD_NAMES.CLASSES]: '',
      [FIELD_NAMES.SUBJECTS]: [],
    },
  });

  const [selectedClass, setSelectedClass] = useState<SelectOption | null>(null);
  const [selectedSubjects, setSelectedSubjects] = useState<SelectOption[]>([]);

  const dispatch = useAppDispatch();
  const subjects = useAppSelector(selectSubjects);
  const classes = useAppSelector(selectClasses);

  useEffect(() => {
    dispatch(fetchSubjects());
    dispatch(fetchClasses());
  }, [dispatch]);

  const classOptions: SelectOption[] =
    classes &&
    Object.values(classes).map((classItem: Class) => ({
      value: classItem.id,
      label: classItem.name,
    }));

  const subjectOptions: SelectOption[] =
    subjects &&
    Object.values(subjects).map((subject: Subject) => ({
      value: subject.id,
      label: subject.name,
    }));

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const studentData = {
      name: data.fullName,
      classIds: selectedClass ? selectedClass.value : '',
      subjectIds: selectedSubjects.map((option) => option.value),
    };

    try {
      const resultAction = await dispatch(addStudent(studentData));
      if (addStudent.rejected.match(resultAction)) {
        console.error(t('error.addStudent'));
      } else {
        console.log(t('success.addStudent'));
        reset();
      }
    } catch (error) {
      console.error(t('error.addingStudent'));
    }
  };

  return (
    <form
      className="max-w-sm mx-auto space-y-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        label={t('form.fullName')}
        id="fullName"
        error={errors.fullName?.message}
        {...register(FIELD_NAMES.FULL_NAME, {
          required: t('form.fullNameRequired'),
        })}
        placeholder={t('form.enterFullName')}
        className="block w-full py-2 px-4 mt-1"
      />

      {/* Classes single-select */}
      <div>
        <Select
          options={classOptions}
          value={selectedClass}
          onChange={(selectedOption) => {
            setSelectedClass(selectedOption as SelectOption);
            setValue(
              FIELD_NAMES.CLASSES,
              (selectedOption as SelectOption).value
            );
          }}
          placeholder={t('form.selectClass')}
          className="basic-single"
          classNamePrefix="select"
        />
        {errors[FIELD_NAMES.CLASSES] && (
          <p className="text-red-600">{t('form.classRequired')}</p>
        )}
      </div>

      {/* Subjects multi-select */}
      <div>
        <Select
          isMulti
          options={subjectOptions}
          value={selectedSubjects}
          onChange={(selectedOptions) => {
            setSelectedSubjects(selectedOptions as SelectOption[]);
            setValue(
              FIELD_NAMES.SUBJECTS,
              (selectedOptions as SelectOption[]).map((option) => option.value)
            );
          }}
          placeholder={t('form.selectSubjects')}
          className="basic-multi-select"
          classNamePrefix="select"
        />
        {errors[FIELD_NAMES.SUBJECTS] && (
          <p className="text-red-600">{t('form.subjectsRequired')}</p>
        )}
      </div>
      <Button
        label={t('form.addStudent')}
        type="submit"
        className="w-full bg-green-500"
      />
    </form>
  );
};

export default NewStudentForm;
