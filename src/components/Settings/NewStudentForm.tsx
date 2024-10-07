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
        console.error('Failed to add student:', resultAction.payload);
      } else {
        console.log('Student added successfully:', resultAction.payload);
        reset();
        setSelectedClass(null);
        setSelectedSubjects([]);
      }
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  return (
    <form
      className="max-w-sm mx-auto space-y-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        label="Full Name"
        id="fullName"
        error={errors.fullName?.message}
        {...register(FIELD_NAMES.FULL_NAME, {
          required: 'Full name is required',
        })}
        placeholder="Enter full name"
        className="block w-full py-2 px-4 mt-1"
      />

      {/* Classes single-select */}
      <Select
        options={classOptions}
        value={selectedClass}
        onChange={(selectedOption) => {
          setSelectedClass(selectedOption as SelectOption);
          setValue(FIELD_NAMES.CLASSES, (selectedOption as SelectOption).value);
        }}
        placeholder="Select a class..."
        className="basic-single"
        classNamePrefix="select"
      />

      {/* Subjects multi-select */}
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
        placeholder="Select subjects..."
        className="basic-multi-select"
        classNamePrefix="select"
      />

      <Button
        label="Add Student"
        type="submit"
        className="w-full bg-green-500"
      />
    </form>
  );
};

export default NewStudentForm;
