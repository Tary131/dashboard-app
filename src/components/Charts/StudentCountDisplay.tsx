import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchStudents } from '../../redux/thunks/studentsThunks';

const StudentCountDisplay: FC = () => {
  const dispatch = useAppDispatch();
  const { totalCount, loading, error } = useAppSelector(
    (state) => state.students
  );

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  if (loading) return <p>Loading students...</p>;
  if (error) return <p>Error: {error}</p>;

  return <p>{totalCount}</p>;
};

export default StudentCountDisplay;
