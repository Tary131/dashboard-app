import { FC, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectUser, updateUser } from '../../redux/slices/auth/authSlice';
import Input from './Input';
import Button from './Button';

interface FormValues {
  name: string;
}

const TeacherSettingsForm: FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
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
    <form
      className="max-w-md mx-auto space-y-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        label="Name"
        id="name"
        error={errors.name?.message} // Show error message if there's a validation error
        {...register('name', { required: 'Name is required' })}
        placeholder="Enter your name"
        className="block w-full p-2 mt-1"
      />
      <Button
        label="Save"
        type="submit"
        className="w-full bg-blue-500 text-white"
      />
    </form>
  );
};

export default TeacherSettingsForm;
