import { AgencyHomePage } from 'components';
import { Route } from 'react-router-dom';
import { AGENCY_PATHS } from './paths';

export const AgencyRoutes = () => (
  <Route>
    <Route
      path={AGENCY_PATHS.home}
      element={<AgencyHomePage />}
    />
  </Route>
);
