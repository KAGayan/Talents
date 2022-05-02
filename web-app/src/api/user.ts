import { apiRequest } from 'api';
import { env } from 'config';
import { UserRespons } from 'types';

export const User = {
  getUser: (userID: string) => apiRequest.get<UserRespons>(
    `/user=id=${userID}&api_key=${env.API_KEY}&format=json`,
  ),
};
