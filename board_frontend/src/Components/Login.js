import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { REGISTER_USER } from '../_actions/types';
import { authUser } from '../_actions/userAction';
import { useNavigate } from 'react-router-dom';
axios.defaults.withCredentials = true;

export default (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  const onSubmit = (e) => {
    e.preventDefault();
    const errors = validate(account);
    setErrors(errors);
    if (Object.values(errors).some((v) => v)) {
      return;
    }
    // const { access_token } = authUser(account);
    dispatch(authUser(account)).then((res) => {
      alert('로그인이 완료되었습니다.');

      navigate('/');
    });
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
