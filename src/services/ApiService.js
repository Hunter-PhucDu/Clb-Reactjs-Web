import axios from 'axios'

class ApiService {

    Axios = axios.create({
        baseURL: process.env.REACT_APP_BACK_END_URL,
        withCredentials: true
    })
}