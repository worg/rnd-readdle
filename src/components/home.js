// import React from 'react';
import { connect } from 'react-redux';
import PostList from './posts/list';

const mapStateToProps = (state) => ({
  posts: state.posts.byId,
});

export default connect(mapStateToProps)(PostList);
