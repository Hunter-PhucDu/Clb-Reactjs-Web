import { AxiosAuth } from '../services/AxiosService';

const addAdmin = async (adminData) => {
  try {
    const response = await AxiosAuth.post('/admins', adminData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data);
  }
};

const getAdmins = async () => {
  try {
    const response = await AxiosAuth.get('/admins');
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data);
  }
};

const changePassword = async (changePasswordData) => {
  try {
    const response = await AxiosAuth.put('/admins/change-password', changePasswordData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data);
  }
};

const forgotPasswordAdmin = async (forgotPasswordData) => {
  try {
    const response = await AxiosAuth.put('/admins/forgot-password', forgotPasswordData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data);
  }
};

const deleteAdmin = async (adminId) => {
  try {
    const response = await AxiosAuth.delete(`/admins/${adminId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data);
  }
};

const adminServiceAPI = {
  addAdmin,
  getAdmins,
  changePassword,
  forgotPasswordAdmin,
  deleteAdmin,
};

export default adminServiceAPI;
