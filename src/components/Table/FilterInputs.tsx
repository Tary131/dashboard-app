import { FC, ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Filters } from '../../types/types';

type FilterInputsProps = {
  filters: Filters;
  handleFilterChange: (
    e: ChangeEvent<HTMLInputElement>,
    key: keyof Filters
  ) => void;
};

const FilterInputs: FC<FilterInputsProps> = ({
  filters,
  handleFilterChange,
}) => {
  const { t } = useTranslation();
  return (
    <tr>
      <th className="p-2">
        <input
          type="text"
          placeholder={t('table.filterByName')}
          value={filters.name}
          onChange={(e) => handleFilterChange(e, 'name')}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
        />
      </th>
      <th className="p-2">
        <input
          type="text"
          placeholder={t('table.filterByGrade')}
          value={filters.grade}
          onChange={(e) => handleFilterChange(e, 'grade')}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
        />
      </th>
      <th className="p-2">
        <input
          type="text"
          placeholder={t('table.filterBySubject')}
          value={filters.subject}
          onChange={(e) => handleFilterChange(e, 'subject')}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
        />
      </th>
      <th className="p-2">
        <input
          type="text"
          placeholder={t('table.filterByClass')}
          value={filters.class}
          onChange={(e) => handleFilterChange(e, 'class')}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
        />
      </th>
      <th className="p-2">
        <input
          type="text"
          placeholder={t('table.filterByDate')}
          value={filters.date}
          onChange={(e) => handleFilterChange(e, 'date')}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
        />
      </th>
    </tr>
  );
};

export default FilterInputs;
