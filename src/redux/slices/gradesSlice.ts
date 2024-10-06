import { createSlice } from '@reduxjs/toolkit';
import { fetchGrades } from '../thunks/gradesThunks.ts';
import { GradesState } from '../../types/types.ts';
import { RootState } from '../store.ts';

const initialState: GradesState = {
  grades: {},
  loading: false,
  error: null,
};

const gradesSlice = createSlice({
  name: 'grades',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGrades.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGrades.fulfilled, (state, action) => {
        state.grades = action.payload;
        state.loading = false;
      })
      .addCase(fetchGrades.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
// Selectors
export const selectGrades = (state: RootState) => state.grades.grades;
export const selectGradesLoading = (state: RootState) => state.grades.loading;
export const selectGradesError = (state: RootState) => state.grades.error;

export default gradesSlice.reducer;
