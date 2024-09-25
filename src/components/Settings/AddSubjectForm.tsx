import { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppDispatch } from '../../redux/hooks';
import { addSubject } from '../../redux/thunks/subjectsThunks';
import Button from './Button';
import Input from './Input';

interface FormValues {
  name: string;
}

const AddSubjectForm: FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
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
      className="max-w-sm mx-auto space-y-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        label="Subject Name"
        id="name"
        error={errors.name?.message}
        {...register('name', { required: 'Subject name is required' })}
        placeholder="Enter subject name"
        className="block w-full py-2 px-4 mt-1"
      />
      <Button
        label="Add Subject"
        type="submit"
        className="w-full bg-blue-500"
      />
    </form>
  );
};

export default AddSubjectForm;
