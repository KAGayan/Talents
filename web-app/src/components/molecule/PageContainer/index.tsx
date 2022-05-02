import { Container, Stack } from '@mui/material';
import { useMappedState } from 'hooks';
import { ReactElement } from 'react';
import { Header } from '../Header';
import ScrollToTop from '../Scroll';
import { classes } from './styles';

interface Props {
    children: ReactElement,
    showBackBtn?: boolean;
}

export const PageContainer = ({ children, showBackBtn }: Props) => {
  const { auth, user } = useMappedState((state) => state.user);

  return (
    <Stack sx={{
      ...classes.container,
    }}
    >
      {auth?.isAuthenticated && <Header name={`${user?.name}`} showBackBtn={showBackBtn} />}
      <Stack
        sx={{
          ...classes.childrenWrapper,
        }}
      >
        <ScrollToTop>
          <Container maxWidth="xl">
            {children}
          </Container>
        </ScrollToTop>
      </Stack>
    </Stack>

  );
};
