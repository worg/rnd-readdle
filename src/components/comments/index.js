import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Notification } from 'react-notification';
import classnames from 'classnames';
import serialize from 'form-serialize';
import { distanceInWords } from 'date-fns';
import uuid from 'uuid/v1';
import {
  fetchComments,
  clearComments,
  modifyComment,
  voteComment,
  removeComment,
  createComment,
} from '../../actions';

const CommentItem = ({ comment, ...props }) => (
  <div className='comment-item'>
    {props.isEditing ? [
      <input
        keu='fedit'
        name='body'
        autoFocus
        defaultValue={comment.body}
        className='comment-body' />,
      <input key='fid' name='id' type='hidden' value={comment.id} />
    ]:(
      <div className='comment-body'>
        {comment.body}
      </div>
    )}
    <div className='comment-info'>
      <div className='comment-stats'>
        <span className='fa fa-heart'>{comment.voteScore}</span>
        <span className='date'>
          &nbsp;· {distanceInWords(
            new Date(),
            new Date(comment.timestamp),
            { addSuffix: true })}
        </span>
      </div>
      <div className='comment-author'>{comment.author}</div>
      <div className='comment-actions'>
        <button
          type='button'
          data-id={comment.id}
          onClick={props.onEdit}>
          <i className={classnames('fa fa-fw', {
            'fa-edit': !props.isEditing,
            'fa-save': props.isEditing,
          })} />
        </button>
        <button
          type='button'
          data-id={comment.id}
          onClick={props.onDelete}>
          <i className='fa fa-trash fa-fw' />
        </button>
        <button
          type='button'
          data-id={comment.id}
          data-type='upvote'
          onClick={props.onVote}>
          <i className='fa fa-thumbs-up fa-fw' />
        </button>
        <button
          type='button'
          data-id={comment.id}
          data-type='downvote'
          onClick={props.onVote}>
          <i className='fa fa-thumbs-down fa-fw' />
        </button>
      </div>
    </div>
  </div>
);

export class CommentList extends Component {
  state = {
    editing: '',
    showConfirm: false,
    deleting: '',
  }

  componentWillMount() {
    this.props.fetchComments(this.props.post.id);
  }

  componentWillUnmount() {
    this.props.clearComments();
  }

  handleEdit = (e) => {
    e.preventDefault();
    const {  id } = e.currentTarget.dataset;
    const current = this.state.editing;
    if (current === id) {
      const comment = serialize(this._form, { hash: true });
      return this.props.editComment({ id: id, ...comment }).then(() => {
        this.setState({
          editing: '',
        });
      });
    }

    this.setState({
      editing: id,
    });
  }

  handleAdd = (e) => {
    e.preventDefault();
    const comment = serialize(this._form, { hash: true });
    this.props.createComment({
      id: uuid().replace(/-/g, ''),
      timestamp: Date.now(),
      parentId: comment.parentId,
      body: comment['comment-body'],
    });
  }

  handleVote = (e) => {
    const { type, id } = e.currentTarget.dataset;
    this.props.voteComment(id, type === 'upvote');
  }

  handleDelete = () => {
    const { deleting } = this.state;
    
    this.props.removeComment(deleting).then(() => {
      this.setState({
        showConfirm: false,
        deleting: '',
      });
    });
  }

  confirmDelete = (e) => {
    const {  id } = e.currentTarget.dataset;
    this.setState(state =>({
      showConfirm: !state.showConfirm,
      deleting: state.deleting === id ? '' : id,
    }));
  }

  render() {
    const { comments, fetched, post } = this.props;
    if (!fetched) {
      return  (<i className='fa fa-asterisk fa-spin' />);
    }

    const commentsList = Object.values(comments).sort((a, b) => (
      a.timestamp < b.timestamp
    ));

    return (
      <form
        ref={e => this._form = e}
        className='comments-list'
        onSubmit={this.handleAdd}>
        <div className='comment-add-form'>
          <textarea
            required
            className='add-comment-body'
            name='comment-body'
            placeholder='add some nice words' />
          <input
            type='hidden'
            name='parentId'
            value={post.id} />
          <input
            className='comment-save'
            type='submit'
            value='comment!' />
        </div>
        {commentsList.map((c, i) => (
          <CommentItem
            key={i}
            isEditing={c.id === this.state.editing}
            onEdit={this.handleEdit}
            onVote={this.handleVote}
            onDelete={this.confirmDelete}
            comment={c} />
        ))}
        <Notification
          isActive={this.state.showConfirm}
          message='Are you sure?'
          action='Ok'
          title='Comment will be deleted!'
          dismissAfter={3e3}
          onDismiss={this.confirmDelete}
          onClick={this.handleDelete} />
      </form>
    );
  }
}

const mapStateToProps = state => ({
  comments: state.comments.byId,
  fetched: state.comments.fetched,
});

const mapDispatchToProps = {
  editComment: modifyComment,
  fetchComments,
  clearComments,
  voteComment,
  removeComment,
  createComment,
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);
