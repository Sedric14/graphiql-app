import React, { FunctionComponent } from 'react';
import { Routes, Route } from 'react-router-dom';
import ErrorPage from './ErrorPage/ErrorPage';
import Main from './Main/Main';
import Layout from '../components/Layout/Layout';
import WelcomePage from './Welcome/Welcome';
import SignPage from './SignPage/SignPage';
import { useAppSelector } from '../hooks/redux';

const Router: FunctionComponent = () => {
  const user = useAppSelector((state) => state.user);
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="main" element={user.id ? <Main /> : <WelcomePage />} />
        <Route index element={<WelcomePage />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="sign" element={user.id ? <WelcomePage /> : <SignPage />} />
      </Route>
    </Routes>
  );
};

export default Router;
