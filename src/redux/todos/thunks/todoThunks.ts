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
import { Todo } from '../../../types/types.ts';

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
