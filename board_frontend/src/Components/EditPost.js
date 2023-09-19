import React, { Component, useContext, useEffect, useState } from 'react';
import { Editor, EditorState, RichUtils, getDefaultKeyBinding } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';

import BlockStyleControls from './RichText/BlockStyleControls';
import InlineStyleControls from './RichText/InlineStyleControls';

import '../RichText.css';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default () => {
  const { id } = useParams();
  const [editPost, setEditPost] = useState(
    axios.get(`${process.env.REACT_APP_BASE_URL}/posts/${id}`).then((res) => {
      return res.data;
    })
  );
  const navigate = useNavigate();

  useEffect(() => {
    try {
      axios.get(`${process.env.REACT_APP_BASE_URL}/posts/${id}`).then((res) => {
        console.log(res);
        setEditPost(res.data);
      });
    } catch (e) {
      console.log(e);
    }
  }, []);

  const onChange = (e) => {
    setEditPost({ ...editPost, [e.target.name]: e.target.value });
  };

  const editSubmit = async () => {
    await axios.patch(
      `${process.env.REACT_APP_BASE_URL}/posts/${id}`,
      editPost,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      }
    );
    navigate(`/post/${id}`);
  };

  return (
    <div>
      <div>
        <input value={editPost.title} name="title" onChange={onChange} />
      </div>
      <div>
        <input value={editPost.description} name="description" />
      </div>
      <button className="btn btn-submit" onClick={editSubmit}>
        Edit
      </button>
    </div>
  );
};
