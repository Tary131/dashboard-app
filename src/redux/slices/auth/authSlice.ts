import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { auth } from '../../../firebase/firebaseConfig.ts';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from 'firebase/auth';
import { RootState } from '../../store.ts';

type User = {
  id: string;
  email: string;
  name: string;
};

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  error: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
  error: null,
};

// Login
export const loginUser = createAsyncThunk(
  'auth/login',
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;
      return {
        id: user.uid,
        email: user.email || '',
        name: user.displayName || '',
      };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Registration
export const registerUser = createAsyncThunk(
  'auth/register',
  async (
    data: { email: string; password: string; name: string },
    { rejectWithValue }
  ) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;

      await updateProfile(user, { displayName: data.name });

      return { id: user.uid, email: user.email || '', name: data.name };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Update user data
export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async ({ name }: { name: string }, { rejectWithValue }) => {
    try {
      const user = auth.currentUser;
      if (user) {
        await updateProfile(user, { displayName: name });
        return { id: user.uid, name };
      } else {
        throw new Error('No user is currently authenticated');
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
      return {};
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isLoggedIn = !!action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state) => {
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      .addCase(updateUser.fulfilled, (state, action) => {
        if (state.user && state.user.id === action.payload.id) {
          state.user.name = action.payload.name;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.error = null;
      })

      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectUser = (state: RootState) => state.auth.user;
export const selectAuthError = (state: RootState) => state.auth.error;
export const { setUser } = authSlice.actions;
export default authSlice.reducer;
