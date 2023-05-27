import React from 'react';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import useDict from '../../hooks/useDict';

export default function ErrorPage() {
  const getDictVal = useDict();

  return (
    <main className="main">
      <Container
        sx={{
          width: '1280px',
          margin: '20% auto',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h2">404: {getDictVal('error404')}</Typography>
      </Container>
    </main>
  );
}
