import * as API from '../utils/api';
import * as types from './types';

// Category actions
export const listCategories = categories => ({
  type: types.LIST_CATEGORIES,
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
  type: types.LIST_POSTS,
  posts,
});

export const createPost = post => dispatch => (
  API.addPost(post).then(r => dispatch(
    addPost(r),
  ))
);

export const addPost = post => ({
  type: types.ADD_POST,
  post,
});

export const modifyPost = post => dispatch => (
  API.editPost(post.id, post).then(r => dispatch(
    editPost(r),
  ))
);

export const editPost = post => ({
  type: types.EDIT_POST,
  post,
});

export const removePost = id => dispatch => (
  API.deletePost(id).then(r => dispatch(
    deletePost(r),
  ))
);

export const deletePost = post => ({
  type: types.DELETE_POST,
  post,
});
 
export const votePost = (id, upvote = false) => dispatch => (
  API.votePost(id, upvote).then(r => dispatch(
    editPost(r)
  ))
);

// Comments actions
export const fetchComments = id => dispatch => (
  API.postComments(id).then(r => dispatch(
    listComments(r)
  ))
);

export const listComments = comments => ({
  type: types.LIST_COMMENTS,
  comments,
});

export const clearComments = () => ({
  type: types.CLEAR_COMMENTS,
});

export const createComment = comment => dispatch => (
  API.addComment(comment).then(r => dispatch(
    addComment(r),
  ))
);

export const addComment = comment => ({
  type: types.ADD_COMMENT,
  comment,
});

export const modifyComment = comment => dispatch => (
  API.editComment(comment.id, comment).then(r => dispatch(
    editComment(r),
  ))
);

export const editComment = comment => ({
  type: types.EDIT_COMMENT,
  comment,
});

export const removeComment = id => dispatch => (
  API.deleteComment(id).then(r => dispatch(
    deleteComment(r),
  ))
);

export const deleteComment = comment => ({
  type: types.DELETE_COMMENT,
  comment,
});
 
export const voteComment = (id, upvote = false) => dispatch => (
  API.voteComment(id, upvote).then(r => dispatch(
    editComment(r)
  ))
);

// Modal Actions
export const setAddModal = () => ({
  type: types.MODAL_ADD,
});

export const setEditModal = (post) => ({
  type: types.MODAL_EDIT,
  post,
});

export const closeModal = () => ({
  type: types.MODAL_HIDE,
});
