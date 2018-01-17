import { connect } from 'react-redux';
import PostList from '../posts/list';

const mapStateToProps = ({ posts }, { match }) => {
  const { params: { category } } = match;
  return {
    posts: Object.values(posts.byId).filter(p => {
      return p.category === category;
    }),
    title: category,
    filter: category,
  }
};

export default connect(mapStateToProps)(PostList)
