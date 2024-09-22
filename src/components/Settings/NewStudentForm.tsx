import { FC, useEffect, useState } from 'react';
import Select from 'react-select';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchSubjects } from '../../redux/thunks/subjectsThunks';
import { Class, Subject } from '../../types/types';
import { addStudent } from '../../redux/thunks/studentsThunks';
import { fetchClasses } from '../../redux/thunks/classesThunks';

type SelectOption = {
  value: string;
  label: string;
};

interface FormValues {
  fullName: string;
  classes: string; // Still keep as string for form submission
  subjects: string[];
  avatar: FileList | null;
}

const NewStudentForm: FC = () => {
  const { register, handleSubmit, setValue, reset } = useForm<FormValues>({
    defaultValues: {
      fullName: '',
      classes: '',
      subjects: [],
      avatar: null,
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
      classIds: selectedClass ? selectedClass.value : '', // Get the selected class ID
      subjectIds: selectedSubjects.map((option) => option.value),
    };

    const file = data.avatar?.[0]; // Handle avatar file

    try {
      if (file) {
        // Handle avatar upload here if needed
      }

      const resultAction = await dispatch(addStudent(studentData));

      if (addStudent.rejected.match(resultAction)) {
        console.error('Failed to add student:', resultAction.payload);
      } else {
        console.log('Student added successfully:', resultAction.payload);
        reset();
        setSelectedClass(null); // Reset selected class
        setSelectedSubjects([]);
      }
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  return (
    <form
      className="max-w-sm mx-auto space-y-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        type="text"
        {...register('fullName')}
        placeholder="Full Name"
        className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
      />

      {/* Classes single-select */}
      <Select
        options={classOptions}
        value={selectedClass}
        onChange={(selectedOption) => {
          setSelectedClass(selectedOption as SelectOption); // Set single class
          setValue('classes', (selectedOption as SelectOption).value); // Set value for form
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

      <input
        type="file"
        {...register('avatar')}
        onChange={(e) => {
          const files = e.target.files;
          setValue('avatar', files);
        }}
        className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
      />

      <button
        type="submit"
        className="block py-2.5 px-0 w-full text-sm text-white bg-green-500 rounded"
      >
        Add Student
      </button>
    </form>
  );
};

export default NewStudentForm;
