import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { db } from '../../firebase/firebaseConfig';
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from 'firebase/firestore';

interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end?: string;
  category: string;
}

interface CalendarState {
  events: CalendarEvent[];
  loading: boolean;
  error: string | null;
}

const initialState: CalendarState = {
  events: [],
  loading: false,
  error: null,
};

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
const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCalendarEvents.fulfilled, (state, action) => {
        state.events = action.payload;
        state.loading = false;
      })
      .addCase(fetchCalendarEvents.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(addCalendarEvent.fulfilled, (state, action) => {
        state.events.push(action.payload);
      })
      .addCase(updateCalendarEvent.fulfilled, (state, action) => {
        const index = state.events.findIndex(
          (event) => event.id === action.payload.id
        );
        if (index !== -1) {
          state.events[index] = {
            ...state.events[index],
            ...action.payload.event,
          };
        }
      })
      .addCase(deleteCalendarEvent.fulfilled, (state, action) => {
        state.events = state.events.filter(
          (event) => event.id !== action.payload
        );
      });
  },
});

export default calendarSlice.reducer;
