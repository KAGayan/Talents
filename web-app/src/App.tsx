import {
  AgencyHomePage, ApplicantHomePage, EditResumePage, LoginPage, SignUpPage,
} from 'components';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import {
  AGENCY_PATHS,
  APPLICANT_PATHS,
  AUTH_PATHS,
  PrivateRoute,
} from 'routes';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route
        path={AUTH_PATHS.signUpPage}
        element={<SignUpPage />}
      />
      <Route
        path={AUTH_PATHS.login}
        element={<LoginPage />}
      />
      <Route
        path={AGENCY_PATHS.home}
        element={<PrivateRoute><AgencyHomePage /></PrivateRoute>}
      />
      <Route
        path={APPLICANT_PATHS.home}
        element={<PrivateRoute><ApplicantHomePage /></PrivateRoute>}
      />
      <Route
        path={APPLICANT_PATHS.editResume}
        element={<PrivateRoute><EditResumePage /></PrivateRoute>}
      />
      <Route path="*" element={<LoginPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
