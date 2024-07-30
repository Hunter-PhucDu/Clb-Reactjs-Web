import { AxiosAuth } from '../services/AxiosService';

const addQuestion = async (questionData) => {
  try {
    const response = await AxiosAuth.post('/questions', questionData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data);
  }
};

const updateQuestion = async (questionId, questionData) => {
  try {
    const response = await AxiosAuth.put(`/questions/${questionId}`, questionData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data);
  }
};

const getQuestion = async (questionId) => {
  try {
    const response = await AxiosAuth.get(`/questions/${questionId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data);
  }
};

const getQuestions = async () => {
  try {
    const response = await AxiosAuth.get('/questions');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data);
  }
};

const deleteQuestion = async (questionId) => {
  try {
    const response = await AxiosAuth.delete(`/questions/${questionId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data);
  }
};

const questionServiceAPI = {
  addQuestion,
  updateQuestion,
  getQuestion,
  getQuestions,
  deleteQuestion,
};

export default questionServiceAPI;
