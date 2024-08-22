import BaseService from './BaseService'

class UserService extends BaseService {
    constructor() {
        super()
    }

    async signUp(formData) {
        try {
            const response = await this.post('/users', formData)
            return response.data
        } catch (error) {
            throw new Error(error.response?.data)
        }
    }

    async getUser() {
        try {
            const response = await this.get('/users')
            return response.data
        } catch (error) {
            throw new Error(error.response?.data)
        }
    }

    async updateUser(formData) {
        try {
            const response = await this.put('/users/settings', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            return response.data
        } catch (error) {
            throw new Error(error.response?.data)
        }
    }

    async changePassword(changePasswordDto) {
        try {
            const response = await this.put('/users/change-password', changePasswordDto)
            return response.data
        } catch (error) {
            throw new Error(error.response?.data)
        }
    }

    async getUsers() {
        try {
            const response = await this.get('/users/list')
            return response.data
        } catch (error) {
            throw new Error(error.response?.data)
        }
    }

    async getUsersBySearch(searchParams = {}) {
        try {
            const response = await this.get('/users/search', { params: searchParams })
            return response.data
        } catch (error) {
            throw new Error(error.response?.data)
        }
    }

    async deleteUser(userId) {
        try {
            const response = await this.delete(`/users/${userId}`)
            return response.data
        } catch (error) {
            throw new Error(error.response?.data)
        }
    }
}

export default new UserService()
