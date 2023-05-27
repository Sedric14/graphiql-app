import React from 'react';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import useDict from '../../hooks/useDict';

export default function SystemErrorPage(props: { msg: string }) {
  const getDictVal = useDict();
  const { msg } = props;
  return (
    <main className="main">
      <Container
        sx={{
          width: '1280px',
          margin: '20% auto',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h2">{getDictVal('errorSys')}</Typography>
        <br />
        <Typography variant="body1">{msg}</Typography>
      </Container>
    </main>
  );
}
