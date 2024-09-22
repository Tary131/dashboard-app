import { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppDispatch } from '../../redux/hooks';
import { addClass } from '../../redux/thunks/classesThunks.ts';

interface FormValues {
  name: string;
}

const AddClassForm: FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const classData = {
      name: data.name,
    };

    try {
      const resultAction = await dispatch(addClass(classData));
      if (addClass.rejected.match(resultAction)) {
        console.error('Failed to add class:', resultAction.payload);
      } else {
        console.log('Class added successfully:', resultAction.payload);
        reset();
      }
    } catch (error) {
      console.error('Error adding Class:', error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-sm mx-auto space-y-4"
    >
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          id="name"
          {...register('name', { required: 'Name is required' })}
          className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-200 peer"
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="block py-2.5 px-0 w-full text-sm text-white bg-green-500 rounded"
      >
        Add Class
      </button>
    </form>
  );
};

export default AddClassForm;
