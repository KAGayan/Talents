import {
  Container, IconButton, Stack,
} from '@mui/material';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import { useMappedState } from 'hooks';
import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../Header';
import ScrollToTop from '../Scroll';
import { classes } from './styles';

interface Props {
    children: ReactElement | ReactElement[],
    compact?: boolean;
    showBackBtn?: boolean;
}

export const PageContainer = ({ children, compact, showBackBtn }: Props) => {
  const navigate = useNavigate();
  const { auth, user } = useMappedState((state) => state.user);

  return (
    <Stack sx={{
      ...classes.container,
    }}
    >
      {auth?.isAuthenticated && <Header name={`${user?.userName}`} />}
      {showBackBtn && (
      <Stack
        position="fixed"
        mt={8}
        mb={2}
        width="100%"
        maxWidth={compact ? 'md' : 'xl'}
      >
        <IconButton
          sx={{
            width: 45,
            mr: 1,
          }}
          onClick={() => navigate(-1)}
        >
          <ArrowBackIosNewOutlinedIcon />
        </IconButton>
      </Stack>
      )}
      <Stack
        sx={{
          ...classes.childrenWrapper,
        }}
      >
        <ScrollToTop>
          <Container maxWidth={compact ? 'md' : 'xl'}>
            {children}
          </Container>
        </ScrollToTop>
      </Stack>
    </Stack>

  );
};
