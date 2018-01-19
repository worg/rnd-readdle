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

import { 
  fetchPosts,
  fetchCategories,
  setAddModal,
  closeModal,
} from './actions';

import './App.css';
// include rodal styles
import 'rodal/lib/rodal.css';

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
          {this.props.posts.byId === OBJ ? (
            <i className='fa fa-asterisk fa-spin' />
          ) : (
            <Switch>
              <Route exact path='/' component={Home} />
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
          visible={this.props.modal.isOn}
          onClose={this.props.closeModal} >
            {this.props.modal.isOn && (
              <PostForm
                modal={this.props.modal}
                categories={this.props.categories.byName} />
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
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
