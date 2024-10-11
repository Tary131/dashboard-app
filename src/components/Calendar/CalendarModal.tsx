import { useState, FC } from 'react';
import CardModal from '../CardModal.tsx';
import Input from '../custom/Input';
import Button from '../custom/Button';
import Select from 'react-select';
import { customSelectStyles } from '../custom/customSelectStyles.ts';
import { selectIsDarkMode } from '../../redux/darkMode/darkModeSlice.ts';
import { useAppSelector } from '../../redux/hooks';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { EventDetails } from '../../types/types';
import { CATEGORY_OPTIONS } from '../../constants/categoryOptions.ts';
import { CATEGORY_COLORS } from '../../constants/categoryColors.ts';

type CalendarModalProps = {
  onClose: () => void;
  onSave: (eventDetails: EventDetails) => void;
  defaultStart: string;
};

const CalendarModal: FC<CalendarModalProps> = ({
  onClose,
  onSave,
  defaultStart,
}) => {
  const { t } = useTranslation();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<{
    value: string;
    label: string;
  } | null>(CATEGORY_OPTIONS[0]);
  const [startTime, setStartTime] = useState(defaultStart);
  const [endTime, setEndTime] = useState('');
  const isDarkMode = useAppSelector(selectIsDarkMode);

  const handleSave = () => {
    if (!title.trim()) {
      toast.error('Title is required!');
      return;
    }
    const color = category ? CATEGORY_COLORS[category.value] : '';
    onSave({
      title,
      category: category?.value || '',
      start: startTime,
      end: endTime || undefined,
      color,
    });
    setTitle('');
    setCategory(CATEGORY_OPTIONS[0]);
  };

  return (
    <CardModal onClose={onClose}>
      <h2 className="text-xl mb-4 text-gray-900 dark:text-gray-100">
        {t('calendar.addEvent')}
      </h2>
      <Input
        className="mb-4"
        type="text"
        label="Event Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder={t('calendar.enterEvent')}
      />
      <label className="block mb-2 text-gray-900 dark:text-gray-100">
        {t('calendar.category')}
      </label>
      <Select
        className="mb-4"
        value={category}
        onChange={(option) => setCategory(option)}
        options={CATEGORY_OPTIONS}
        styles={customSelectStyles(isDarkMode)}
      />
      <label className="block mb-2 text-gray-900 dark:text-gray-100">
        {t('calendar.startTime')}
      </label>
      <Input
        className="mb-4"
        type="datetime-local"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
      />
      <label className="block mb-2 text-gray-900 dark:text-gray-100">
        {t('calendar.endTime')}
      </label>
      <Input
        className="mb-4"
        type="datetime-local"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
      />
      <div className="flex justify-end">
        <Button label={t('calendar.save')} onClick={handleSave} />
        <Button
          className="ml-4 bg-red-600 dark:bg-red-800 active:bg-red-600 dark:active:bg-red-600 "
          label={t('calendar.cancel')}
          onClick={onClose}
        />
      </div>
    </CardModal>
  );
};

export default CalendarModal;
