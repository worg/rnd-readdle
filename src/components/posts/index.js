import React from 'react';
import { connect } from 'react-redux';
import Actions from './actions';
import { OBJ } from '../../utils/constants';

import './post.css';

export const Post = ({ post }) => (
  <div className='post-detail'>
    <div className='post-head'>
      <h2 className='post-title'>{post.title}</h2>
      <Actions post={post} />
    </div>
    <div className='post-body'>{post.body}</div>
    <div className='post-comments'>
    </div>
  </div>
);

const mapStateToProps = (state, ownProps) => {
  const { 
    match: { params: { post: postId } },
   } = ownProps;

  return {
    post: state.posts.byId[postId] || OBJ,
  };
};

export default connect(mapStateToProps)(Post);
