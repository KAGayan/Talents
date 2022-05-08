import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiService } from 'api';
import {
  Auth, LoginReqest, RegisterReqest, User,
} from 'types';

export const login = createAsyncThunk(
  'user/login',
  async (user: LoginReqest) => {
    const getUserInfo = await apiService.User.login(user);
    return getUserInfo;
  },
);

export const register = createAsyncThunk(
  'user/register',
  async (user: RegisterReqest) => {
    const regiserNewUser = await apiService.User.register(user);
    return regiserNewUser;
  },
);

interface UserState {
  user?: User;
  auth?: Auth;
  loading: boolean;
  error?: Error;
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
      }).addCase(login.rejected, (state, action) => {
        state.user = undefined;
        state.auth = undefined;
        state.loading = false;
        state.error = new Error(action.error.message);
      })
      .addCase(register.pending, (state) => {
        state.user = undefined;
        state.auth = undefined;
        state.loading = true;
        state.error = undefined;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.auth = action.payload.auth;
        state.loading = false;
        state.error = undefined;
      })
      .addCase(register.rejected, (state, action) => {
        state.user = undefined;
        state.auth = undefined;
        state.loading = false;
        state.error = new Error(action.error.message);
      });
  },
});

export const userReducer = UserSlice.reducer;

export const userActions = { login, register, ...UserSlice.actions };
