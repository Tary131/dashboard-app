import { FC, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectUser, updateUser } from '../../redux/slices/auth/authSlice';
import Input from './Input';
import Button from './Button';
import { FIELD_NAMES } from '../../constants/formConstants.ts';
import { useTranslation } from 'react-i18next';

interface FormValues {
  [FIELD_NAMES.NAME]: string;
}

const TeacherSettingsForm: FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  useEffect(() => {
    if (user) {
      reset({
        [FIELD_NAMES.NAME]: user[FIELD_NAMES.NAME] || '',
      });
    }
  }, [user, reset]);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (user) {
      dispatch(updateUser({ name: data[FIELD_NAMES.NAME] }));
    }
  };

  return (
    <form
      className="max-w-md mx-auto space-y-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        label={t('form.name')}
        id="name"
        error={errors.name?.message}
        {...register(FIELD_NAMES.NAME, { required: t('form.name_required') })}
        placeholder={t('enter_name')}
        className="block w-full p-2 mt-1"
      />
      <Button
        label={t('form.save')}
        type="submit"
        className="w-full bg-blue-500 text-white"
      />
    </form>
  );
};

export default TeacherSettingsForm;
