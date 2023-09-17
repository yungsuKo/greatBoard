import React, { Component, useContext, useEffect, useState } from 'react';
import { Editor, EditorState, RichUtils, getDefaultKeyBinding } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';

import BlockStyleControls from './RichText/BlockStyleControls';
import InlineStyleControls from './RichText/InlineStyleControls';

import '../RichText.css';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

export default () => {
  const { id } = useParams();
  const [post, setPost] = useState(
    axios.get(`${process.env.REACT_APP_BASE_URL}/posts/${id}`).then((res) => {
      return res.data;
    })
  );
  useEffect(() => {
    try {
      axios.get(`${process.env.REACT_APP_BASE_URL}/posts/${id}`).then((res) => {
        console.log(res);
        setPost(res.data);
      });
    } catch (e) {
      console.log(e);
    }
  }, []);

  const onChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
    console.log(post);
  };

  console.log(post);
  return (
    <div>
      <div>
        <input value={post.title} name="title" onChange={onChange} />
      </div>
      <div>
        <input value={post.description} name="description" />
      </div>
      <button className="btn btn-submit">Edit</button>
    </div>
  );
};
