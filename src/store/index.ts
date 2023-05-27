import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import sysMessengerSlice from './sysMessengerSlice';
import graphQLSlice from './graphQLSlice';
import themeSlice from './themeSlice';
import spinnerSlice from './spinnerSlice';
import multiLangSlice from './multiLangSlice';
import docPanelSlice from './docPanelSlice';
import signSlice from './signSlice';

const rootReducer = combineReducers({
  user: userSlice,
  sysMessenger: sysMessengerSlice,
  graphQL: graphQLSlice,
  theme: themeSlice,
  multiLang: multiLangSlice,
  spinner: spinnerSlice,
  docPanel: docPanelSlice,
  sign: signSlice,
});

export const setupStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  });
export type RootState = ReturnType<typeof rootReducer>;
export type AppState = ReturnType<typeof setupStore>;
export type AppDispatch = AppState['dispatch'];

export default setupStore();
