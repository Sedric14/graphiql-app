import React, { FunctionComponent } from 'react';
import { Routes, Route } from 'react-router-dom';

import ErrorPage from './ErrorPage/ErrorPage';
import Main from './Main/Main';
import Layout from '../components/Layout/Layout';
import WelcomePage from './Welcome/Welcome';
import SignPage from './SignPage/SignPage';

const Router: FunctionComponent = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route path="main" element={<Main />} />
      <Route index element={<WelcomePage />} />
      <Route path="*" element={<ErrorPage />} />
      <Route path="sign" element={<SignPage />} />
    </Route>
  </Routes>
);

export default Router;
