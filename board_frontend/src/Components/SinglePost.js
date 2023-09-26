import axios from 'axios';
import React, { useEffect, useState } from 'react';
import renderHTML from 'react-render-html';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default ({ handleRemove }) => {
  let { id } = useParams();
  const [post, setPost] = useState({ description: '' });

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
          {post.isBookmarked ? (
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
          <Link
            to={{ pathname: `edit`, state: { id } }}
            className="btn btn-edit"
          >
            Edit
          </Link>
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
