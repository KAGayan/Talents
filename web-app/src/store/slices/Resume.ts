import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiService } from 'api';
import { Resume } from 'types';

export const getResume = createAsyncThunk(
  'resume/get',
  async () => {
    const resume = await apiService.Resume.get();
    return resume;
  },
);

interface ResumeState {
  resume?: Resume;
  loading: boolean;
  error?: string;
}

const initialState: ResumeState = {
  resume: undefined,
  loading: false,
  error: undefined,
};

const ResumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getResume.pending, (state) => {
        state.resume = undefined;
        state.loading = true;
        state.error = undefined;
      })
      .addCase(getResume.fulfilled, (state, action) => {
        state.resume = action.payload;
        state.loading = false;
        state.error = undefined;
      }).addCase(getResume.rejected, (state) => {
        state.resume = undefined;
        state.loading = false;
        state.error = 'An error occurred please try again.';
      });
  },
});

export const resumeReducer = ResumeSlice.reducer;

export const resumeActions = { getResume, ...ResumeSlice.actions };
