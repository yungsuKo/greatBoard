import React, { useState } from 'react';
import renderHTML from 'react-render-html';
import { Link } from 'react-router-dom';
import { leveningStr } from '../helper';
import axios from 'axios';

export default ({ post }) => {
  const { id, title, description } = post;
  const [isBookmarked, setIsBookmarked] = useState(post.isBookmarked);

  const handleRemoveBookmark = async (data) => {
    const post = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/posts/bookmark/${data.id}`,
      {
        isBookmarked: false,
      }
    );
    setIsBookmarked(post.data.isBookmarked);
  };

  const handleBookmark = async (data) => {
    const post = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/posts/bookmark/${data.id}`,
      {
        isBookmarked: true,
      }
    );
    setIsBookmarked(post.data.isBookmarked);
  };

  return (
    <div className="post">
      <h3>
        <Link to={`/post/${id}`}>{title}</Link>
      </h3>
      <p>{renderHTML(leveningStr(description, 250))}</p>
      <ul>
        <li>
          <Link to={`/post/${id}`} className="btn btn-more">
            Read More
          </Link>
        </li>
        <li>
          {isBookmarked ? (
            <button
              className="btn btn-remove-bookmarks"
              onClick={async () => await handleRemoveBookmark(post)}
            >
              Remove from Bookmark
            </button>
          ) : (
            <button
              className="btn btn-bookmarks"
              onClick={async () => await handleBookmark(post)}
            >
              Add to Bookmark
            </button>
          )}
        </li>
      </ul>
    </div>
  );
};
