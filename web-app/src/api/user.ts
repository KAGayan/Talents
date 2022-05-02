import { apiRequest } from 'api';
import { LoginReqest, UserRespons } from 'types';

export const User = {
  login: (loginReqest: LoginReqest) => apiRequest.post<UserRespons>(
    '/login',
    loginReqest,
  ),
};
