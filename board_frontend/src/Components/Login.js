import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Contexts/userContext';

axios.defaults.withCredentials = true;

export default (props) => {
  const navigate = useNavigate();
  const { accessToken, setAccessToken } = useContext(UserContext);
  console.log(accessToken);
  const [account, setAccount] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    username: '',
    password: '',
  });
  const onChange = (e) => {
    setAccount({
      ...account,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const errors = validate(account);
    setErrors(errors);
    if (Object.values(errors).some((v) => v)) {
      return;
    }
    const {
      data: { access_token },
    } = await axios.post(process.env.REACT_APP_BASE_URL + '/auth', account);
    localStorage.setItem('access_token', access_token);
    setAccessToken(access_token);
    navigate('/');
  };
  const validate = (account) => {
    const errors = {
      username: '',
      password: '',
    };
    if (!account.username) {
      errors.username = '이메일을 입력해주세요';
    }
    if (!account.password) {
      errors.password = '패스워드를 입력해주세요';
    }

    return errors;
  };

  return (
    <div>
      <form className="login-container" onSubmit={onSubmit}>
        <input type="email" name="username" onChange={onChange} />
        {errors.username && (
          <span className="text-error">{errors.username}</span>
        )}
        <input type="password" name="password" onChange={onChange} />
        {errors.password && (
          <span className="text-error">{errors.password}</span>
        )}
        <button type="submit">제출</button>
      </form>
    </div>
  );
};
