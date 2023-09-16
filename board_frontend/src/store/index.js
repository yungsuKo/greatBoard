import React, { useReducer } from 'react';
import rootReducer from '../_reducers';
import { usePersistedstate } from '../usePersistedState';

export const userContext = React.createContext();

export const StoreProvider = ({ children }) => {
  const access_token = '';

  const [state, dispatch] = useReducer(rootReducer, access_token);
  const [persistedState, setPersisedState] = usePersistedstate(
    'access_token',
    access_token
  );

  const globalState = {
    access_token: persistedState,
    dispatch: (action) => {
      dispatch(action);
      setPersisedState(rootReducer(persistedState, action));
    },
  };

  return (
    <userContext.Provider value={globalState}>{children}</userContext.Provider>
  );
};
