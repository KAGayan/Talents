import { Container, IconButton, Stack } from '@mui/material';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import { useMappedState } from 'hooks';
import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../Header';
import ScrollToTop from '../Scroll';
import { classes } from './styles';

interface Props {
    children: ReactElement | ReactElement[],
    showBackBtn?: boolean;
}

export const PageContainer = ({ children, showBackBtn }: Props) => {
  const navigate = useNavigate();
  const { auth, user } = useMappedState((state) => state.user);

  return (
    <Stack sx={{
      ...classes.container,
    }}
    >
      {auth?.isAuthenticated && <Header name={`${user?.firstName}`} />}
      <Stack
        sx={{
          ...classes.childrenWrapper,
        }}
      >
        <ScrollToTop>
          <Container maxWidth="xl">
            <Stack
              alignItems="flex-start"
              flex={1}
            >
              {showBackBtn && (
              <IconButton
                onClick={() => navigate(-1)}
              >
                <ArrowBackIosNewOutlinedIcon sx={{
                  color: 'white',
                }}
                />
              </IconButton>
              )}
            </Stack>
            {children}
          </Container>
        </ScrollToTop>
      </Stack>
    </Stack>

  );
};
