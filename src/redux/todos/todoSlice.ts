import { createSlice } from '@reduxjs/toolkit';
import {
  fetchTodos,
  toggleTodo,
  deleteTodo,
  addTodo,
} from './thunks/todoThunks.ts';
import { Todo } from '../../types/types.ts';

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
