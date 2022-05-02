import { ApplicantHomePage } from 'components';
import { Route } from 'react-router-dom';
import { APPLICANT_PATHS } from './paths';

export const ApplicantRoutes = () => (
  <Route>
    <Route
      path={APPLICANT_PATHS.home}
      element={<ApplicantHomePage />}
    />
  </Route>
);
