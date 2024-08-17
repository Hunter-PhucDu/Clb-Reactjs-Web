import { AxiosAuth } from '../services/AxiosService';

const signUp = async (formData) => {
  try {
    const response = await AxiosAuth.post('/users', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data);
  }
};


const getUser = async () => {
  try {
    const response = await AxiosAuth.get('/users');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data);
  }
};

const updateUser = async (formData) => {
  try {
    const response = await AxiosAuth.put('/users/settings', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data);
  }
};

const changePassword = async (changePasswordDto) => {
  try {
    const response = await AxiosAuth.put('/users/change-password', changePasswordDto);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data);
  }
};

const getUsers = async () => {
  try {
    const response = await AxiosAuth.get('/users/list');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data);
  }
};

const getUsersBySearch = async (searchParams = {}) => {
  try {
    const response = await AxiosAuth.get('/users/search', { params: searchParams });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data);
  }
};

const deleteUser = async (userId) => {
  try {
    const response = await AxiosAuth.delete(`/users/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data);
  }
};

const userServiceAPI = {
  signUp,
  getUser,
  updateUser,
  changePassword,
  getUsers,
  getUsersBySearch,
  deleteUser,
};

export default userServiceAPI;
