import { combineReducers } from 'redux';
import posts from './posts';
import categories from './categories';
import modal from './modal';
import comments from './comments';

export default combineReducers({
  posts,
  categories,
  modal,
  comments,
});
