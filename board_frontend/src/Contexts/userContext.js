import React, { useEffect, useState } from 'react';

export const UserContext = React.createContext(null);

export function UserProvider({ children }) {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem('access_token') || ''
  );

  useEffect(() => {
    localStorage.setItem('access_token', accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!localStorage.getItem('access_token')) setAccessToken('');
  }, [accessToken]);

  return (
    <UserContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </UserContext.Provider>
  );
}
