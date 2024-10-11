import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchClasses } from '../../redux/classes/thunks/classesThunks.ts';
import {
  selectClassesError,
  selectClassesLoading,
  selectTotalCount,
} from '../../redux/selectors';

const ClassCountDisplay: FC = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectClassesError);
  const loading = useAppSelector(selectClassesLoading);
  const totalCount = useAppSelector(selectTotalCount);
  useEffect(() => {
    dispatch(fetchClasses());
  }, [dispatch]);

  if (loading) return <p>Loading Classes...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <p className="text-center text-9xl font-bold mt-9 text-emerald-700">
      {totalCount}
    </p>
  );
};

export default ClassCountDisplay;
