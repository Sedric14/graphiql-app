import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { Button, Tab } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { auth, useLogout } from '../../firebase';
import { changeTheme } from '../../store/themeSlice';
import useDict from '../../hooks/useDict';
import UaLogo from '@/assets/images/ua_flag.png';
import GbLogo from '@/assets/images/gb_flag.png';
import { setLang } from '../../store/multiLangSlice';
import { setOn, setOff } from '../../store/spinnerSlice';
import { setUser } from '../../store/userSlice';
import cl from './Header.module.scss';

export default function Header() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const [isSticky, setIsSticky] = useState(false);
  const navigate = useNavigate();
  const getDictVal = useDict();
  const { lang } = useAppSelector((state) => state.multiLang);
  const [logout] = useLogout();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const { isDarkMode } = useAppSelector((state) => state.theme);
  const switchTheme = () => {
    dispatch(changeTheme());
  };

  const signHandler = () => {
    if (user.id) {
      logout();
      navigate('/');
    }
  };

  const scrollHandler = () => {
    const { scrollY } = window;
    const defaultStickyPosition = 50;

    if (scrollY >= defaultStickyPosition) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, []);

  useEffect(() => {
    dispatch(setOn());
    onAuthStateChanged(auth, (userCreds) => {
      if (userCreds && userCreds.uid) {
        dispatch(
          setUser({
            id: userCreds.uid,
            token: userCreds.refreshToken,
            email: userCreds.email as string,
          }),
        );
      }
      dispatch(setOff());
    });
  }, [dispatch]);

  return (
    <AppBar
      className={cl.appBar}
      color="inherit"
      sx={{
        backgroundColor: isSticky ? 'rgb(99, 96, 96)' : '#ffffff50',
        height: isSticky ? 55 : 70,
        top: 0,
        left: 0,
        zIndex: 500,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {user.id && (
                <MenuItem onClick={handleCloseNavMenu}>
                  <Tab
                    color="default"
                    label={getDictVal('main')}
                    value="/"
                    to={user.id ? '/main' : '/'}
                    component={NavLink}
                  />
                </MenuItem>
              )}
              <MenuItem onClick={handleCloseNavMenu}>
                <Tab
                  color="default"
                  label={getDictVal('welcome')}
                  value="/about"
                  to="/"
                  component={NavLink}
                />
              </MenuItem>
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {user.id && (
              <Tab
                label={getDictVal('main')}
                value="/"
                to={user.id ? '/main' : '/'}
                component={NavLink}
              />
            )}
            <Tab
              color="default"
              label={getDictVal('welcome')}
              value="/about"
              to="/"
              component={NavLink}
            />
          </Box>
          <IconButton sx={{ ml: 1 }} onClick={switchTheme} color="inherit">
            {isDarkMode ? <Brightness4 color="inherit" /> : <Brightness7 color="inherit" />}
          </IconButton>
          <IconButton
            size="small"
            sx={{ ml: 2, opacity: lang !== 'UA' ? 0.5 : 1 }}
            color="inherit"
            onClick={() => dispatch(setLang('UA'))}
          >
            <img style={{ width: 28, height: 28, borderRadius: 14 }} src={UaLogo} alt="UA" />
          </IconButton>
          <IconButton
            size="small"
            sx={{ ml: 2, mr: 2, opacity: lang !== 'EN' ? 0.5 : 1 }}
            color="inherit"
            onClick={() => dispatch(setLang('EN'))}
          >
            <img
              style={{ width: 28, height: 28, borderRadius: 14, padding: '0 -15%' }}
              src={GbLogo}
              alt="GB"
            />
          </IconButton>
          {user.id && (
            <Button
              className={cl.signButton}
              variant="contained"
              color="secondary"
              onClick={signHandler}
            >
              {getDictVal('signout')}
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
