import { createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../firebase/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

import { Grades } from '../../types/types';

//TO-DO
export const fetchGrades = createAsyncThunk(
  'grades/fetchGrades',
  async (_, { rejectWithValue }) => {
    try {
      const gradesRef = collection(db, 'grades');
      const snapshot = await getDocs(gradesRef);
      const grades: { [id: string]: Grades } = {};

      snapshot.forEach((doc) => {
        const data = doc.data();
        grades[doc.id] = { id: doc.id, ...data } as Grades;
      });

      return grades;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch grades');
    }
  }
);
