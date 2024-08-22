import BaseService from './BaseService'

class AuthService extends BaseService {
    constructor() {
        super()
    }

    async signInAdmin(credentials) {
        try {
            const response = await this.post('/auth/admin/sign-in', credentials)
            return response.data
        } catch (error) {
            throw new Error(error.response?.data)
        }
    }

    async signInUser(credentials) {
        try {
            const response = await this.post('/auth/user/sign-in', credentials)
            return response.data
        } catch (error) {
            throw new Error(error.response?.data)
        }
    }

    async generateOtp(otpData) {
        try {
            const response = await this.post('/auth/generate-otp', otpData)
            return response.data
        } catch (error) {
            throw new Error(error.response?.data)
        }
    }

    async forgotPassword(forgotPasswordData) {
        try {
            const response = await this.post('/auth/forgot-password', forgotPasswordData)
            return response.data
        } catch (error) {
            throw new Error(error.response?.data)
        }
    }


}

export default new AuthService()
