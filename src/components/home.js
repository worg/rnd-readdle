import { connect } from 'react-redux';
import PostList from './posts/list';

const mapStateToProps = ({ posts }) => ({
  posts: posts.byId,
});

export default connect(mapStateToProps)(PostList);
