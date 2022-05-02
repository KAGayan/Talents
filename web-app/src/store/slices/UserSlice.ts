import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiService } from 'api';
import { User } from 'types';

export const getUserById = createAsyncThunk(
  'user/getUser',
  async (userID: string) => {
    const getUserInfo = await apiService.User.getUser(userID);
    return getUserInfo;
  },
);

interface UserState {
  user?: User,
  loading: boolean,
}

const initialState: UserState = {
  user: undefined,
  loading: false,
};

const UserSlice = createSlice({
  name: 'getUser',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loading = false;
      });
  },
});

export const userSliceReducer = UserSlice.reducer;

export const userSliceActions = { getUserById };
