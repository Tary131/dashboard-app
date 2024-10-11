import { createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../firebase/firebaseConfig';
import { Student } from '../../types/types';
import { ref, set, get, child, remove } from 'firebase/database';
import { getCurrentTimestamp } from '../helpers/timestamp';

// Fetching students
export const fetchStudents = createAsyncThunk(
  'students/fetchStudents',
  async (_, { rejectWithValue }) => {
    try {
      const dbRef = ref(db);
      const snapshot = await get(child(dbRef, 'students'));
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        return {};
      }
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch students');
    }
  }
);

// Adding a student
export const addStudent = createAsyncThunk(
  'students/addStudent',
  async (
    studentData: Omit<Student, 'createdAt' | 'updatedAt'>,
    { rejectWithValue }
  ) => {
    const { id, ...data } = studentData;
    const timestamp = getCurrentTimestamp();

    const studentWithTimestamps: Student = {
      ...data,
      id,
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    try {
      await set(ref(db, `students/${id}`), studentWithTimestamps);
      return studentWithTimestamps;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to add student');
    }
  }
);

// Updating a student
export const updateStudent = createAsyncThunk(
  'students/updateStudent',
  async (
    studentData: Omit<Student, 'createdAt'>,
    { getState, rejectWithValue }
  ) => {
    const { id, ...data } = studentData;
    const timestamp = getCurrentTimestamp();

    try {
      const state = getState() as {
        students: { students: { [key: string]: Student } };
      };
      const existingStudent = state.students.students[id];

      if (!existingStudent) throw new Error('Student not found');

      const updatedStudent: Student = {
        ...data,
        id,
        createdAt: existingStudent.createdAt,
        updatedAt: timestamp,
      };

      await set(ref(db, `students/${id}`), updatedStudent);
      return updatedStudent;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to update student');
    }
  }
);

// Deleting a student
export const deleteStudent = createAsyncThunk(
  'students/deleteStudent',
  async (studentId: string, { rejectWithValue }) => {
    try {
      await remove(ref(db, `students/${studentId}`));
      return studentId;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to delete student');
    }
  }
);
