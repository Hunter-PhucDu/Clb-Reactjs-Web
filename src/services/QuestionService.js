import BaseService from './BaseService'

class QuestionService extends BaseService {
    constructor() {
        super()
    }

    async addQuestion(questionData) {
        try {
            const response = await this.post('/questions', questionData)
            return response.data
        } catch (error) {
            throw new Error(error.response?.data)
        }
    }

    async updateQuestion(questionId, questionData) {
        try {
            const response = await this.put(`/questions/${questionId}`, questionData)
            return response.data
        } catch (error) {
            throw new Error(error.response?.data)
        }
    }

    async getQuestion(questionId) {
        try {
            const response = await this.get(`/questions/${questionId}`)
            return response.data
        } catch (error) {
            throw new Error(error.response?.data)
        }
    }

    async getQuestions() {
        try {
            const response = await this.get('/questions')
            return response.data
        } catch (error) {
            throw new Error(error.response?.data)
        }
    }

    async deleteQuestion(questionId) {
        try {
            const response = await this.delete(`/questions/${questionId}`)
            return response.data
        } catch (error) {
            throw new Error(error.response?.data)
        }
    }


}

export default new QuestionService()
