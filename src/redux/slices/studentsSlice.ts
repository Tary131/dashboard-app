import { createSlice } from '@reduxjs/toolkit';
import { StudentsState } from '../../types/types';
import {
  fetchStudents,
  addStudent,
  updateStudent,
  deleteStudent,
} from '../thunks/studentsThunks.ts';

const initialState: StudentsState = {
  students: {},
  loading: false,
  error: null,
};

const studentsSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Students
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.students = action.payload;
        state.loading = false;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Add student
      .addCase(addStudent.fulfilled, (state, action) => {
        state.students[action.payload.id] = action.payload;
      })
      .addCase(addStudent.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      // Update student
      .addCase(updateStudent.fulfilled, (state, action) => {
        state.students[action.payload.id] = action.payload;
      })
      .addCase(updateStudent.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      // Delete student
      .addCase(deleteStudent.fulfilled, (state, action) => {
        delete state.students[action.payload];
      })
      .addCase(deleteStudent.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export default studentsSlice.reducer;
