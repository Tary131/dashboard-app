import { configureStore } from '@reduxjs/toolkit';
import studentsReducer from './slices/studentsSlice.ts';
import subjectsReducer from './slices/subjectsSlice.ts';
import classesReducer from './slices/classesSlice.ts';
import gradesReducer from './slices/gradesSlice.ts';
import authReducer from './slices/auth/authSlice.ts';
import todoReducer from './slices/todoSlice.ts';

export const store = configureStore({
  reducer: {
    students: studentsReducer,
    subjects: subjectsReducer,
    classes: classesReducer,
    grades: gradesReducer,
    auth: authReducer,
    todos: todoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
