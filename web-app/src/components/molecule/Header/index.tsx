import {
  AppBar, Avatar, Container, IconButton, Stack, Toolbar, Typography,
} from '@mui/material';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import { useNavigate } from 'react-router-dom';

interface Props {
    name: string;
    showBackBtn?: boolean;
}

export const Header = ({ name, showBackBtn }: Props) => {
  const navigate = useNavigate();

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
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
          <Stack
            flex={1}
            flexDirection="row"
            alignItems="center"
            justifyContent="flex-end"
          >
            <Typography>
              {name}
            </Typography>
            <Avatar
              alt={name}
              sx={{
                marginLeft: 1,
              }}
            />
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
