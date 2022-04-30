import { Container, Stack } from '@mui/material';
import { ReactElement } from 'react';
import { Header } from '../Header';
import ScrollToTop from '../Scroll';
import { classes } from './styles';

interface Props {
    children: ReactElement,
    showBackBtn?: boolean;
}

export const PageContainer = ({ children, showBackBtn }: Props) => {
  const authencticatedUser = false;
  return (
    <Stack sx={{
      ...classes.container,
    }}
    >
      {authencticatedUser && <Header name="User Name" showBackBtn={showBackBtn} />}
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
