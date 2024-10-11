export const customSelectStyles = (isDarkMode: boolean) => ({
  control: (base: any, state: any) => ({
    ...base,
    backgroundColor: state.isFocused
      ? isDarkMode
        ? '#1a1a1a' // dark mode focus background
        : '#f3f4f6' // light mode focus background
      : isDarkMode
        ? '#374151' // dark mode default background
        : '#ffffff', // light mode default background
    borderColor: state.isFocused
      ? '#4f46e5' // focus border
      : isDarkMode
        ? '#4b5563' // dark mode border
        : '#d1d5db', // light mode border
    color: isDarkMode ? '#ffffff' : '#1f2937', // text color
    '&:hover': {
      borderColor: isDarkMode ? '#4f46e5' : '#3B82F6', // hover border color
    },
  }),
  menu: (base: any) => ({
    ...base,
    backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff', // dark/light mode background
    color: isDarkMode ? '#ffffff' : '#1f2937', // text color
    overflowY: 'scroll',
    zIndex: 100,
  }),
  singleValue: (base: any) => ({
    ...base,
    color: isDarkMode ? '#ffffff' : '#1f2937', // single value text color
  }),
  option: (base: any, state: any) => ({
    ...base,
    backgroundColor: state.isFocused
      ? isDarkMode
        ? '#4f46e5' // Dark mode focused option background
        : '#3B82F6' // Light mode focused option background
      : isDarkMode
        ? '#1F2937' // Dark mode option background
        : '#FFFFFF',
    color: isDarkMode ? '#ffffff' : '#1f2937', // option text color
    '&:hover': {
      backgroundColor: isDarkMode ? '#4f46e5' : '#3B82F6', // hover background color
    },
  }),
  placeholder: (base: any) => ({
    ...base,
    color: isDarkMode ? '#9CA3AF' : '#6B7280', // placeholder color
  }),
});
