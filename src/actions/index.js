import * as API from '../utils/api';
export const LIST_POSTS = 'LIST_POSTS';
export const LIST_CATEGORIES = 'LIST_CATEGORIES';

export const listPosts = posts => ({
  type: LIST_POSTS,
  posts,
});

export const listCategories = categories => ({
  type: LIST_CATEGORIES,
  categories,
});

export const fetchPosts = () => dispatch => (
  API.getPosts().then(posts => dispatch(
    listPosts(posts)
  ))
);

export const fetchCategories = () => dispatch => (
  API.getCategories().then(categories => dispatch(
    listCategories(categories)
  ))
);
