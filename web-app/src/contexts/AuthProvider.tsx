import { USER_TYPE } from 'constant';
import { useMappedState } from 'hooks';
import {
  createContext, ReactNode, useEffect, useMemo,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { AGENCY_PATHS, APPLICANT_PATHS, AUTH_PATHS } from 'routes';
import { Auth } from 'types';

interface AuthContextType {
  auth?: Auth
  }

const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const {
    auth, user,
  } = useMappedState((state) => state.user);

  useEffect(() => {
    if (auth?.isAuthenticated && user?.userType === USER_TYPE.agency) {
      navigate(AGENCY_PATHS.home, { replace: true });
    }

    if (auth?.isAuthenticated && user?.userType === USER_TYPE.applicant) {
      navigate(APPLICANT_PATHS.home, { replace: true });
    }

    if (!auth) navigate(AUTH_PATHS.login, { replace: true });
  }, [auth, user]);

  const value = useMemo(() => ({ auth }), [auth]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
