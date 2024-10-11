import { createSlice } from '@reduxjs/toolkit';
import { fetchGrades } from './thunks/gradesThunks.ts';
import { GradesState } from '../../types/types.ts';

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

export default gradesSlice.reducer;
