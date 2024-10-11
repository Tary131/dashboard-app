import { useState, useMemo, FC, ChangeEvent } from 'react';
import TableHeader from './TableHeader';
import FilterInputs from './FilterInputs';
import { sortData } from '../../utils/sorting';
import { filterData } from '../../utils/filtering';
import formattedStudentData from '../../hooks/FormattedStudentData.ts';
import { StudentUtility as Student } from '../../types/types';

const StudentsTable: FC = () => {
  const [sortKey, setSortKey] = useState<keyof Student | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [filters, setFilters] = useState({
    name: '',
    grade: '',
    subject: '',
    class: '',
    date: '',
  });

  const { formattedData, loading, error } = formattedStudentData();

  const sortedData = useMemo(
    () =>
      formattedData.length > 0
        ? sortData(formattedData, sortKey, sortOrder)
        : [],
    [formattedData, sortKey, sortOrder]
  );

  const filteredData = useMemo(
    () => (sortedData.length > 0 ? filterData(sortedData, filters) : []),
    [sortedData, filters]
  );

  const handleSort = (key: keyof Student) => {
    setSortKey(key);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleFilterChange = (
    e: ChangeEvent<HTMLInputElement>,
    key: keyof Student
  ) => {
    setFilters({ ...filters, [key]: e.target.value });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="table-auto w-full bg-white dark:bg-gray-800 shadow-md rounded-lg">
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
          {filteredData.length === 0 ? (
            <tr>
              <td
                colSpan={5}
                className="text-center p-4 text-gray-700 dark:text-gray-300"
              >
                No data available
              </td>
            </tr>
          ) : (
            filteredData.map((student, index) => (
              <tr
                key={index}
                className="border-t dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <td className="p-2 text-gray-900 dark:text-gray-200">
                  {student.name}
                </td>
                <td className="p-2 text-gray-900 dark:text-gray-200">
                  {student.grade ?? 'N/A'}
                </td>
                <td className="p-2 text-gray-900 dark:text-gray-200">
                  {student.subject ?? 'N/A'}
                </td>
                <td className="p-2 text-gray-900 dark:text-gray-200">
                  {student.class ?? 'N/A'}
                </td>
                <td className="p-2 text-gray-900 dark:text-gray-200">
                  {student.date}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentsTable;
