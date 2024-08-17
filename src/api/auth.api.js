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

const generateOtp = async (otpData) => {
  try {
    const response = await Axios.post('/auth/generate-otp', otpData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data);
  }
};

const forgotPassword = async (forgotPasswordData) => {
  try {
    const response = await Axios.post('/auth/forgot-password', forgotPasswordData);
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
  generateOtp,
  forgotPassword,
  refreshToken,
};

export default authAPI;
