import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiService } from 'api';
import { Auth, LoginReqest, User } from 'types';

export const login = createAsyncThunk(
  'user/login',
  async (user: LoginReqest) => {
    const getUserInfo = await apiService.User.login(user);
    return getUserInfo;
  },
);

interface UserState {
  user?: User;
  auth?: Auth;
  loading: boolean;
  error?: string;
}

const initialState: UserState = {
  user: undefined,
  auth: undefined,
  loading: false,
  error: undefined,
};

const UserSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = undefined;
      state.auth = undefined;
      state.loading = false;
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.user = undefined;
        state.auth = undefined;
        state.loading = true;
        state.error = undefined;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.auth = action.payload.auth;
        state.loading = false;
        state.error = undefined;
      }).addCase(login.rejected, (state) => {
        state.user = undefined;
        state.auth = undefined;
        state.loading = false;
        state.error = 'An error occurred please try again.';
      });
  },
});

export const userReducer = UserSlice.reducer;

export const userActions = { login, ...UserSlice.actions };