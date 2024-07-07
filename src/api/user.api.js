import { AxiosAuth } from '../services/AxiosService';

const getUsers = async (paginationData) => {
  try {
    const response = await AxiosAuth.get('/users', { params: paginationData });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data);
  }
};

const getUserById = async (userId) => {
  try {
    const response = await AxiosAuth.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data);
  }
};

const updateUser = async (userId, updateData) => {
  try {
    const response = await AxiosAuth.put(`/users/${userId}`, updateData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data);
  }
};

const changePassword = async (userId, passwordData) => {
  try {
    const response = await AxiosAuth.put(`/users/${userId}/change-password`, passwordData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data);
  }
};

const deleteUser = async (userId) => {
  try {
    await AxiosAuth.delete(`/users/${userId}`);
  } catch (error) {
    throw new Error(error.response?.data);
  }
};

const userServiceAPI = {
  getUsers,
  getUserById,
  updateUser,
  changePassword,
  deleteUser,
};

export default userServiceAPI;