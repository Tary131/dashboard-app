import { createSlice } from '@reduxjs/toolkit';
import { SubjectsState } from '../../types/types';
import { addSubject, fetchSubjects } from '../thunks/subjectsThunks';
import { RootState } from '../store.ts';

const initialState: SubjectsState = {
  subjects: {},
  loading: false,
  error: null,
};

const subjectsSlice = createSlice({
  name: 'subjects',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubjects.fulfilled, (state, action) => {
        state.subjects = action.payload;
        state.loading = false;
      })
      .addCase(fetchSubjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addSubject.fulfilled, (state, action) => {
        state.subjects[action.payload.id] = action.payload;
      })
      .addCase(addSubject.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});
// Selectors
export const selectSubjects = (state: RootState) => state.subjects.subjects;
export const selectSubjectsLoading = (state: RootState) =>
  state.subjects.loading;
export const selectSubjectsError = (state: RootState) => state.subjects.error;
export default subjectsSlice.reducer;
