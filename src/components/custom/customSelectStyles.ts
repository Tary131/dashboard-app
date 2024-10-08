export const customSelectStyles = {
  control: (base: any, state: any) => ({
    ...base,
    backgroundColor: state.isFocused
      ? 'bg-gray-900 dark:bg-gray-900'
      : 'bg-gray-800 dark:bg-gray-800',
    borderColor: state.isFocused ? '#4f46e5' : '#4b5563',
    color: '#fff',
    '&:hover': {
      borderColor: '#4f46e5',
    },
  }),
  menu: (base: any) => ({
    ...base,
    backgroundColor: '#1f2937',
    color: '#fff',
    maxHeight: '200px',
    overflowY: 'scroll', // todo scrolling bar
    zIndex: 100,
  }),
  singleValue: (base: any) => ({
    ...base,
    color: '#fff',
  }),
  option: (base: any, state: any) => ({
    ...base,
    backgroundColor: state.isFocused ? '#4f46e5' : '#1f2937',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#4f46e5',
    },
  }),
  placeholder: (base: any) => ({
    ...base,
    color: '#9CA3AF',
  }),
};
