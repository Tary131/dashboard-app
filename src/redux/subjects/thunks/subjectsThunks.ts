import { createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../../firebase/firebaseConfig.ts';
import { Subject } from '../../../types/types.ts';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { getCurrentTimestamp } from '../../helpers/timestamp.ts';

// Fetching subjects
export const fetchSubjects = createAsyncThunk(
  'subjects/fetchSubjects', // Corrected action type
  async (_, { rejectWithValue }) => {
    try {
      const subjectsRef = collection(db, 'subjects');
      const snapshot = await getDocs(subjectsRef);
      const subjects: { [id: string]: Subject } = {};
      snapshot.forEach((doc) => {
        const data = doc.data();
        subjects[doc.id] = { id: doc.id, ...data } as Subject;
      });
      return subjects;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch subjects');
    }
  }
);

// Adding a subject
export const addSubject = createAsyncThunk(
  'subjects/addSubject',
  async (
    subjectData: Omit<Subject, 'id' | 'createdAt' | 'updatedAt'>,
    { rejectWithValue }
  ) => {
    const timestamp = getCurrentTimestamp();

    try {
      const subjectRef = doc(collection(db, 'subjects'));
      const subjectWithTimestamps: Subject = {
        ...subjectData,
        id: subjectRef.id,
        createdAt: timestamp,
        updatedAt: timestamp,
      };

      await setDoc(subjectRef, subjectWithTimestamps);
      return subjectWithTimestamps;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to add subject');
    }
  }
);
