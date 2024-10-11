import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import studentsReducer from './students/studentsSlice.ts';
import subjectsReducer from './subjects/subjectsSlice.ts';
import classesReducer from './classes/classesSlice.ts';
import gradesReducer from './grades/gradesSlice.ts';
import authReducer from './auth/authSlice.ts';
import todoReducer from './todos/todoSlice.ts';
import calendarReducer from './calendar/calendarSlice.ts';
import darkModeReducer from './darkMode/darkModeSlice.ts';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
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
    darkMode: darkModeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
