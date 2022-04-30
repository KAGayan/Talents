import { ApplicantHomePage } from 'components';
import {
  Routes,
  Route,
} from 'react-router-dom';
import { AuthRoutes } from './AuthRoutes';
import { APPLICANT_PATHS } from './paths';

export const ApplicantRoutes = () => {
  const authencticatedUser = false;

  if (authencticatedUser) return <AuthRoutes />;

  return (
    <Routes>
      <Route path={APPLICANT_PATHS.home} element={<ApplicantHomePage />} />
    </Routes>
  );
};
