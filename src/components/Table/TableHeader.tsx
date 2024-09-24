import { FC } from 'react';

interface Student {
  name: string;
  grade: number;
  subject: string;
  class: string;
  date: string;
}

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
}) => (
  <tr>
    {(
      ['name', 'grade', 'subject', 'class', 'date'] as Array<keyof Student>
    ).map((key) => (
      <th key={key} className="p-2 text-left text-gray-700 dark:text-gray-300">
        <div
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => handleSort(key)}
        >
          <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
          {sortKey === key && (
            <button
              className="text-sm text-blue-500 dark:text-blue-300"
              onClick={toggleSortOrder}
            >
              {sortOrder === 'asc' ? '▲' : '▼'}
            </button>
          )}
          {/* Hover tooltip */}
          <span className="hidden group-hover:inline text-xs text-gray-500 dark:text-gray-400">
            Click to sort
          </span>
        </div>
      </th>
    ))}
  </tr>
);

export default TableHeader;
