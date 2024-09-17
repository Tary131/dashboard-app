export const filterData = (data: any[], filters: any) => {
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
