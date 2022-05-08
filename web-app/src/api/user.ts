import { apiRequest } from 'api';
import {
  LoginReqest, RegisterReqest, UserRespons,
} from 'types';

export const User = {
  login: (loginReqest: LoginReqest) => apiRequest.post<UserRespons>(
    '/login',
    loginReqest,
  ),
  register: (registerReqest: RegisterReqest) => apiRequest.post<UserRespons>(
    '/register',
    registerReqest,
  ),
};
