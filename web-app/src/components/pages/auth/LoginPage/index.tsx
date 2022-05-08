import { Copyright } from '@mui/icons-material';
import {
  Alert,
  Avatar,
  Box,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Link,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import LockIcon from '@mui/icons-material/Lock';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { PageContainer } from 'components';
import { AUTH_PATHS } from 'routes';
import { emailSchema, passwordSchema } from 'utils';
import { useActions, useMappedState } from 'hooks';

interface Inputs {
  email: string,
  password: string,
}

const schema = yup.object({
  email: emailSchema,
  password: passwordSchema,
}).required();

export const LoginPage = () => {
  const { login } = useActions();
  const {
    loading, error,
  } = useMappedState((state) => state.user);
  const {
    register, handleSubmit, formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const request = {
      username: data.email,
      password: data.password,
    };
    login(request);
  };

  return (
    <PageContainer>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {error && (
          <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity="error">
              {error.message}
            </Alert>
          </Stack>
          )}
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              disabled={loading}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email address"
              autoComplete="email"
              autoFocus
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...register('email', { required: true })}
              error={!!errors.email}
              helperText={!!errors.email && errors.email.message}
            />
            <TextField
              disabled={loading}
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...register('password', { required: true })}
              error={!!errors.password}
              helperText={!!errors.password && 'Password is required'}
            />
            <FormControlLabel
              control={(
                <Checkbox
                  value="remember"
                  color="primary"
                  disabled={loading}
                />
            )}
              label="Remember me"
            />
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              loading={loading}
            >
              Sign In
            </LoadingButton>
            <Grid container>
              <Grid item xs>
                <Link href="/" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href={AUTH_PATHS.signUpPage} variant="body2">
                  Don&rsquo;t have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </PageContainer>
  );
};
