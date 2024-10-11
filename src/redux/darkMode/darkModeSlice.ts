import { createSlice } from '@reduxjs/toolkit';

type DarkModeState = {
  isDarkMode: boolean;
};

const initialState: DarkModeState = {
  isDarkMode: false,
};

const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState,
  reducers: {
    toggleDarkMode(state) {
      state.isDarkMode = !state.isDarkMode;
      localStorage.setItem('theme', state.isDarkMode ? 'dark' : 'light');
    },
    setDarkMode(state, action) {
      state.isDarkMode = action.payload;
      localStorage.setItem('theme', action.payload ? 'dark' : 'light');
    },
  },
});

export const { toggleDarkMode, setDarkMode } = darkModeSlice.actions;
export const selectIsDarkMode = (state: { darkMode: DarkModeState }) =>
  state.darkMode.isDarkMode;

export default darkModeSlice.reducer;
