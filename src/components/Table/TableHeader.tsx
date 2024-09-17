// components/TableHeader.tsx
import { FC } from 'react';

interface TableHeaderProps {
  sortKey: string | null;
  sortOrder: 'asc' | 'desc';
  handleSort: (key: string) => void;
  toggleSortOrder: () => void;
}

const TableHeader: FC<TableHeaderProps> = ({
  sortKey,
  sortOrder,
  handleSort,
  toggleSortOrder,
}) => (
  <tr>
    {['name', 'grade', 'subject', 'class', 'date'].map((key) => (
      <th key={key} className="p-2 text-left">
        <div
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => handleSort(key)}
        >
          <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
          {sortKey === key && (
            <button className="text-sm text-blue-500" onClick={toggleSortOrder}>
              {sortOrder === 'asc' ? '▲' : '▼'}
            </button>
          )}
          {/* Hover tooltip */}
          <span className="hidden group-hover:inline text-xs text-gray-500">
            Click to sort
          </span>
        </div>
      </th>
    ))}
  </tr>
);

export default TableHeader;
