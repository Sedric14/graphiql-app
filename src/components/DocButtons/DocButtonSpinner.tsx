import React from 'react';
import { Button, CircularProgress } from '@mui/material';
import cl from '../GraphQLRoute/graphQLRoute.module.scss';

export default function DocButtonSpinner() {
  return (
    <Button
      className={cl.routeRow__button}
      disabled
      color="secondary"
      variant="contained"
      sx={{ width: '10rem' }}
      style={{ fontSize: '100%', opacity: '0.5' }}
    >
      <CircularProgress size={32} sx={{ color: 'rgb(255,255,255)' }} />
    </Button>
  );
}
