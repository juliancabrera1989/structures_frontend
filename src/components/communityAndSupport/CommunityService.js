import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || '/api'; // adjust if needed

const getPosts = async (params = {}) => {
  const res = await axios.get(`${API_BASE}/posts`, { params });
  return res.data;
};

const getPost = async (postId) => {
  const res = await axios.get(`${API_BASE}/posts/${postId}`);
  return res.data;
};

const createPost = async (postData, token) => {
  const res = await axios.post(`${API_BASE}/posts`, postData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

const createComment = async (postId, commentData, token) => {
  const res = await axios.post(`${API_BASE}/posts/${postId}/comments`, commentData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export default {
  getPosts,
  getPost,
  createPost,
  createComment,
};
