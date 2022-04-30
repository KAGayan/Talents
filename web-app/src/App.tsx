import { BrowserRouter } from 'react-router-dom';
import {
  AgencyRoutes, ApplicantRoutes, APP_PATHS, AuthRoutes,
} from 'routes';

const App = () => (
  <>
    <BrowserRouter>
      <AuthRoutes />
    </BrowserRouter>
    <BrowserRouter basename={APP_PATHS.agency}>
      <AgencyRoutes />
    </BrowserRouter>
    <BrowserRouter basename={APP_PATHS.applicant}>
      <ApplicantRoutes />
    </BrowserRouter>
  </>
);

export default App;
