import BaseService from './BaseService'

class AdminService extends BaseService {
    constructor() {
        super()
    }

    async addAdmin(adminData) {
        try {
            const response = await this.post('/admins', adminData)
            return response.data
        } catch (error) {
            throw new Error(error.response?.data)
        }
    }

    async getAdmins() {
        try {
            const response = await this.get('/admins')
            console.log(response.data)
            return response.data
        } catch (error) {
            throw new Error(error.response?.data)
        }
    }

    async changePassword(changePasswordData) {
        try {
            const response = await this.put('/admins/change-password', changePasswordData)
            return response.data
        } catch (error) {
            throw new Error(error.response?.data)
        }
    }

    async forgotPasswordAdmin(forgotPasswordData) {
        try {
            const response = await this.put('/admins/forgot-password', forgotPasswordData)
            return response.data
        } catch (error) {
            throw new Error(error.response?.data)
        }
    }

    async deleteAdmin(adminId) {
        try {
            const response = await this.delete(`/admins/${adminId}`)
            return response.data
        } catch (error) {
            throw new Error(error.response?.data)
        }
    }


}

export default new AdminService()
