import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  loginUser,
  updateUser,
  registerUser,
  logoutUser,
} from './thunks/authThunks.ts';
import { User } from '../../types/types.ts';

type AuthState = {
  isLoggedIn: boolean;
  user: User | null;
  error: string | null;
};

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
  error: null,
};

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

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
