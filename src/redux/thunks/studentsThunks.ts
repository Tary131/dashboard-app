import { createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../firebase/firebaseConfig';
import { Student } from '../../types/types';
import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  // arrayUnion,
} from 'firebase/firestore';
import { getCurrentTimestamp } from '../helpers/timestamp';

// Fetching students
export const fetchStudents = createAsyncThunk(
  'students/fetchStudents',
  async (_, { rejectWithValue }) => {
    try {
      const studentsRef = collection(db, 'students');
      const snapshot = await getDocs(studentsRef);
      const students: { [id: string]: Student } = {};
      snapshot.forEach((doc) => {
        students[doc.id] = { id: doc.id, ...doc.data() } as Student;
      });
      const totalCount = snapshot.size;
      return { students, totalCount };
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch students');
    }
  }
);
// Fetching a student by ID
export const fetchStudentById = createAsyncThunk(
  'students/fetchStudentById',
  async (id: string, { rejectWithValue }) => {
    try {
      const studentRef = doc(db, 'students', id);
      const studentDoc = await getDoc(studentRef);

      if (!studentDoc.exists()) {
        throw new Error('Student not found');
      }

      return { id: studentDoc.id, ...studentDoc.data() } as Student;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch student');
    }
  }
);

// Adding a student
export const addStudent = createAsyncThunk(
  'students/addStudent',
  async (
    studentData: Omit<Student, 'createdAt' | 'updatedAt' | 'id'>, // Omit `createdAt`, `updatedAt`, and `id`
    { rejectWithValue }
  ) => {
    const { ...data } = studentData;
    const timestamp = getCurrentTimestamp();

    const studentWithTimestamps: Omit<Student, 'id'> = {
      ...data,
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    try {
      // Generate a new document with an auto-ID in the "students" collection
      const studentRef = doc(collection(db, 'students'));
      await setDoc(studentRef, { ...studentWithTimestamps, id: studentRef.id });

      return { ...studentWithTimestamps, id: studentRef.id };
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to add student');
    }
  }
);

// Updating a student

export const updateStudentWithGrades = createAsyncThunk(
  'students/updateStudentWithGrades',
  async (
    {
      studentId,
      newGrades,
    }: {
      studentId: string;
      newGrades: { subjectId: string; grade: string; description: string }[];
    },
    { getState, rejectWithValue }
  ) => {
    const timestamp = getCurrentTimestamp();

    try {
      const state = getState() as {
        students: { students: { [key: string]: Student } };
      };
      const existingStudent = state.students.students[studentId];

      if (!existingStudent) throw new Error('Student not found');

      const studentRef = doc(db, 'students', studentId);

      const existingGrades = existingStudent.subjectGrades || [];

      const gradesWithTimestamps = newGrades.map((grade) => ({
        ...grade,
        createdAt: timestamp,
        updatedAt: timestamp,
      }));

      const updatedGrades = [...existingGrades, ...gradesWithTimestamps];

      const updatedData = {
        ...existingStudent,
        subjectGrades: updatedGrades,
        updatedAt: timestamp,
      };

      await updateDoc(studentRef, updatedData);

      return updatedData;
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
      const studentRef = doc(db, 'students', studentId);
      await deleteDoc(studentRef);
      return studentId;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to delete student');
    }
  }
);
