import { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface FormValues {
  name: string;
  surname: string;
  subjects: string;
  avatar: FileList | null;
}

const TeacherSettingsForm: FC = () => {
  const { register, handleSubmit, setValue } = useForm<FormValues>({
    defaultValues: {
      name: 'John',
      surname: 'Doe',
      subjects: 'Math, Science',
      avatar: null,
    },
  });

  // Handle input change
  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    setValue('avatar', files);
  };

  // Handle form submission
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const file = data.avatar?.[0];
    if (file) {
      console.log(file);
    }
    alert('Teacher details saved');
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        {...register('name')}
        placeholder="Name"
        className="w-full p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        {...register('surname')}
        placeholder="Surname"
        className="w-full p-2 border border-gray-300 rounded"
      />
      <textarea
        {...register('subjects')}
        placeholder="Subjects"
        className="w-full p-2 border border-gray-300 rounded"
      />
      <input
        type="file"
        {...register('avatar')}
        onChange={onChangeFile}
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
