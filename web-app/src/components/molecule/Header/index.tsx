import {
  AppBar, Avatar, Button, Container, IconButton, Menu, MenuItem, Stack, Toolbar,
} from '@mui/material';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import { useNavigate } from 'react-router-dom';
import { useActions } from 'hooks';
import { MouseEvent, useState } from 'react';

interface Props {
    name: string;
    showBackBtn?: boolean;
}

export const Header = ({ name, showBackBtn }: Props) => {
  const navigate = useNavigate();
  const { logout } = useActions();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
              alt={name}
              sx={{
                marginLeft: 1,
              }}
            />
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
              <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
