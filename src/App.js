import React, { PureComponent } from 'react';
import {
  Route,
  Switch,
  Link,
 } from 'react-router-dom';
import { connect } from 'react-redux';

import Home from './components/home';
import Category from './components/categories';
import CategoryNav from './components/categories/nav';
import Post from './components/posts';

import { fetchPosts } from './actions';

import './App.css';

class App extends PureComponent {
  state = {
    loadCount: 0
  }

  componentWillMount() {
    this.fetchData();
  }

  fetchData = () => {
    const { posts } = this.props;

    if (!posts.fetched) {
      this.props.fetchPosts();
    }
  }

  render() {
    console.warn('THIS:', this);
    return (
      <div className="App">
        <header className="App-header">
          <Link to='/'>
            <h1 className="App-title">
              Readdle
            </h1>
          </Link>
          <CategoryNav categories={this.props.categories}/>
        </header>
        <div className='App-intro'>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route
              path='/:category/:post'
              component={Post} />
            <Route
              path='/:category'
              component={Category} />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  posts: state.posts,
  categories: state.categories,
});

const mapDispatchToProps = {
  fetchPosts,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
