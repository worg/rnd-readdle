import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const PostItem = ({ post }) => (
  <li className='post'>
    <Link
      to={`/${post.category}/${post.id}`} >
      {post.title}
    </Link>
  </li>
);

const Home = ({ posts }) => {
  return (
    <div className='home'>
      <h3>Posts</h3>
      <ul className='post-list'>
      {Object.keys(posts).map(id => 
        <PostItem
          key={id}
          post={posts[id]} />
      )}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => ({
  posts: state.posts.byId,
});

export default connect(mapStateToProps)(Home);
