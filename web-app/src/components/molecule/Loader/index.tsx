import CircularProgress from '@mui/material/CircularProgress';
import { Grid } from '@mui/material';

export const Loader = () => (
  <Grid
    container
    justifyContent="center"
    alignContent="center"
    minHeight="100vh"
  >
    <CircularProgress />
  </Grid>
);
