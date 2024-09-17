import { useState, useMemo, FC, ChangeEvent } from 'react';
import TableHeader from './TableHeader';
import FilterInputs from './FilterInputs';
import { sortData } from '../../utils/sorting.ts';
import { filterData } from '../../utils/filtering';

// Sample data
const sampleData = [
  {
    name: 'John Doe',
    grade: 90,
    subject: 'Math',
    class: 'A1',
    date: '2023-09-10',
  },
  {
    name: 'Jane Smith',
    grade: 85,
    subject: 'Science',
    class: 'B2',
    date: '2023-09-11',
  },
  {
    name: 'Sam Johnson',
    grade: 78,
    subject: 'History',
    class: 'A1',
    date: '2023-09-12',
  },
  {
    name: 'Lisa Brown',
    grade: 92,
    subject: 'English',
    class: 'C1',
    date: '2023-09-13',
  },
  {
    name: 'Tom Hanks',
    grade: 88,
    subject: 'Math',
    class: 'B2',
    date: '2023-09-14',
  },
];

const StudentsTable: FC = () => {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [filters, setFilters] = useState({
    name: '',
    grade: '',
    subject: '',
    class: '',
    date: '',
  });

  // Handle sorting
  const sortedData = useMemo(
    () => sortData(sampleData, sortKey, sortOrder),
    [sortKey, sortOrder]
  );

  // Handle filtering
  const filteredData = useMemo(
    () => filterData(sortedData, filters),
    [sortedData, filters]
  );

  // Handle sorting when a column header is clicked
  const handleSort = (key: string) => {
    setSortKey(key);
  };

  // Handle sort direction toggle
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  // Handle filter input change
  const handleFilterChange = (
    e: ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    setFilters({ ...filters, [key]: e.target.value });
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="table-auto w-full bg-white shadow-md rounded-lg">
        <thead>
          <TableHeader
            sortKey={sortKey}
            sortOrder={sortOrder}
            handleSort={handleSort}
            toggleSortOrder={toggleSortOrder}
          />
          <FilterInputs
            filters={filters}
            handleFilterChange={handleFilterChange}
          />
        </thead>
        <tbody>
          {filteredData.map((student, index) => (
            <tr key={index} className="border-t hover:bg-gray-100">
              <td className="p-2">{student.name}</td>
              <td className="p-2">{student.grade}</td>
              <td className="p-2">{student.subject}</td>
              <td className="p-2">{student.class}</td>
              <td className="p-2">{student.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentsTable;
