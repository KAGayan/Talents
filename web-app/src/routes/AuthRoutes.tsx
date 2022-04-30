import { LoginPage } from 'components';
import { Route, Routes } from 'react-router-dom';
import { AUTH_PATHS } from './paths';

export const AuthRoutes = () => (
  <Routes>
    <Route
      path="/"
      element={<LoginPage />}
    />
    <Route
      path={AUTH_PATHS.login}
      element={<LoginPage />}
    />
  </Routes>
);