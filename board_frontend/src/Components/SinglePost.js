import axios from 'axios';
import React, { useEffect, useState } from 'react';
import renderHTML from 'react-render-html';
import { useNavigate, useParams } from 'react-router-dom';

export default ({ handleBookmark, handleRemoveBookmark, handleRemove }) => {
  let { id } = useParams();
  const [post, setPost] = useState({
    title: 'asdfasdf',
    description: 'asdfasdf',
  });

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/posts/${id}`).then((res) => {
      setPost({ ...post, ...res.data });
    });
  });
  const navigate = useNavigate();

  return (
    <div className="single-post">
      <h1 className="header">{post.title}</h1>
      {renderHTML(post.description)}
      <ul className="post-foot">
        <li>
          {post.bookmark ? (
            <button
              className="btn btn-remove-bookmarks"
              onClick={() => handleRemoveBookmark(post)}
            >
              Remove from Bookmark
            </button>
          ) : (
            <button
              className="btn btn-bookmarks"
              onClick={() => handleBookmark(post)}
            >
              Add to Bookmark
            </button>
          )}
        </li>
        <li>
          <button
            className="btn btn-remove"
            onClick={() => handleRemove(post, navigate)}
          >
            Remove
          </button>
        </li>
      </ul>
    </div>
  );
};
