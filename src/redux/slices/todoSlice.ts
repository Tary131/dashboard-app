import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { db } from '../../firebase/firebaseConfig.ts'; // Firestore config
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from 'firebase/firestore';

interface Todo {
  id: string;
  text: string;
  done: boolean;
}

interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}

const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null,
};

// Fetch todos
export const fetchTodos = createAsyncThunk(
  'todos/fetch',
  async (userId: string) => {
    const todoCollection = collection(db, `teachers/${userId}/todos`);
    const todoSnapshot = await getDocs(todoCollection);
    return todoSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Todo[];
  }
);

// Add to-do
export const addTodo = createAsyncThunk(
  'todos/add',
  async ({ userId, text }: { userId: string; text: string }) => {
    const newTodo: Omit<Todo, 'id'> = { text, done: false };
    const docRef = await addDoc(
      collection(db, `teachers/${userId}/todos`),
      newTodo
    );
    return { id: docRef.id, ...newTodo };
  }
);

// Update to-do
export const toggleTodo = createAsyncThunk(
  'todos/toggle',
  async ({
    userId,
    id,
    done,
  }: {
    userId: string;
    id: string;
    done: boolean;
  }) => {
    const todoRef = doc(db, `teachers/${userId}/todos`, id);
    await updateDoc(todoRef, { done: !done });
    return id;
  }
);

// Delete to-do
export const deleteTodo = createAsyncThunk(
  'todos/delete',
  async ({ userId, id }: { userId: string; id: string }) => {
    const todoRef = doc(db, `teachers/${userId}/todos`, id);
    await deleteDoc(todoRef);
    return id;
  }
);

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
        state.loading = false;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(toggleTodo.fulfilled, (state, action) => {
        const index = state.todos.findIndex(
          (todo) => todo.id === action.payload
        );
        if (index !== -1) {
          state.todos[index].done = !state.todos[index].done;
        }
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      });
  },
});

export default todoSlice.reducer;
