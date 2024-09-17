interface Student {
  name: string;
  grade: number;
  subject: string;
  class: string;
  date: string;
}
interface Filters {
  name: string;
  grade: string;
  subject: string;
  class: string;
  date: string;
}
export const filterData = (data: Student[], filters: Filters): Student[] => {
  return data.filter((row) => {
    return (
      row.name.toLowerCase().includes(filters.name.toLowerCase()) &&
      row.subject.toLowerCase().includes(filters.subject.toLowerCase()) &&
      row.class.toLowerCase().includes(filters.class.toLowerCase()) &&
      (filters.grade === '' || row.grade.toString().includes(filters.grade)) &&
      row.date.includes(filters.date)
    );
  });
};
