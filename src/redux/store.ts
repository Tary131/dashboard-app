import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import studentsReducer from './slices/studentsSlice.ts';
import subjectsReducer from './slices/subjectsSlice.ts';
import classesReducer from './slices/classesSlice.ts';
import gradesReducer from './slices/gradesSlice.ts';
import authReducer from './slices/auth/authSlice.ts';
import todoReducer from './slices/todoSlice.ts';
import calendarReducer from './slices/calendarSlice.ts';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // Persist only the auth slice
};
const persistedAuthReducer = persistReducer(persistConfig, authReducer);
export const store = configureStore({
  reducer: {
    students: studentsReducer,
    subjects: subjectsReducer,
    classes: classesReducer,
    grades: gradesReducer,
    auth: persistedAuthReducer,
    todos: todoReducer,
    calendar: calendarReducer,
  },
});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
