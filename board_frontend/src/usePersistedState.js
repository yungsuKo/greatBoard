import { useState, useEffect } from 'react';
export const usePersistedstate = (key, initialState) => {
  //기본형태 : const Istate, setstatel = usestate(초기값)
  const [state, setState] = useState(() => {
    const storagedState = localStorage.getItem(key);
    return !storagedState ? initialState : storagedState;
  });

  useEffect(() => {
    localStorage.setItem(key, state), [key, state];
  });
  const changeStorage = (change) => {
    setState(change);
  };
  return [state, changeStorage];
};
