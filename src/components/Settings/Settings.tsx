import { FC } from 'react';
import Card from '../Card';
import TeacherSettingsForm from './TeacherSettingsForm';
import NewStudentForm from './NewStudentForm';

const Settings: FC = () => (
  <div className="grid gap-4 p-5 grid-cols-1 sm:grid-cols-2">
    <Card
      title="Update Teacher Details"
      content={<TeacherSettingsForm />}
      className="col-span-1"
    />
    <Card
      title="Create New Student"
      content={<NewStudentForm />}
      className="col-span-1"
    />
  </div>
);

export default Settings;
