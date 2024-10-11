import { createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../../firebase/firebaseConfig.ts';
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from 'firebase/firestore';
import { CalendarEvent } from '../../../types/types.ts';

// Fetch events
export const fetchCalendarEvents = createAsyncThunk(
  'calendar/fetch',
  async (userId: string) => {
    const eventCollection = collection(db, `teachers/${userId}/events`);
    const eventSnapshot = await getDocs(eventCollection);
    return eventSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as CalendarEvent[];
  }
);

// Add event
export const addCalendarEvent = createAsyncThunk(
  'calendar/add',
  async ({
    userId,
    event,
  }: {
    userId: string;
    event: Omit<CalendarEvent, 'id'>;
  }) => {
    const docRef = await addDoc(
      collection(db, `teachers/${userId}/events`),
      event
    );
    return { id: docRef.id, ...event };
  }
);

// Update event
export const updateCalendarEvent = createAsyncThunk(
  'calendar/update',
  async ({
    userId,
    id,
    event,
  }: {
    userId: string;
    id: string;
    event: Partial<CalendarEvent>;
  }) => {
    const eventRef = doc(db, `teachers/${userId}/events`, id);
    await updateDoc(eventRef, event);
    return { id, event };
  }
);

// Delete event
export const deleteCalendarEvent = createAsyncThunk(
  'calendar/delete',
  async ({ userId, id }: { userId: string; id: string }) => {
    const eventRef = doc(db, `teachers/${userId}/events`, id);
    await deleteDoc(eventRef);
    return id;
  }
);
