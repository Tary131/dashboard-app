import { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppDispatch } from '../../redux/hooks';
import { addSubject } from '../../redux/thunks/subjectsThunks';

interface FormValues {
  name: string;
}

const AddSubjectForm: FC = () => {
  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      name: '',
    },
  });

  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const subjectData = {
      name: data.name,
    };

    try {
      const resultAction = await dispatch(addSubject(subjectData));

      if (addSubject.rejected.match(resultAction)) {
        console.error('Failed to add subject:', resultAction.payload);
      } else {
        console.log('Subject added successfully:', resultAction.payload);
        reset();
      }
    } catch (error) {
      console.error('Error adding subject:', error);
    }
  };

  return (
    <form
      className="max-w-sm mx-auto space-y-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        type="text"
        {...register('name')}
        placeholder="Subject Name"
        className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
      />

      <button
        type="submit"
        className="block py-2.5 px-0 w-full text-sm text-white bg-blue-500 rounded"
      >
        Add Subject
      </button>
    </form>
  );
};

export default AddSubjectForm;
