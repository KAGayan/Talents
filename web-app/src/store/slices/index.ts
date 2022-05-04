import { resumeActions, resumeReducer } from './Resume';
import { userReducer, userActions } from './UserSlice';

export const reducer = {
  user: userReducer,
  resume: resumeReducer,
};

export const actions = {
  ...userActions,
  ...resumeActions,
};
