import BaseService from './BaseService'

class MemberService extends BaseService {
    constructor() {
        super()
    }

    async addMember(formData) {
        try {
            const response = await this.post('/members', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            return response.data
        } catch (error) {
            throw new Error(error.response?.data)
        }
    }

    async updateMember(memberId, formData) {
        try {
            const response = await this.put(`/members/${memberId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            return response.data
        } catch (error) {
            throw new Error(error.response?.data)
        }
    }

    async getMember(memberId) {
        try {
            const response = await this.get(`/members/details/${memberId}`)
            return response.data
        } catch (error) {
            throw new Error(error.response?.data)
        }
    }

    async getMembers() {
        try {
            const response = await this.get('/members/list')
            return response.data
        } catch (error) {
            throw new Error(error.response?.data)
        }
    }

    async deleteMember(memberId) {
        try {
            const response = await this.delete(`/members/${memberId}`)
            return response.data
        } catch (error) {
            throw new Error(error.response?.data)
        }
    }


}

export default new MemberService()
