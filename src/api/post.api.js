import { AxiosAuth } from '../services/AxiosService';

const addPost = async (formData) => {
  try {
    const response = await AxiosAuth.post('/posts', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data);
  }
};

const updatePost = async (postId, formData) => {
  try {
    const response = await AxiosAuth.put(`/posts/update/${postId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data);
  }
};

const getPost = async (postId) => {
  try {
    const response = await AxiosAuth.get(`/posts/details/${postId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data);
  }
};

const publishPost = async (postId) => {
  try {
    const response = await AxiosAuth.put(`/posts/publish/${postId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data);
  }
};

const getPosts = async () => {
  try {
    const response = await AxiosAuth.get('/posts');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data);
  }
};

const searchPosts = async (searchParams = {}) => {
  try {
    const response = await AxiosAuth.get('/posts/search', { params: searchParams });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data);
  }
};

const deletePost = async (postId) => {
  try {
    const response = await AxiosAuth.delete(`/posts/${postId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data);
  }
};

const postServiceAPI = {
  addPost,
  updatePost,
  getPost,
  publishPost,
  getPosts,
  searchPosts,
  deletePost,
};

export default postServiceAPI;
