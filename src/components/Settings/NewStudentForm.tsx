import { FC, useEffect, useState } from 'react';
import Select from 'react-select';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { thunks } from '../../redux/thunks';
import { Class, Subject } from '../../types/types';
import Button from '../custom/Button.tsx';
import Input from '../custom/Input.tsx';
import { selectSubjects, selectClasses } from '../../redux/selectors';
import { FIELD_NAMES } from '../../constants/formConstants.ts';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { customSelectStyles } from '../custom/customSelectStyles.ts';
import { selectIsDarkMode } from '../../redux/darkMode/darkModeSlice.ts';
import { SelectOption } from '../../types/types';

type FormValues = {
  [FIELD_NAMES.FULL_NAME]: string;
  [FIELD_NAMES.CLASSES]: string;
  [FIELD_NAMES.SUBJECTS]: string[];
};

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
  const isDarkMode = useAppSelector(selectIsDarkMode);
  useEffect(() => {
    dispatch(thunks.fetchSubjects());
    dispatch(thunks.fetchClasses());
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
      const resultAction = await dispatch(thunks.addStudent(studentData));
      if (thunks.addStudent.rejected.match(resultAction)) {
        toast.error(t('error.addStudent'));
      } else {
        toast.success(t('success.addStudent'));
        reset();
      }
    } catch (error) {
      toast.error(t('error.addingStudent'));
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
          styles={customSelectStyles(isDarkMode)}
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
          styles={customSelectStyles(isDarkMode)}
        />
        {errors[FIELD_NAMES.SUBJECTS] && (
          <p className="text-red-600">{t('form.subjectsRequired')}</p>
        )}
      </div>
      <Button label={t('form.addStudent')} type="submit" />
    </form>
  );
};

export default NewStudentForm;
