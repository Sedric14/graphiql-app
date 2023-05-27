import React from 'react';
import GitHub from '@mui/icons-material/GitHub';
import {
  AppBar,
  Box,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import Logo from '@/assets/images/rs.svg';
import { useAppSelector } from '../../hooks/redux';
import useDict from '../../hooks/useDict';

export default function Footer() {
  const { isDarkMode } = useAppSelector((state) => state.theme);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const getDictVal = useDict();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="static"
      color="default"
      enableColorOnDark
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        height: 30,
      }}
    >
      <Toolbar
        sx={{ justifyContent: 'center', alignItems: 'center' }}
        variant="dense"
        style={{ minHeight: '30px' }}
      >
        <Typography variant="h6" color="inherit">
          2023 &copy;
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
          <Tooltip title={getDictVal('authors')}>
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <GitHub sx={{ width: 28, height: 28 }} />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            color="inherit"
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: -3,
                '& .MuiAvatar-root': {
                  width: 28,
                  height: 28,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  bottom: -10,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={handleClose} sx={{ mr: 2 }}>
              <GitHub sx={{ mr: 2 }} />
              <Link href="https://github.com/gekalo1025/" underline="none" color="inherit">
                gekalo1025
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose} sx={{ mr: 2 }}>
              <GitHub sx={{ mr: 2 }} />
              <Link href="https://github.com/folganoid/" underline="none" color="inherit">
                folganoid
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <GitHub sx={{ mr: 2 }} />
              <Link href="https://github.com/sedric14/" underline="none" color="inherit">
                sedric14
              </Link>
            </MenuItem>
          </Menu>
        </Box>
        <IconButton size="small" sx={{ ml: 2 }} color="inherit">
          <Link href="https://rs.school/">
            <img
              style={{ width: 28, height: 28, opacity: isDarkMode ? 1 : 0.4 }}
              src={Logo}
              alt="rsschool logo"
            />
          </Link>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
