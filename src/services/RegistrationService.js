import BaseService from './BaseService'

class RegistrationService extends BaseService {
    constructor() {
        super()
    }

    async addRegistration(formData) {
        try {
            const response = await this.post('/registrations', formData)
            return response.data
        } catch (error) {
            throw new Error(error.response?.data)
        }
    }

    async getRegistration(registrationId) {
        try {
            const response = await this.get(`/registrations/${registrationId}`)
            return response.data
        } catch (error) {
            throw new Error(error.response?.data)
        }
    }

    async updatePassedFirstRound(registrationId, updateData) {
        try {
            const response = await this.put(`/registrations/passedFirstRound/${registrationId}`, updateData)
            return response.data
        } catch (error) {
            throw new Error(error.response?.data)
        }
    }

    async unpassedFirstRound() {
        try {
            const response = await this.get('/registrations/unpassedFirstRound')
            return response.data
        } catch (error) {
            throw new Error(error.response?.data)
        }
    }

    async updatePassedSecondRound(registrationId) {
        try {
            const response = await this.put(`/registrations/passedSecondRound/${registrationId}`)
            return response.data
        } catch (error) {
            throw new Error(error.response?.data)
        }
    }

    async unpassedSecondRound() {
        try {
            const response = await this.get('/registrations/unpassedFirstRound')
            return response.data
        } catch (error) {
            throw new Error(error.response?.data)
        }
    }

    async getRegistrations() {
        try {
            const response = await this.get('/registrations')
            return response.data
        } catch (error) {
            throw new Error(error.response?.data)
        }
    }

    async searchRegistrations(searchParams) {
        try {
            const response = await this.get('/registrations/search', { params: searchParams })
            return response.data
        } catch (error) {
            throw new Error(error.response?.data)
        }
    }

    async deleteRegistration(registrationId) {
        try {
            const response = await this.delete(`/registrations/${registrationId}`)
            return response.data
        } catch (error) {
            throw new Error(error.response?.data)
        }
    }


}

export default new RegistrationService()
