import { createSlice } from '@reduxjs/toolkit';
import {
  fetchCalendarEvents,
  updateCalendarEvent,
  deleteCalendarEvent,
  addCalendarEvent,
} from './thunks/calendarThunks.ts';
import { CalendarEvent } from '../../types/types.ts';

type CalendarState = {
  events: CalendarEvent[];
  loading: boolean;
  error: string | null;
};

const initialState: CalendarState = {
  events: [],
  loading: false,
  error: null,
};

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
