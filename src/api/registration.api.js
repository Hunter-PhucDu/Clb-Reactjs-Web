import { AxiosAuth } from '../services/AxiosService';

const addRegistration = async (formData) => {
  try {
    const response = await AxiosAuth.post('/registrations', formData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data);
  }
};

const getRegistration = async (registrationId) => {
  try {
    const response = await AxiosAuth.get(`/registrations/${registrationId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data);
  }
};

const updatePassedFirstRound = async (registrationId, updateDto) => {
  try {
    const response = await AxiosAuth.put(`/registrations/passedFirstRound/${registrationId}`, updateDto, {
      headers: {
        'Content-Type': 'application/json', // Chỉ định định dạng JSON
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error response from server:", error.response?.data);
    throw new Error(error.response?.data || error.message);
  }
};


const updatePassedSecondRound = async (registrationId) => {
  try {
    const response = await AxiosAuth.put(`/registrations/passedSecondRound/${registrationId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data);
  }
};

const getRegistrations = async () => {
  try {
    const response = await AxiosAuth.get('/registrations');
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data);
  }
};

const searchRegistrations = async (searchParams) => {
  try {
    const response = await AxiosAuth.get('/registrations/search', { params: searchParams });
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data);
  }
};

const deleteRegistration = async (registrationId) => {
  try {
    const response = await AxiosAuth.delete(`/registrations/${registrationId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data);
  }
};

const registrationServiceAPI = {
  addRegistration,
  getRegistration,
  updatePassedFirstRound,
  updatePassedSecondRound,
  getRegistrations,
  searchRegistrations,
  deleteRegistration,
};

export default registrationServiceAPI;
