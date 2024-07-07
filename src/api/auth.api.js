import { Axios } from '../services/AxiosService';

const login = async (credentials) => {
  try {
    const response = await Axios.post('/auth/sign-in', credentials);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data);
  }
};

const signup = async (userData) => {
  try {
    const response = await Axios.post('/auth/sign-up', userData);
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
  login,
  signup,
  logout,
  refreshToken,
};

export default authAPI;
