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

type SelectOption = {
  value: string;
  label: string;
};

interface FormValues {
  fullName: string;
  classes: string;
  subjects: string[];
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
      fullName: '',
      classes: '',
      subjects: [],
    },
  });

  const [selectedClass, setSelectedClass] = useState<SelectOption | null>(null); // Single class selection
  const [selectedSubjects, setSelectedSubjects] = useState<SelectOption[]>([]);

  const dispatch = useAppDispatch();
  const { subjects } = useAppSelector((state) => state.subjects);
  const { classes } = useAppSelector((state) => state.classes);

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
        {...register('fullName', { required: 'Full name is required' })}
        placeholder="Enter full name"
        className="block w-full py-2 px-4 mt-1"
      />

      {/* Classes single-select */}
      <Select
        options={classOptions}
        value={selectedClass}
        onChange={(selectedOption) => {
          setSelectedClass(selectedOption as SelectOption);
          setValue('classes', (selectedOption as SelectOption).value);
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
            'subjects',
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
