import React, { useState } from 'react';
import { Button } from '@mui/material';
import cl from './graphQLRoute.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { clearData, changeRoute, changeVariables } from '../../store/graphQLSlice';
import DocButtonSpinner from '../DocButtons/DocButtonSpinner';
import DocButtonOk from '../DocButtons/DocButtonOk';
import useDict from '../../hooks/useDict';

export default function GraphQLRoute() {
  const { url } = useAppSelector((state) => state.graphQL);
  const { isLoading } = useAppSelector((state) => state.docPanel);
  const getDictVal = useDict();
  const dispatch = useAppDispatch();
  const [route, setRoute] = useState<string>(url);
  const theme = useAppSelector((state) => state.theme);

  const handlerChangeRoute = () => {
    dispatch(changeRoute(route));
    dispatch(clearData());
    dispatch(
      changeVariables(`{

}`),
    );
  };

  return (
    <div className={cl.routeRow}>
      <label className={cl.routeRow__label} htmlFor="route-graphql">
        <input
          style={theme.isDarkMode ? { border: '3px solid white' } : {}}
          className={cl.routeRow__input}
          id="route-graphql"
          type="text"
          placeholder={getDictVal('placeholderRoute')}
          value={route}
          onChange={(e) => setRoute(e.target.value)}
        />
      </label>
      <div className={cl.routeRow__buttonsBlock}>
        <Button className={cl.routeRow__button} onClick={handlerChangeRoute}>
          {getDictVal('changeRoute')}
        </Button>
        {isLoading ? <DocButtonSpinner /> : <DocButtonOk />}
      </div>
    </div>
  );
}
