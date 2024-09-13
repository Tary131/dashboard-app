import { useState, FC } from 'react';

const TeacherSettingsForm: FC = () => {
  const [teacherData, setTeacherData] = useState({
    name: 'John',
    surname: 'Doe',
    subjects: 'Math, Science',
    avatar: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTeacherData({ ...teacherData, [name]: value });
  };

  const handleSave = () => {
    alert('Teacher details saved');
  };

  return (
    <form className="space-y-4">
      <input
        type="text"
        name="name"
        value={teacherData.name}
        onChange={handleInputChange}
        placeholder="Name"
        className="w-full p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        name="surname"
        value={teacherData.surname}
        onChange={handleInputChange}
        placeholder="Surname"
        className="w-full p-2 border border-gray-300 rounded"
      />
      <textarea
        name="subjects"
        value={teacherData.subjects}
        onChange={handleInputChange}
        placeholder="Subjects"
        className="w-full p-2 border border-gray-300 rounded"
      />
      <input
        type="file"
        name="avatar"
        onChange={(e) =>
          setTeacherData({
            ...teacherData,
            avatar: e.target.files?.[0]?.name || '',
          })
        }
        className="w-full p-2 border border-gray-300 rounded"
      />
      <button
        type="button"
        onClick={handleSave}
        className="w-full p-2 bg-blue-500 text-white rounded"
      >
        Save
      </button>
    </form>
  );
};

export default TeacherSettingsForm;
