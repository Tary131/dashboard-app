import { useState, FC } from 'react';
import CardModal from '../CardModal.tsx';

interface CalendarModalProps {
  onClose: () => void;
  onSave: (eventDetails: {
    title: string;
    category: string;
    start: string;
    end?: string;
  }) => void;
  defaultStart: string;
}

const CalendarModal: FC<CalendarModalProps> = ({
  onClose,
  onSave,
  defaultStart,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Lesson');
  const [startTime, setStartTime] = useState(defaultStart);
  const [endTime, setEndTime] = useState('');

  const handleSave = () => {
    if (!title.trim()) {
      alert('Title is required!');
      return;
    }
    onSave({ title, category, start: startTime, end: endTime || undefined });
    setTitle('');
    setCategory('Lesson');
  };

  return (
    <CardModal onClose={onClose}>
      <h2 className="text-xl mb-4">Add Event</h2>
      <input
        className="w-full p-2 border border-gray-300 rounded mb-4"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Event Title"
      />
      <select
        className="w-full p-2 border border-gray-300 rounded mb-4"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="Lesson">Lesson</option>
        <option value="Test">Test</option>
        <option value="Meeting">Meeting</option>
      </select>
      <label className="block mb-2">Start Time:</label>
      <input
        className="w-full p-2 border border-gray-300 rounded mb-4"
        type="datetime-local"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
      />
      <label className="block mb-2">End Time:</label>
      <input
        className="w-full p-2 border border-gray-300 rounded mb-4"
        type="datetime-local"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
      />
      <div className="flex justify-end">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleSave}
        >
          Save
        </button>
        <button
          className="ml-4 bg-gray-300 text-gray-700 px-4 py-2 rounded"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </CardModal>
  );
};

export default CalendarModal;
