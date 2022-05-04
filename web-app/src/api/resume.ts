import { apiRequest } from 'api';
import { Resume as ResumeRespons } from 'types';

export const Resume = {
  get: () => apiRequest.post<ResumeRespons>(
    '/resume',
    {},
  ),
};
