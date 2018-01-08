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

import { fetchPosts, fetchCategories } from './actions';

import './App.css';

class App extends PureComponent {
  state = {
    loadCount: 0,
  }

  componentWillMount() {
    this.fetchData();
  }

  fetchData = () => {
    const { posts, categories } = this.props;
    let loadCount = 0;
    if (!posts.fetched) {
      this.props.fetchPosts().then(() => {
        this.setState(s => ({
          loadCount: s.loadCount - 1,
        }));
      });
      loadCount++;
    }
    if (!categories.fetched) {
      this.props.fetchCategories().then(() => {
        this.setState(s => ({
          loadCount: s.loadCount - 1,
        }));
      });
      loadCount++;
    }

    this.setState({
      loadCount,
    });
  }

  render() {
    const { loadCount } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <Link to='/'>
            <h1 className="App-title">
              Readdle
            </h1>
          </Link>
          {loadCount === 0 && (
            <CategoryNav
              path={this.props.location.pathname}
              categories={this.props.categories.byName}/>
          )}
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
  fetchCategories,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
