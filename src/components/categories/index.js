import { connect } from 'react-redux';
import PostList from '../posts/list';

const mapStateToProps = ({ posts }, { match, history }) => {
  const { params: { category } } = match;
  const postList = Object.values(posts.byId).filter(p => {
    return p.category === category;
  })

  if (postList.length < 1) {
    history.replace('/404');
  }

  return {
    posts: postList,
    title: category,
    filter: category,
  };
};

export default connect(mapStateToProps)(PostList);
