import React from 'react';
import { Box, CircularProgress, Fade } from '@mui/material';

export default function Spinner() {
  return (
    <Fade in={!!true}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'fixed',
          top: '0px',
          left: '0px',
          width: '100%',
          height: '100%',
          zIndex: 1000,
          background: 'rgba(0,0,0,0.7)',
        }}
      >
        <CircularProgress size="10rem" sx={{ color: 'rgba(255,255,255,0.8)' }} />
      </Box>
    </Fade>
  );
}
