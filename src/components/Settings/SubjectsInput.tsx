import { FC, ChangeEvent } from 'react';

interface SubjectsInputProps {
  subjects: string[];
  handleSubjectsChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SubjectsInput: FC<SubjectsInputProps> = ({
  subjects,
  handleSubjectsChange,
}) => (
  <div className="flex flex-col">
    <label htmlFor="subjects" className="font-semibold">
      Subjects:
    </label>
    <input
      type="text"
      name="subjects"
      value={subjects.join(', ')}
      onChange={handleSubjectsChange}
      className="border p-2 rounded-md"
    />
    <small className="text-gray-600">Separate subjects with commas</small>
  </div>
);

export default SubjectsInput;
