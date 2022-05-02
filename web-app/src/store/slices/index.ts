import { userReducer, userActions } from './UserSlice';

export const reducer = {
  user: userReducer,
};

export const actions = {
  ...userActions,
};
