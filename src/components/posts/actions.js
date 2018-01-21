import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Notification } from 'react-notification';
import {
  setEditModal,
  removePost,
  votePost,
} from '../../actions';

export class PostActions extends Component {
  state = {
    showConfirm: false,
  }

  handleEdit = () => {
    const { post, editPost } = this.props;
    editPost(post);
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

  confirmDelete = () => {
    this.setState(state =>({
      showConfirm: !state.showConfirm,
    }));
  }

  render() {
    return (
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

const mapDispatchToProps = {
  editPost: setEditModal,
  removePost,
  votePost,
};

export default connect(null, mapDispatchToProps)(PostActions);
