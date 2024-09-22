import { configureStore } from '@reduxjs/toolkit';
import studentsReducer from './slices/studentsSlice.ts';
import subjectsReducer from './slices/subjectsSlice.ts';
import classesReducer from './slices/classesSlice.ts';

export const store = configureStore({
  reducer: {
    students: studentsReducer,
    subjects: subjectsReducer,
    classes: classesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
