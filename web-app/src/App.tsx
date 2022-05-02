import {
  AgencyHomePage, ApplicantHomePage, LoginPage, SignUpPage,
} from 'components';
import { AuthProvider } from 'contexts';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import {
  AGENCY_PATHS,
  APPLICANT_PATHS,
  AUTH_PATHS,
} from 'routes';

const App = () => (
  <BrowserRouter>
    <AuthProvider>
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
          element={<AgencyHomePage />}
        />
        <Route
          path={APPLICANT_PATHS.home}
          element={<ApplicantHomePage />}
        />
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);

export default App;
