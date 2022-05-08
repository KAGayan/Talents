import { useMappedState } from 'hooks';
import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { AUTH_PATHS } from './paths';

interface Props {
    children: ReactElement;
}

export const PrivateRoute = ({ children }: Props): ReactElement => {
  const {
    auth,
  } = useMappedState((state) => state.user);

  if (!auth?.isAuthenticated) return <Navigate to={AUTH_PATHS.login} />;

  return children;
};
