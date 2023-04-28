import React, { useEffect } from 'react';
import { Check, Error, Warning, Info } from '@mui/icons-material';
import { Alert, Collapse, Grid } from '@mui/material';
import { TransitionGroup } from 'react-transition-group';
import cl from './SysMessenger.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { ISysMessageState, delMessage } from '../../store/sysMessengerSlice';

export default function SysMessenger() {
  const messages = useAppSelector((state) => state.sysMessenger) as ISysMessageState[];
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(delMessage());
    }, 3000 / messages.length);

    return () => {
      clearTimeout(timer);
    };
  }, [messages, dispatch]);

  return (
    <Grid container className={cl.board}>
      <Grid item xs={0} md={6} />
      <Grid item xs={12} md={6}>
        <TransitionGroup>
          {messages.map((msg: ISysMessageState) => {
            let icon: JSX.Element;
            if (msg.type === 'error') icon = <Error fontSize="inherit" />;
            else if (msg.type === 'warning') icon = <Warning fontSize="inherit" />;
            else if (msg.type === 'info') icon = <Info fontSize="inherit" />;
            else icon = <Check fontSize="inherit" />;

            return (
              <Collapse key={msg.id}>
                <Alert icon={icon} severity={msg.type} className={cl.board__row}>
                  {msg.message}
                </Alert>
              </Collapse>
            );
          })}
        </TransitionGroup>
      </Grid>
    </Grid>
  );
}
