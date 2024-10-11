import { createSlice } from '@reduxjs/toolkit';
import { StudentsState } from '../../types/types.ts';
import {
  fetchStudents,
  fetchStudentById,
  addStudent,
  updateStudentWithGrades,
  deleteStudent,
} from './thunks/studentsThunks.ts';

const initialState: StudentsState = {
  students: {},
  totalCount: 0,
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
        state.students = action.payload.students;
        state.totalCount = action.payload.totalCount;
        state.loading = false;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch Student by ID
      .addCase(fetchStudentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudentById.fulfilled, (state, action) => {
        state.students[action.payload.id] = action.payload;
        state.loading = false;
      })
      .addCase(fetchStudentById.rejected, (state, action) => {
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
      .addCase(updateStudentWithGrades.fulfilled, (state, action) => {
        state.students[action.payload.id] = action.payload;
      })
      .addCase(updateStudentWithGrades.rejected, (state, action) => {
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
