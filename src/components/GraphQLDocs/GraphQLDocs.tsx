import React, { Suspense, useEffect, useState } from 'react';
import { Button, Container, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import useDict from '../../hooks/useDict';
import { setIsDrawerVisible } from '../../store/docPanelSlice';
import { useFetchDocRoot } from '../../hooks/useFetchDocRoot';
import SpinnerDoc from '../Spinner/SpinnerDoc';

const DataRoutes = React.lazy(() => import('../DataRoutes/DataRoutes'));

export default function GraphQLDocs() {
  const getDictVal = useDict();
  const dispatch = useAppDispatch();
  const { url } = useAppSelector((state) => state.graphQL);
  const data = useFetchDocRoot(url);
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    if (window.innerWidth < 450) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Container sx={{ p: 1 }} maxWidth="sm">
      <Button
        variant="contained"
        sx={{ width: '100%', zIndex: 200 }}
        color="error"
        onClick={() => dispatch(setIsDrawerVisible(false))}
      >
        {getDictVal('docClosePanel')}
      </Button>
      <br />
      <br />
      <Typography sx={{ textAlign: 'center' }} variant="h5">
        {getDictVal('docTitle')}
      </Typography>
      <br />
      <Typography variant="h6">{getDictVal('docDesc')}</Typography>
      <br />
      <Suspense fallback={<SpinnerDoc />}>
        <DataRoutes data={data} style={{ height: isMobile ? '73vh' : '76vh', overflowY: 'auto' }} />
      </Suspense>
    </Container>
  );
}
