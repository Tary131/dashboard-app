import { useState, FC } from 'react';

const NewStudentForm: FC = () => {
  const [studentData, setStudentData] = useState({
    name: '',
    surname: '',
    classes: '',
    subjects: '',
    avatar: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setStudentData({ ...studentData, [name]: value });
  };

  const handleSave = () => {
    alert('New student added');
  };

  return (
    <form className="space-y-4">
      <input
        type="text"
        name="name"
        value={studentData.name}
        onChange={handleInputChange}
        placeholder="Name"
        className="w-full p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        name="surname"
        value={studentData.surname}
        onChange={handleInputChange}
        placeholder="Surname"
        className="w-full p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        name="classes"
        value={studentData.classes}
        onChange={handleInputChange}
        placeholder="Classes"
        className="w-full p-2 border border-gray-300 rounded"
      />
      <textarea
        name="subjects"
        value={studentData.subjects}
        onChange={handleInputChange}
        placeholder="Subjects"
        className="w-full p-2 border border-gray-300 rounded"
      />
      <input
        type="file"
        name="avatar"
        onChange={(e) =>
          setStudentData({
            ...studentData,
            avatar: e.target.files?.[0]?.name || '',
          })
        }
        className="w-full p-2 border border-gray-300 rounded"
      />
      <button
        type="button"
        onClick={handleSave}
        className="w-full p-2 bg-green-500 text-white rounded"
      >
        Add Student
      </button>
    </form>
  );
};

export default NewStudentForm;
