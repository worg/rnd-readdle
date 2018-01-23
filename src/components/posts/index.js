import React from 'react';
import { connect } from 'react-redux';
import { distanceInWords } from 'date-fns';
import Actions from './actions';
import CommentList from '../comments';
import { OBJ } from '../../utils/constants';

import './post.css';

export const Post = ({ post }) => (
  <div className='post-detail'>
    <div className='post-head'>
      <h2 className='post-title'>{post.title}</h2>
      <div className='post-meta'>
        <div className='votes'>
          {post.voteScore} <i className='fa fa-heart' />
        </div>
        <div className='comments'>
          {post.commentCount} <i className='fa fa-comment' />
        </div>
        <div className='date'>
          · {distanceInWords(
            new Date(),
            new Date(post.timestamp),
            { addSuffix: true })}
        </div>
        <div className='author'>by {post.author}</div>
      </div>
      <Actions post={post} />
    </div>
    <div className='post-body'>{post.body}</div>
    <div className='post-comments'>
      <h4>comments</h4>
      <CommentList post={post} />
    </div>
  </div>
);

const mapStateToProps = (state, ownProps) => {
  const { 
    match: { params: { post: postId } },
    history,
   } = ownProps;
  const { posts } = state;
  const post = posts.byId[postId] || OBJ;

  // redirect to not found route
  if (posts.byId !== OBJ && post === OBJ) {
    history.replace('/404');
  }

  return {
    post,
  };
};

export default connect(mapStateToProps)(Post);
