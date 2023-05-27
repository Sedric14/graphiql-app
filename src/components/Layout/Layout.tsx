import React from 'react';
import { Outlet } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import SysMessenger from '../SysMessenger/SysMessenger';
import lightTheme from '../../styles/lightTheme';
import darkTheme from '../../styles/darkTheme';
import { useAppSelector } from '../../hooks/redux';
import Spinner from '../Spinner/Spinner';

export default function Layout() {
  const { isDarkMode } = useAppSelector((state) => state.theme);
  const { isProcess } = useAppSelector((state) => state.spinner);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Header />
      {isProcess && <Spinner />}
      <Outlet />
      <Footer />
      <SysMessenger />
    </ThemeProvider>
  );
}
