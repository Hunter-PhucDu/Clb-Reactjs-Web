import { AxiosAuth } from '../services/AxiosService';

const getStatus = async () => {
  try {
    const response = await AxiosAuth.get('/registrationSettings');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data);
  }
};

const setStatus = async (statusData) => {
  try {
    const response = await AxiosAuth.put('/registrationSettings', statusData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data);
  }
};

const registrationSettingServiceAPI = {
  getStatus,
  setStatus,
};

export default registrationSettingServiceAPI;
