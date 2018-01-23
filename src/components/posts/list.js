import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { distanceInWords } from 'date-fns';
import Sorter from './sorter';
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

const makeSorter = (key) => (first, second) => {
  const a = first[key] || 0;
  const b = second[key] || 0;
  return b - a;
};

export default class PostList extends PureComponent {
  state = {
    sortBy: 'timestamp',
  };

  static defaultProps = {
    title: 'All Posts',
  };

  changeSort = ({ target }) => {
    this.setState({
      sortBy: target.value,
    });
  };

  render() {
    const isSorted = this.state.sortBy !== '';
    const sorter = makeSorter(this.state.sortBy);
    const allPosts = Object.values(this.props.posts).filter(p => !p.deleted);
    const posts = !isSorted ? allPosts : allPosts.sort(sorter);
    return (
      <div className='posts-container'>
        <div className='action-area'>
          <h3>{this.props.title}</h3>
          <Sorter
            sortBy={this.state.sortBy}
            changeSort={this.changeSort} />
        </div>
        <ul className='post-list'>
        {posts.map(p => 
          <PostItem
            onEdit={this.handleEdit}
            key={p.id}
            post={p} />
        )}
        </ul>
      </div>
    );
  }
}
