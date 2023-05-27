import React from 'react';
import { Button } from '@mui/material';
import cl from '../GraphQLRoute/graphQLRoute.module.scss';
import useDict from '../../hooks/useDict';
import { useAppDispatch } from '../../hooks/redux';
import { setIsDrawerVisible } from '../../store/docPanelSlice';

export default function DocButtonOk() {
  const getDictVal = useDict();
  const dispatch = useAppDispatch();
  return (
    <Button
      className={cl.routeRow__button}
      variant="contained"
      color="secondary"
      onClick={() => dispatch(setIsDrawerVisible(true))}
      sx={{ width: '10rem' }}
      style={{ fontSize: '100%' }}
    >
      {getDictVal('docs')}
    </Button>
  );
}
