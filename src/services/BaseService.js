import axios from 'axios'

class BaseService {
    constructor() {
        this.api = axios.create({
            timeout: 15000,
            baseURL: 'http://[::1]:8080/api/v1',
        })
    }

    get(endpoint, params) {
        return this.api.get(endpoint, { params })
    }

    post(endpoint, data) {
        return this.api.post(endpoint, data)
    }

    put(endpoint, data) {
        return this.api.put(endpoint, data)
    }

    delete(endpoint) {
        return this.api.delete(endpoint)
    }

    handleError(error) {
        console.error('API Error: ', error)
    }
}

export default BaseService