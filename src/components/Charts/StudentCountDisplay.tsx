import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchStudents } from '../../redux/thunks/studentsThunks';
import {
  selectStudentsError,
  selectStudentsLoading,
  selectStudentsTotalCount,
} from '../../redux/slices/studentsSlice.ts';

const StudentCountDisplay: FC = () => {
  const dispatch = useAppDispatch();
  const totalCount = useAppSelector(selectStudentsTotalCount);
  const loading = useAppSelector(selectStudentsLoading);
  const error = useAppSelector(selectStudentsError);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  if (loading) return <p>Loading students...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <p className="text-center text-9xl font-bold mt-9 text-purple-800">
      {totalCount}
    </p>
  );
};

export default StudentCountDisplay;
