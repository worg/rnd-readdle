import React, { PureComponent } from 'react';
import {
  Route,
  Switch,
  Link,
 } from 'react-router-dom';
import { connect } from 'react-redux';
import Rodal from 'rodal';
import { OBJ } from './utils/constants';
import Home from './components/home';
import Category from './components/categories';
import CategoryNav from './components/categories/nav';
import Post from './components/posts';
import PostForm from './components/posts/form';
import NotFound from './components/notfound';

import { 
  fetchPosts,
  createPost,
  modifyPost,
  fetchCategories,
  setAddModal,
  closeModal,
} from './actions';

import './App.css';
// include rodal styles
import 'rodal/lib/rodal.css';

class App extends PureComponent {
  componentWillMount() {
    this.fetchData();
  }

  fetchData = () => {
    const { posts, categories } = this.props;
    if (!posts.fetched) {
      this.props.fetchPosts();
    }

    if (!categories.fetched) {
      this.props.fetchCategories();
    }
  }

  render() {
    const { posts, categories, modal } = this.props;
    return (
      <div className="App">
        <header className="App-header">
          <Link to='/'>
            <h1 className="App-title">
              Readdle
            </h1>
          </Link>
          {categories.fetched && (
            <CategoryNav
              path={this.props.location.pathname}
              categories={categories.byName}/>
          )}
        </header>
        <div className='App-intro'>
          {posts.byId === OBJ ? (
            <i className='fa fa-asterisk fa-spin' />
          ) : (
            <Switch>
              <Route exact path='/' component={Home} />
              <Route
                exact
                path='/404'
                component={NotFound} />
              <Route
                path='/:category/:post'
                component={Post} />
              <Route
                path='/:category'
                component={Category} />
            </Switch>
          )}
        </div>
        <div
          className='float-button add'
          onClick={this.props.setAddModal} >
          +
        </div>
        <Rodal
          height={480}
          visible={modal.isOn}
          onClose={this.props.closeModal} >
            {modal.isOn && (
              <PostForm
                closeModal={this.props.closeModal}
                modal={modal}
                categories={categories.byName}
                onAdd={this.props.createPost}
                onEdit={this.props.modifyPost} />
            )}
        </Rodal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  posts: state.posts,
  categories: state.categories,
  modal: state.modal,
});

const mapDispatchToProps = {
  fetchPosts,
  fetchCategories,
  setAddModal,
  closeModal,
  createPost,
  modifyPost,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
