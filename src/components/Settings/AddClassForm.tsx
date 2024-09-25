import { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppDispatch } from '../../redux/hooks';
import { addClass } from '../../redux/thunks/classesThunks';
import Button from './Button.tsx';
import Input from './Input';

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
      console.error('Error adding class:', error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-sm mx-auto space-y-6"
    >
      <Input
        label="Class Name"
        id="name"
        error={errors.name?.message}
        {...register('name', { required: 'Class name is required' })}
        className="block w-full py-2 px-4 mt-1"
      />
      <Button label={'Add class'} type="submit" />
    </form>
  );
};

export default AddClassForm;
