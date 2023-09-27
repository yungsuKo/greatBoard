import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { leveningStr } from '../helper';
import axios from 'axios';

export default () => {
  const [bookmarks, setBookmarks] = useState([]);
  const getData = async () => {
    const result = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/posts?bookmark=1`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      }
    );
    console.log(result);
    return result.data;
  };

  useEffect(() => {
    getData().then((data) => setBookmarks(data));
  }, []);

  const length = bookmarks.length;
  console.log(length);
  const showPost =
    length > 0 ? (
      bookmarks.map(({ id, title, description }, index) => (
        <div key={id} className="bookmark">
          <span className="number">{index + 1}</span>
          <h5>
            <Link to={`/post/${id}`}>{title}</Link>
          </h5>
          <p>{leveningStr(description, 35)}</p>
        </div>
      ))
    ) : (
      <p>No Bookmark Found</p>
    );
  return <div>{showPost}</div>;
};
