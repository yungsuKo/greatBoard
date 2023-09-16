import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import logo from '../logo.svg';
import { UserContext } from '../Contexts/userContext';

export default ({ match: { url } }) => {
  const logOut = () => {};
  const { accessToken, setAccessToken } = useContext(UserContext);
  return (
    <header>
      <div className="navbar">
        <ul>
          <li>
            <Link to="/new" className="btn btn-new">
              New Story
            </Link>

            <Link to="/" className="btn btn-new">
              Home
            </Link>
          </li>
          <li>
            <img alt="react-logo" src={logo} />
          </li>
          <li>
            <Link to="/bookmark" className="btn btn-bookmarks">
              Bookmarks
            </Link>
            {accessToken == '' ? (
              <Link to="/login" className="btn btn-login">
                Login
              </Link>
            ) : (
              <Link to="/my" className="btn btn-login">
                마이페이지
              </Link>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
};
