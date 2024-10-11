import { StudentUtility as Student } from '../types/types.ts';

export const sortData = (
  data: Student[],
  sortKey: keyof Student | null,
  sortOrder: 'asc' | 'desc'
): Student[] => {
  return [...data].sort((a, b) => {
    if (!sortKey) return 0;
    const aValue = a[sortKey as keyof typeof a];
    const bValue = b[sortKey as keyof typeof b];
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortOrder === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    }
    return 0;
  });
};
