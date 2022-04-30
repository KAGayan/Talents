import { apiRequest } from 'api';
import { env } from 'config';
import { AgencyUserRespons } from 'types';

export const Agency = {
  getAgencyUser: (userID: string) => apiRequest.get<AgencyUserRespons>(
    `/agency=id=${userID}&api_key=${env.API_KEY}&format=json`,
  ),
};
