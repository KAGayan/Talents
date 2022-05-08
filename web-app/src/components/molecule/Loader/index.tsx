import CircularProgress from '@mui/material/CircularProgress';
import { Grid } from '@mui/material';

interface Props {
  fullHeight?: boolean
}

export const Loader = ({ fullHeight }: Props) => (
  <Grid
    container
    justifyContent="center"
    alignContent="center"
    minHeight={fullHeight ? '100vh' : ''}
  >
    <CircularProgress />
  </Grid>
);
