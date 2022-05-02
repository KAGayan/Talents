import { Copyright } from '@mui/icons-material';
import {
  Avatar, Box, Button, Checkbox, Container, FormControlLabel, Grid, Link, TextField, Typography,
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { PageContainer } from 'components';
import { AUTH_PATHS } from 'routes';
import { emailSchema, passwordSchema } from 'utils';

interface Inputs {
  email: string,
  password: string,
}

const schema = yup.object({
  email: emailSchema,
  password: passwordSchema,
}).required();

export const LoginPage = () => {
  const {
    register, handleSubmit, formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

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
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
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
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
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
