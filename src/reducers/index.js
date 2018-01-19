import { combineReducers } from 'redux';
import posts from './posts';
import categories from './categories';
import modal from './modal';

export default combineReducers({
  posts,
  categories,
  modal,
});
