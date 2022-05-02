import { LoginPage, SignUpPage } from 'components';
import { Route } from 'react-router-dom';
import { AUTH_PATHS } from './paths';

export const AuthRoutes = () => (
  <Route>
    <Route
      path={AUTH_PATHS.signUpPage}
      element={<SignUpPage />}
    />
    <Route
      path={AUTH_PATHS.login}
      element={<LoginPage />}
    />
    <Route path="*" element={<LoginPage />} />
  </Route>
);
