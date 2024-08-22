import BaseService from './BaseService'

class RegistrationSettingService extends BaseService {
    constructor() {
        super()
    }

    async getStatus() {
        try {
            const response = await this.get('/registrationSettings')
            return response.data
        } catch (error) {
            throw new Error(error.response?.data)
        }
    }

    async setStatus(statusData) {
        try {
            const response = await this.put('/registrationSettings', statusData)
            return response.data
        } catch (error) {
            throw new Error(error.response?.data)
        }
    }
}

export default new RegistrationSettingService()
