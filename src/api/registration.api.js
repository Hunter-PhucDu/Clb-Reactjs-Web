
import {Axios } from '../services/AxiosService'

const getRegistrations = async (params) => {
    try {
        let { data } = await Axios.get("/registrations", { params: params });
        return data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};

const getRegistrationsExcel = async (params) => {
    try {
        let { data } = await Axios.get("/registrations/export-excel", { params: params });
        return data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};

const addRegistration = async (formData) => {
    try {
        let { data } = await Axios.post("/registrations/add-new", formData);
        return data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};

const addQuestion = async (formData) => {
    try {
        let { data } = await Axios.post("/registrations/add-question", formData);
        return data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};

const getAllQuestions = async () => {
    try {
        let { data } = await Axios.get("/registrations/questions");
        return data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};

const registrationAPI = {
    getRegistrations,
    getRegistrationsExcel,
    addRegistration,
    addQuestion,
    getAllQuestions
};

export default registrationAPI;
