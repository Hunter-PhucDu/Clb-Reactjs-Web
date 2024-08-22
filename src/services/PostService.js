import BaseService from './BaseService'

class PostService extends BaseService {
    constructor() {
        super()
    }

    async addPost(formData) {
        try {
            const response = await this.post('/posts', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            return response.data
        } catch (error) {
            throw new Error(error.response?.data)
        }
    }

    async getPost(postId) {
        try {
            const response = await this.get(`/posts/details/${postId}`)
            return response.data
        } catch (error) {
            throw new Error(error.response?.data)
        }
    }

    async updatePost(postId, formData) {
        try {
            const response = await this.put(`/posts/update/${postId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            return response.data
        } catch (error) {
            throw new Error(error.response?.data)
        }
    }

    async publishPost(postId) {
        try {
            const response = await this.put(`/posts/publish/${postId}`)
            return response.data
        } catch (error) {
            throw new Error(error.response?.data)
        }
    }

    async getPosts() {
        try {
            const response = await this.get('/posts')
            return response.data
        } catch (error) {
            throw new Error(error.response?.data)
        }
    }

    async searchPosts(searchParams = {}) {
        try {
            const response = await this.get('/posts/search', { params: searchParams })
            return response.data
        } catch (error) {
            throw new Error(error.response?.data)
        }
    }

    async deletePost(postId) {
        try {
            const response = await this.delete(`/posts/${postId}`)
            return response.data
        } catch (error) {
            throw new Error(error.response?.data)
        }
    }
}

export default new PostService()
