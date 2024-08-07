import { Axios } from '../services/AxiosService';

const loginAdmin = async (credentials) => {
  try {
    const response = await Axios.post('/auth/admin/sign-in', credentials);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data);
  }
};

const loginUser = async (credentials) => {
  try {
    const response = await Axios.post('/auth/user/sign-in', credentials);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data);
  }
};

const logout = async () => {
  try {
    const response = await Axios.post('/auth/log-out');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data);
  }
};

const refreshToken = async (refreshTokenData) => {
  try {
    const response = await Axios.post('/auth/refresh-token', refreshTokenData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data);
  }
};

const authAPI = {
  loginAdmin,
  loginUser,
  logout,
  refreshToken,
};

export default authAPI;
