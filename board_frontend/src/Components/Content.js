import React, { useEffect, useState } from 'react';

import Posts from './Posts';
import Bookmarks from './Bookmarks';
import axios from 'axios';

export default ({ bookmarks, handleBookmark, handleRemoveBookmark }) => {
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const getPosts = async (page) => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/posts?page=${page}`
    );
    return data;
  };
  useEffect(() => {
    // setPosts(getPosts(page));

    getPosts(page).then((res) => {
      setPosts(res);
    });
    console.log(posts);
  }, [page]);

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
