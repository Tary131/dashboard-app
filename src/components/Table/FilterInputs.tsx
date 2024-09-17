import { FC, ChangeEvent } from 'react';

interface Filters {
  name: string;
  grade: string;
  subject: string;
  class: string;
  date: string;
}

interface FilterInputsProps {
  filters: Filters;
  handleFilterChange: (
    e: ChangeEvent<HTMLInputElement>,
    key: keyof Filters
  ) => void;
}

const FilterInputs: FC<FilterInputsProps> = ({
  filters,
  handleFilterChange,
}) => (
  <tr>
    <th className="p-2">
      <input
        type="text"
        placeholder="Filter by name"
        value={filters.name}
        onChange={(e) => handleFilterChange(e, 'name')}
        className="w-full p-2 border rounded"
      />
    </th>
    <th className="p-2">
      <input
        type="text"
        placeholder="Filter by grade"
        value={filters.grade}
        onChange={(e) => handleFilterChange(e, 'grade')}
        className="w-full p-2 border rounded"
      />
    </th>
    <th className="p-2">
      <input
        type="text"
        placeholder="Filter by subject"
        value={filters.subject}
        onChange={(e) => handleFilterChange(e, 'subject')}
        className="w-full p-2 border rounded"
      />
    </th>
    <th className="p-2">
      <input
        type="text"
        placeholder="Filter by class"
        value={filters.class}
        onChange={(e) => handleFilterChange(e, 'class')}
        className="w-full p-2 border rounded"
      />
    </th>
    <th className="p-2">
      <input
        type="text"
        placeholder="Filter by date"
        value={filters.date}
        onChange={(e) => handleFilterChange(e, 'date')}
        className="w-full p-2 border rounded"
      />
    </th>
  </tr>
);

export default FilterInputs;
