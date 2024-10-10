import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { StudentUtility as Student } from '../../types/types.ts';

interface TableHeaderProps {
  sortKey: keyof Student | null;
  sortOrder: 'asc' | 'desc';
  handleSort: (key: keyof Student) => void;
  toggleSortOrder: () => void;
}

const TableHeader: FC<TableHeaderProps> = ({
  sortKey,
  sortOrder,
  handleSort,
  toggleSortOrder,
}) => {
  const { t } = useTranslation();

  const handleHeaderClick = (key: keyof Student) => {
    if (sortKey === key) {
      toggleSortOrder();
    } else {
      handleSort(key);
    }
  };

  return (
    <tr>
      {(
        ['name', 'grade', 'subject', 'class', 'date'] as Array<keyof Student>
      ).map((key) => (
        <th
          key={key}
          className="p-2 text-left text-gray-700 dark:text-gray-300"
        >
          <div
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => handleHeaderClick(key)} // Use the new function here
          >
            <span>{t(`table.${key}`)}</span>
            {sortKey === key && (
              <span className="text-sm text-blue-500 dark:text-blue-300">
                {sortOrder === 'asc' ? '▲' : '▼'}
              </span>
            )}
            {/* Hover tooltip */}
            <span className="hidden group-hover:inline text-xs text-gray-500 dark:text-gray-400">
              {t('table.clickToSort')}
            </span>
          </div>
        </th>
      ))}
    </tr>
  );
};

export default TableHeader;
