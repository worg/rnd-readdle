import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setEditModal } from '../../actions';
import { OBJ } from '../../utils/constants';

import './post.css';

export class Post extends Component {
  handleEdit = () => {
    const { post, editPost } = this.props;
    editPost(post);
  }

  render() {
    const { post } = this.props;
    return (
      <div className='post-detail'>
        <div className='post-head'>
          <h2 className='post-title'>{post.title}</h2>
          <div className='action-items'>
            <button
              onClick={this.handleEdit}
              title='edit post'>
              <i className='fa fa-edit fa-fw' />
            </button>
            <button
              onClick={()=>{}}
              title='delete post'>
              <i className='fa fa-trash fa-fw' />
            </button>
            <button
              onClick={()=>{}}
              title='upvote post'>
              <i className='fa fa-thumbs-up fa-fw' />
            </button>
            <button title='upvote post'>
              <i className='fa fa-thumbs-down fa-fw' />
            </button>
          </div>
        </div>
          <div className='post-body'>{post.body}</div>
        <div className='post-comments'>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { 
    match: { params: { post: postId } },
   } = ownProps;

  return {
    post: state.posts.byId[postId] || OBJ,
  };
};

const mapDispatchToProps = {
  editPost: setEditModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
