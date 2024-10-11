import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import Card from '../Card';
import TeacherSettingsForm from './TeacherSettingsForm';
import NewStudentForm from './NewStudentForm';
import AddSubjectForm from './AddSubjectForm';
import AddClassForm from './AddClassForm';
import AddGradeForm from './AddGradeForm';

const Settings: FC = () => {
  const { t } = useTranslation();

  return (
    <div className="grid gap-4 p-5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
      <Card
        title={t('form.update_teacher_details')}
        content={<TeacherSettingsForm />}
        className="col-span-1 row-span-1"
      />
      <Card
        title={t('form.create_new_student')}
        content={<NewStudentForm />}
        className="col-span-1 row-span-2"
      />
      <Card
        title={t('form.create_new_subject')}
        content={<AddSubjectForm />}
        className="col-span-1"
      />
      <Card
        title={t('form.create_new_class')}
        content={<AddClassForm />}
        className="col-span-1"
      />
      <Card
        title={t('form.add_grade')}
        content={<AddGradeForm />}
        className="col-span-1 row-span-2"
      />
    </div>
  );
};

export default Settings;
