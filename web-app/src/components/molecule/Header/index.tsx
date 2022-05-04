import ReactDOMServer from 'react-dom/server';
import JsPDF from 'jspdf';
import {
  AppBar, Avatar, Button, Container, Menu, MenuItem, Stack, Toolbar, Typography,
} from '@mui/material';
import { useActions } from 'hooks';
import { MouseEvent, useState } from 'react';

const doc = new JsPDF();
interface Props {
    name: string;
}

export const Header = ({ name }: Props) => {
  const { logout } = useActions();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const download = () => {
    handleClose();
    doc.html(ReactDOMServer.renderToStaticMarkup(
      <div style={{ padding: '20px' }}>
        <h4>{name}</h4>
        <p>Boday Text</p>
      </div>,
    ), {
      callback: () => doc.save('gaanCV.pdf'),
    });
  };

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Stack
            flex={1}
            flexDirection="row"
            alignItems="flex-start"

          >
            <Typography
              variant="h5"
            >
              Talents
            </Typography>
          </Stack>
          <Stack
            flex={1}
            flexDirection="row"
            justifyContent="flex-end"
          >
            <Button
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              color="inherit"
              onClick={handleClick}
            >
              {name}
            </Button>
            <Avatar
              sx={{
                color: 'blue',
                bgcolor: 'white',
                marginLeft: 1,
              }}
            >
              {name.charAt(0)}
            </Avatar>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={download}>Download CV</MenuItem>
              <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
