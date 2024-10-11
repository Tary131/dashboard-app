import { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppDispatch } from '../../redux/hooks';
import { addSubject } from '../../redux/subjects/thunks/subjectsThunks.ts';
import Button from '../custom/Button.tsx';
import Input from '../custom/Input.tsx';
import { FIELD_NAMES } from '../../constants/formConstants';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

type FormValues = {
  [FIELD_NAMES.NAME]: string;
};

const AddSubjectForm: FC = () => {
  const { t } = useTranslation();
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
    const subjectData = { name: data[FIELD_NAMES.NAME] };

    try {
      const resultAction = await dispatch(addSubject(subjectData));
      if (addSubject.rejected.match(resultAction)) {
        toast.error(t('error.addSubject'));
      } else {
        toast.success(t('success.addSubject'));
        reset();
      }
    } catch (error) {
      toast.error(t('error.addingSubject'));
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-sm mx-auto space-y-6"
    >
      <Input
        label={t('form.subjectName')}
        id="name"
        error={errors[FIELD_NAMES.NAME]?.message}
        {...register(FIELD_NAMES.NAME, {
          required: t('form.subjectNameRequired'),
        })}
        placeholder={t('form.enterSubjectName')}
      />
      <Button label={t('form.addSubject')} type="submit" />
    </form>
  );
};

export default AddSubjectForm;
