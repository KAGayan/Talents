import {
  AppBar, Avatar, Button, Container, Menu, MenuItem, Stack, Toolbar, Typography,
} from '@mui/material';
import { useActions, useMappedState } from 'hooks';
import { MouseEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { APPLICANT_PATHS } from 'routes';
import { ResumeDownload } from '../ResumeDownload';

interface Props {
    name: string;
}

export const Header = ({ name }: Props) => {
  const { logout, clearResume } = useActions();
  const { resume } = useMappedState((state) => state.resume);
  const navigate = useNavigate();

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
    if (resume) ResumeDownload(name, resume);
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
              <MenuItem
                onClick={() => navigate(APPLICANT_PATHS.editResume)}
              >
                Edit CV
              </MenuItem>
              <MenuItem onClick={download}>
                Download CV
              </MenuItem>
              <MenuItem
                onClick={() => {
                  logout(); clearResume();
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
