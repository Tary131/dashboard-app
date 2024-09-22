import { useState, useMemo, FC, ChangeEvent } from 'react';
import TableHeader from './TableHeader';
import FilterInputs from './FilterInputs';
import { sortData } from '../../utils/sorting';
import { filterData } from '../../utils/filtering';
import useFormattedStudentData from './FormattedStudentData.tsx';

interface Student {
  name: string;
  grade: number;
  subject: string;
  class: string;
  date: string;
}

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

  const { formattedData, loading, error } = useFormattedStudentData();

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
          {filteredData.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center p-4">
                No data available
              </td>
            </tr>
          ) : (
            filteredData.map((student, index) => (
              <tr key={index} className="border-t hover:bg-gray-100">
                <td className="p-2">{student.name}</td>
                <td className="p-2">{student.grade}</td>
                <td className="p-2">{student.subject}</td>
                <td className="p-2">{student.class}</td>
                <td className="p-2">{student.date}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentsTable;
