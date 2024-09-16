import { createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../firebase/firebaseConfig';
import { ref, set, get, child } from 'firebase/database';
import { Class } from '../../types/types';
import { getCurrentTimestamp } from '../helpers/timestamp';

export const addClass = createAsyncThunk(
  'classes/addClass',
  async (classData: Omit<Class, 'createdAt'>, { rejectWithValue }) => {
    const timestamp = getCurrentTimestamp();
    const classWithTimestamp: Class = {
      ...classData,
      createdAt: timestamp,
    };

    try {
      await set(ref(db, `classes/${classData.id}`), classWithTimestamp);
      return classWithTimestamp;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to add class');
    }
  }
);

export const fetchClasses = createAsyncThunk(
  'classes/fetchClasses',
  async (_, { rejectWithValue }) => {
    try {
      const dbRef = ref(db);
      const snapshot = await get(child(dbRef, 'classes'));
      if (snapshot.exists()) {
        return snapshot.val(); // Returning classes data
      } else {
        return {};
      }
    } catch (error: any) {
      return rejectWithValue('Failed to fetch classes');
    }
  }
);
