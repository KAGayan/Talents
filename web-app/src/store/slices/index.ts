import { userSliceReducer, userSliceActions } from './UserSlice';

export const reducer = {
  userSliceReducer,
};

export const actions = {
  ...userSliceActions,
};
