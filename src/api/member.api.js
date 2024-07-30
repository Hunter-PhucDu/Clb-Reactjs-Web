import { AxiosAuth } from '../services/AxiosService';

const addMember = async (formData) => {
  try {
    const response = await AxiosAuth.post('/members', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data);
  }
};

const updateMember = async (memberId, formData) => {
  try {
    const response = await AxiosAuth.put(`/members/${memberId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data);
  }
};

const getMember = async (memberId) => {
  try {
    const response = await AxiosAuth.get(`/members/details/${memberId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data);
  }
};

const getMembers = async () => {
  try {
    const response = await AxiosAuth.get('/members/list');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data);
  }
};

const searchMembers = async (searchParams = {}) => {
  try {
    const response = await AxiosAuth.get('/members/search', { params: searchParams });
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data);
  }
};

const deleteMember = async (memberId) => {
  try {
    const response = await AxiosAuth.delete(`/members/${memberId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data);
  }
};

const memberServiceAPI = {
  addMember,
  updateMember,
  getMember,
  getMembers,
  searchMembers,
  deleteMember,
};

export default memberServiceAPI;
