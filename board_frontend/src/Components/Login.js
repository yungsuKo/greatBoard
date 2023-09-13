import React, { useState } from 'react';

export default () => {
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

    fetch('http://127.0.0.1:4000/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(account),
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((res) => {
        console.log(res);
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
