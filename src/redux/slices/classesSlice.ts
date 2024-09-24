import { createSlice } from '@reduxjs/toolkit';
import { ClassesState } from '../../types/types';
import { addClass, fetchClasses } from '../thunks/classesThunks';

const initialState: ClassesState = {
  classes: {},
  totalCount: 0,
  loading: false,
  error: null,
};

const classesSlice = createSlice({
  name: 'classes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClasses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClasses.fulfilled, (state, action) => {

        state.classes = action.payload.classes;
        state.totalCount = action.payload.totalCount;
        state.loading = false;
      })
      .addCase(fetchClasses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addClass.fulfilled, (state, action) => {
        state.classes[action.payload.id] = action.payload;
      })
      .addCase(addClass.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export default classesSlice.reducer;
