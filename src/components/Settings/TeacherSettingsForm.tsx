import { FC, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { updateUser } from '../../redux/slices/auth/authSlice';

interface FormValues {
  name: string;
}

const TeacherSettingsForm: FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      name: user?.name || '',
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
      });
    }
  }, [user, reset]);

  // Handle form submission
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (user) {
      dispatch(updateUser({ name: data.name }));
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        {...register('name')}
        placeholder="Name"
        className="w-full p-2 border border-gray-300 rounded"
      />
      <button
        type="submit"
        className="w-full p-2 bg-blue-500 text-white rounded"
      >
        Save
      </button>
    </form>
  );
};

export default TeacherSettingsForm;
