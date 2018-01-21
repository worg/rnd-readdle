import * as API from '../utils/api';
// Category constants
export const LIST_POSTS = 'LIST_POSTS';
export const LIST_CATEGORIES = 'LIST_CATEGORIES';
// Post constants
export const ADD_POST = 'ADD_POST';
export const EDIT_POST = 'EDIT_POST';
export const DELETE_POST = 'DELETE_POST';
export const VOTE_POST = 'VOTE_POST';
// Modal constants
export const MODAL_EDIT = 'MODAL_EDIT';
export const MODAL_ADD = 'MODAL_ADD';
export const MODAL_HIDE = 'MODAL_HIDE';

// Category actions
export const listCategories = categories => ({
  type: LIST_CATEGORIES,
  categories,
});

export const fetchCategories = () => dispatch => (
  API.getCategories().then(categories => dispatch(
    listCategories(categories)
  ))
);

// Post actions
export const fetchPosts = () => dispatch => (
  API.getPosts().then(posts => dispatch(
    listPosts(posts)
  ))
);

export const listPosts = posts => ({
  type: LIST_POSTS,
  posts,
});

export const createPost = post => dispatch => (
  API.addPost(post).then(r => dispatch(
    addPost(r),
  ))
);

export const addPost = post => ({
  type: ADD_POST,
  post,
});

export const modifyPost = post => dispatch => (
  API.editPost(post.id, post).then(r => dispatch(
    editPost(r),
  ))
);

export const editPost = post => ({
  type: EDIT_POST,
  post,
});

export const removePost = id => dispatch => (
  API.deletePost(id).then(r => dispatch(
    deletePost(r),
  ))
);

export const deletePost = post => ({
  type: DELETE_POST,
  post,
});
 
export const votePost = (id, upvote = false) => dispatch => (
  API.votePost(id, upvote).then(r => dispatch(
    editPost(r)
  ))
);

// Modal Actions
export const setAddModal = () => ({
  type: MODAL_ADD,
});

export const setEditModal = (post) => ({
  type: MODAL_EDIT,
  post,
});

export const closeModal = () => ({
  type: MODAL_HIDE,
});
