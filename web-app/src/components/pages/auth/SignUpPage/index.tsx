import { Copyright } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
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
  TextField,
  Typography,
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import * as yup from 'yup';
import { PageContainer } from 'components/molecule';
import { AUTH_PATHS } from 'routes';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { emailSchema, passwordSchema } from 'utils';
import { useState } from 'react';

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
  const [accountType, setAccountType] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAccountType(event.target.value as string);
  };

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
            Sign Up
          </Typography>
          <Box
            onSubmit={handleSubmit(onSubmit)}
            component="form"
            noValidate
            sx={{ mt: 1 }}
          >
            <FormControl fullWidth>
              <InputLabel id="account-type-label">Choose account type</InputLabel>
              <Select
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
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
