import React, { useContext, useEffect, useState } from 'react';

import Posts from './Posts';
import Bookmarks from './Bookmarks';
import axios from 'axios';
import { UserContext } from '../Contexts/userContext';

export default ({ bookmarks, handleBookmark, handleRemoveBookmark }) => {
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const { isLogin, accessToken } = useContext(UserContext);
  const getPosts = async (page) => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/posts?page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return data;
  };
  useEffect(() => {
    // setPosts(getPosts(page));

    getPosts(page).then((res) => {
      setPosts(res);
    });
    console.log(posts);
  }, [page, accessToken]);

  return (
    <div className="content-area">
      <div className="all-posts">
        <Posts
          posts={posts}
          handleBookmark={handleBookmark}
          handleRemoveBookmark={handleRemoveBookmark}
        />
      </div>
      <div className="bookmarks-sidebar">
        <h1>Bookmarks</h1>
        <Bookmarks bookmarks={bookmarks} />
      </div>
    </div>
  );
};
