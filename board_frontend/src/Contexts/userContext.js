import React, { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';
import axios from 'axios';
export const UserContext = React.createContext(null);

export function UserProvider({ children }) {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem('access_token') || ''
  );
  const [isLogin, setIsLogin] = useState(false);

  const getAccess = async () => {
    return await axios.get(`${process.env.REACT_APP_BASE_URL}/auth/access`);
  };

  useEffect(() => {
    localStorage.setItem('access_token', accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (accessToken !== '') {
      let decoded_token = jwt.decode(accessToken, { complete: true });
      let nowTime = new Date();
      console.log(nowTime.getTime(), ',', decoded_token.payload.exp * 1000);
      if (nowTime.getTime() > decoded_token.payload.exp * 1000) {
        // refresh 토큰을 이용하여 요청 시도
        getAccess()
          .then((res) => {
            setAccessToken(res.data.access_token);
          })
          .catch((err) => {
            localStorage.setItem('access_token', '');
          });
        console.log('access_token', accessToken);
        if (accessToken !== '') {
          // 반환값이 있으면 localstorage에 세팅 후 로그인 유지
          localStorage.setItem('access_token', accessToken);
          setIsLogin(true);
        } else {
          // cookie에 값이 없거나, 반환값이 없는 경우 로그인 비활성화 처리
          setIsLogin(false);
        }
      } else setIsLogin(true);
    }
  }, [accessToken]);

  return (
    <UserContext.Provider
      value={{ accessToken, setAccessToken, isLogin, setIsLogin }}
    >
      {children}
    </UserContext.Provider>
  );
}
