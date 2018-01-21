import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Notification } from 'react-notification';
import {
  setEditModal,
  removePost,
  votePost,
} from '../../actions';
import { OBJ } from '../../utils/constants';

import './post.css';

export class Post extends Component {
  state = {
    showConfirm: false,
  }

  handleEdit = () => {
    const { post, editPost } = this.props;
    editPost(post);
  }

  confirmDelete = () => {
    this.setState(state =>({
      showConfirm: !state.showConfirm,
    }));
  }

  handleDelete = () => {
    const { post, removePost, history } = this.props;
    removePost(post.id).then(() => {
      history.replace('/');
    });
  }

  handleVote = (e) => {
    const isUpvote = e.currentTarget.dataset['type'] === 'upvote';
    this.props.votePost(this.props.post.id, isUpvote);
  }

  render() {
    const { post } = this.props;
    return (
      <div className='post-detail'>
        <div className='post-head'>
          <h2 className='post-title'>{post.title}</h2>
          <div className='post-action-items'>
            <button
              onClick={this.handleEdit}
              title='edit post'>
              <i className='fa fa-edit fa-fw' />
            </button>
            <button
              onClick={this.confirmDelete}
              title='delete post'>
              <i className='fa fa-trash fa-fw' />
            </button>
            <button
              onClick={this.handleVote}
              data-type='upvote'
              title='upvote post'>
              <i className='fa fa-thumbs-up fa-fw' />
            </button>
            <button
              data-type='downvote'
              onClick={this.handleVote}
              title='downvote post'>
              <i className='fa fa-thumbs-down fa-fw' />
            </button>
          </div>
        </div>
          <div className='post-body'>{post.body}</div>
        <div className='post-comments'>
        </div>
        <Notification
          isActive={this.state.showConfirm}
          message='Are you sure?'
          action='Ok'
          title='Post will be deleted!'
          dismissAfter={3e3}
          onDismiss={this.confirmDelete}
          onClick={this.handleDelete} />
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
  removePost,
  votePost,
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
