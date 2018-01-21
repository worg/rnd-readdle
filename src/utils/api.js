import { haiku } from './haiku';

const API_URL = 'http://localhost:3001';

// Generate a unique token for each user
let token = localStorage.token;
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8);
// Default username
export let USERNAME = localStorage.username || haiku();

if (!localStorage.username) {
  localStorage.username = USERNAME;
}

const headers = {
  'Authorization': token,
  'Content-Type': 'application/json',
};

const fetchAPI = (path, opts = {}) =>
  fetch(`${API_URL}${path}`, { headers,  ...opts })
  .then(r => r.json());

export const getCategories = () =>
  fetchAPI(`/categories`)
  .then(d => d.categories);

// fetch posts either by id or all
export const getPosts = (id = false) =>
  fetchAPI(`/posts${!id ? '' : '/' + id }`);

export const postsByCat = category =>
  fetchAPI(`/${category}/posts`);

export const addPost = post => fetchAPI(`/posts`, {
  method: 'POST',
  body: JSON.stringify({ ...post, author: USERNAME }),
});

export const editPost = (id, post) => fetchAPI(`/posts/${id}`, {
  method: 'PUT',
  body: JSON.stringify(post),
});

export const deletePost = (id) => fetchAPI(`/posts/${id}`, {
  method: 'DELETE',
});

export const votePost = (id, upvote = false) => fetchAPI(`/posts/${id}`, {
  method: 'POST',
  body: JSON.stringify({ option: upvote ? 'upVote' : 'downVote' }),
});

export const postComments = id =>
  fetchAPI(`/posts/${id}/comments`);

export const getComment = id =>
  fetchAPI(`/comments/${id}`);
