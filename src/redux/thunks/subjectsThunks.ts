import { createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../firebase/firebaseConfig';
import { ref, set, get, child } from 'firebase/database';
import { Subject } from '../../types/types';
import { getCurrentTimestamp } from '../helpers/timestamp';

export const addSubject = createAsyncThunk(
  'subjects/addSubject',
  async (subjectData: Omit<Subject, 'createdAt'>, { rejectWithValue }) => {
    const timestamp = getCurrentTimestamp();
    const subjectWithTimestamp: Subject = {
      ...subjectData,
      createdAt: timestamp,
    };

    try {
      await set(ref(db, `subjects/${subjectData.id}`), subjectWithTimestamp);
      return subjectWithTimestamp;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to add subject');
    }
  }
);

export const fetchSubjects = createAsyncThunk(
  'subjects/fetchSubjects',
  async (_, { rejectWithValue }) => {
    try {
      const dbRef = ref(db);
      const snapshot = await get(child(dbRef, 'subjects'));
      if (snapshot.exists()) {
        return snapshot.val(); // Returning subjects data
      } else {
        return {};
      }
    } catch (error: any) {
      return rejectWithValue('Failed to fetch subjects');
    }
  }
);
