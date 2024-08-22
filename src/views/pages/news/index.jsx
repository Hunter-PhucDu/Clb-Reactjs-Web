import React, { useEffect, useState } from 'react'
import PostService from '../../../services/PostService'
import BasePostCard from '../../base/BasePostCard'
import DefaultLayout from '../../../layout/DefaultLayout'

const News = () => {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await PostService.getPosts()
                setPosts(response.data)
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }

        fetchPosts()
    }, [])

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>
    
    return (
        <DefaultLayout>
            <div className="post-list">
                {posts.length === 0 ? (
                    <p>No posts available</p>
                ) : (
                    posts.map(post => (
                        <BasePostCard key={post.title} post={post} />
                    ))
                )}
            </div>
        </DefaultLayout>
    )
}

export default News
