import { AgencyHomePage } from 'components';
import {
  Routes,
  Route,
} from 'react-router-dom';
import { AuthRoutes } from './AuthRoutes';
import { AGENCY_PATHS } from './paths';

export const AgencyRoutes = () => {
  const authencticatedUser = false;

  if (authencticatedUser) return <AuthRoutes />;

  return (
    <Routes>
      <Route path={AGENCY_PATHS.home} element={<AgencyHomePage />} />
    </Routes>
  );
};
