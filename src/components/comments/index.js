import React, { Component } from 'react';
import { connect } from 'react-redux';
import { distanceInWords } from 'date-fns';
import {
  fetchComments,
} from '../../actions';

const CommentItem = ({ comment, ...props }) => (
  <div className='comment-item'>
    <div className='comment-body'>{comment.body}</div>
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
        <button>
          <i className='fa fa-edit fa-fw' />
        </button>
        <button>
          <i className='fa fa-trash fa-fw' />
        </button>
        <button>
          <i className='fa fa-thumbs-up fa-fw' />
        </button>
        <button>
          <i className='fa fa-thumbs-down fa-fw' />
        </button>
      </div>
    </div>
  </div>
);

export class CommentList extends Component {
  componentWillMount() {
    this.props.fetchComments(this.props.post.id);
  }

  render() {
    const { comments, fetched } = this.props;
    if (!fetched) {
      return  (<i className='fa fa-asterisk fa-spin' />);
    }

    return (
      <div className='comments-list'>
        {Object.values(comments).map((c, i) => (
          <CommentItem key={i} comment={c} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  comments: state.comments.byId,
  fetched: state.comments.fetched,
});

const mapDispatchToProps = {
  fetchComments,
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);
