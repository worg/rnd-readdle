import React from 'react';
import { Link } from 'react-router-dom';
import { distanceInWords } from 'date-fns';
import Actions from './actions';

const PostItem = ({ post }) => (
  <li className='post'>
    <Link
      to={`/${post.category}/${post.id}`} >
      <div className='post-item-title'>{post.title}</div>
      <div className='post-item-info'>
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
    </Link>
    <Actions post={post} />
  </li>
);

export default PostItem;
