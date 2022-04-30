import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiService } from 'api';
import { UserInfo } from 'types';

export const getAgencyUserById = createAsyncThunk(
  'agency/profile',
  async (userID: string) => {
    const getUserInfo = await apiService.Agency.getAgencyUser(userID);
    return getUserInfo;
  },
);

interface AlbumsState {
  userInfo?: UserInfo,
  loading: boolean,
}

const initialState: AlbumsState = {
  userInfo: undefined,
  loading: false,
};

const AgencySlice = createSlice({
  name: 'getUserInfo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAgencyUserById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAgencyUserById.fulfilled, (state, action) => {
        state.userInfo = action.payload.userInfo;
        state.loading = false;
      });
  },
});

export const agencySliceReducer = AgencySlice.reducer;

export const agencySliceActions = { getAgencyUserById };
