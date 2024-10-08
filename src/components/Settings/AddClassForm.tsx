import { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppDispatch } from '../../redux/hooks';
import { addClass } from '../../redux/thunks/classesThunks';
import Button from './Button';
import Input from './Input';
import { FIELD_NAMES } from '../../constants/formConstants';
import { useTranslation } from 'react-i18next'; // i18n hook

interface FormValues {
  [FIELD_NAMES.NAME]: string;
}

const AddClassForm: FC = () => {
  const { t } = useTranslation(); // i18n hook
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { [FIELD_NAMES.NAME]: '' },
  });
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const classData = { name: data[FIELD_NAMES.NAME] };

    try {
      const resultAction = await dispatch(addClass(classData));
      if (addClass.rejected.match(resultAction)) {
        console.error(t('error.addClass'));
      } else {
        console.log(t('success.addClass'));
        reset();
      }
    } catch (error) {
      console.error(t('error.addingClass'));
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-sm mx-auto space-y-6"
    >
      <Input
        label={t('form.className')}
        id="name"
        error={errors[FIELD_NAMES.NAME]?.message}
        {...register(FIELD_NAMES.NAME, {
          required: t('form.classNameRequired'),
        })}
        className="block w-full py-2 px-4 mt-1"
      />
      <Button label={t('form.addClass')} type="submit" />
    </form>
  );
};

export default AddClassForm;
