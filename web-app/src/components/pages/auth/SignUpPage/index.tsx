import { Copyright } from '@mui/icons-material';
import {
  Alert,
  Avatar,
  Box,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputLabel,
  Link,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import * as yup from 'yup';
import { PageContainer } from 'components/molecule';
import { AGENCY_PATHS, APPLICANT_PATHS, AUTH_PATHS } from 'routes';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { emailSchema, passwordSchema } from 'utils';
import { useEffect, useState } from 'react';
import { useActions, useMappedState } from 'hooks';
import { useNavigate } from 'react-router-dom';
import { USER_TYPE } from 'constant';
import { LoadingButton } from '@mui/lab';

interface Inputs {
  accountType: string,
  email: string,
  newPassword: string,
  confirmPassword: string;
}

const schema = yup.object({
  accountType: yup.string().required('Please select the account type'),
  email: emailSchema,
  newPassword: passwordSchema,
  confirmPassword: yup.string()
    .oneOf([yup.ref('newPassword'), null], 'Passwords must match'),
}).required();

export const SignUpPage = () => {
  const navigate = useNavigate();
  const {
    loading, error, auth, user,
  } = useMappedState((state) => state.user);
  const { register: userRegiste } = useActions();
  const [accountType, setAccountType] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAccountType(event.target.value as string);
  };

  const {
    register, handleSubmit, formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => userRegiste(data);

  useEffect(() => {
    if (auth?.isAuthenticated && user?.userType === USER_TYPE.agency) {
      navigate(AGENCY_PATHS.home, { replace: true });
    }

    if (auth?.isAuthenticated && user?.userType === USER_TYPE.applicant) {
      navigate(APPLICANT_PATHS.home, { replace: true });
    }
  }, [auth, user]);

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
            Sign Up
          </Typography>
          {error && (
          <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity="error">
              {error.message}
            </Alert>
          </Stack>
          )}
          <Box
            onSubmit={handleSubmit(onSubmit)}
            component="form"
            noValidate
            sx={{ mt: 1 }}
          >
            <FormControl fullWidth>
              <InputLabel id="account-type-label">Choose account type</InputLabel>
              <Select
                disabled={loading}
                labelId="account-type-label"
                id="accountType"
                value={accountType}
                label="Choose Account Type"
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...register(
                  'accountType',
                  {
                    required: true,
                    onChange: handleChange,
                  },
                )}
                error={!!errors.accountType}
              >
                <MenuItem value="Agency">Agency</MenuItem>
                <MenuItem value="Applicant">Applicant</MenuItem>
              </Select>
              <FormHelperText
                error={!!errors.accountType}
              >
                {!!errors.accountType && errors.accountType?.message}
              </FormHelperText>
            </FormControl>
            <TextField
              disabled={loading}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email address"
              autoComplete="email"
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
              label="New password"
              type="password"
              id="newPassword"
              autoComplete="new-password"
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...register('newPassword', { required: true })}
              error={!!errors.newPassword}
              helperText={!!errors.newPassword && errors.newPassword.message}
            />
            <TextField
              disabled={loading}
              margin="normal"
              required
              fullWidth
              label="Confirm new password"
              type="password"
              id="confirmPassword"
              autoComplete="confirm-password"
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...register('confirmPassword', { required: true })}
              error={!!errors.confirmPassword}
              helperText={!!errors.confirmPassword && errors.confirmPassword.message}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              loading={loading}
            >
              Sign Up
            </LoadingButton>
            <Grid container>
              <Grid item xs display="flex" justifyContent="flex-end">
                <Link href={AUTH_PATHS.login} variant="body2">
                  Have an account? Sign in
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
