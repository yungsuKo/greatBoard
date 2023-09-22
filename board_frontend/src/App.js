import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  useParams,
} from 'react-router-dom';

import Header from './Components/Header';
import Content from './Components/Content';
import Bookmark from './Components/Bookmark';
import NewStory from './Components/NewStory';
import SinglePost from './Components/SinglePost';
import Footer from './Components/Footer';

import './App.css';
import data from './data';
import Login from './Components/Login';
import My from './Components/My';
import axios from 'axios';
import EditPost from './Components/EditPost';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: data,
    };

    this.handleSubmission = this.handleSubmission.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  handleParams() {
    const { id } = useParams();
    return id;
  }

  handleSubmission(data) {
    let posts = this.state.posts;
    posts = [data, ...posts];
    this.setState({ posts });
  }

  async handleRemove(post, navigate) {
    let { id } = post;
    await axios.delete(`${process.env.REACT_APP_BASE_URL}/posts/${id}`);

    navigate('/');
    this.handleWindow();
  }

  handleWindow() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <Router basename="/">
        <div className="App">
          <Header match={'/'} />
          <Routes>
            <Route
              exact
              path="/"
              element={
                <Content
                  posts={this.state.posts}
                  bookmarks={this.state.posts.filter((post) => post.bookmark)}
                  handleBookmark={this.handleBookmark}
                  handleRemoveBookmark={this.handleRemoveBookmark}
                />
              }
            />
            <Route
              exact
              path="/new"
              element={<NewStory handleSubmission={this.handleSubmission} />}
            />
            <Route
              exact
              path="/post/:id/edit"
              element={
                <EditPost
                  handleSubmission={this.handleSubmission}
                  id={this.handleParams}
                />
              }
            />
            <Route
              exact
              path="/bookmark"
              element={
                <Bookmark
                  bookmarks={this.state.posts.filter((post) => post.bookmark)}
                />
              }
            />
            <Route
              exact
              path="/post/:id"
              element={
                <SinglePost
                  handleBookmark={this.handleBookmark}
                  handleRemoveBookmark={this.handleRemoveBookmark}
                  handleRemove={this.handleRemove}
                  handleWindow={this.handleWindow()}
                />
              }
            />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/my" element={<My />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    );
  }
}
