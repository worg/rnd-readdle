
const API_URL = 'http://localhost:3001';

// Generate a unique token for each user
let token = localStorage.token;
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8);

const headers = {
  'Authorization': token
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

export const postComments = id =>
  fetchAPI(`/posts/${id}/comments`);

export const getComment = id =>
  fetchAPI(`/comments/${id}`);
