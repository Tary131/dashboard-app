import { createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../firebase/firebaseConfig';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { getCurrentTimestamp } from '../helpers/timestamp';
import { Class } from '../../types/types';

export const addClass = createAsyncThunk(
  'classes/addClass',
  async (
    classData: Omit<Class, 'id' | 'createdAt' | 'updatedAt'>,
    { rejectWithValue }
  ) => {
    const timestamp = getCurrentTimestamp();

    try {
      const subjectRef = doc(collection(db, 'classes'));
      const subjectWithTimestamps: Class = {
        ...classData,
        id: subjectRef.id,
        createdAt: timestamp,
        updatedAt: timestamp,
      };

      await setDoc(subjectRef, subjectWithTimestamps);
      return subjectWithTimestamps;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to add class');
    }
  }
);

export const fetchClasses = createAsyncThunk(
  'classes/fetchClasses',
  async (_, { rejectWithValue }) => {
    try {
      const classesRef = collection(db, 'classes');
      const snapshot = await getDocs(classesRef);
      const classes: { [id: string]: Class } = {};
      snapshot.forEach((doc) => {
        const data = doc.data();
        classes[doc.id] = { id: doc.id, ...data } as Class;
      });
      const totalCount = snapshot.size;
      return { classes, totalCount };
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch classes');
    }
  }
);
