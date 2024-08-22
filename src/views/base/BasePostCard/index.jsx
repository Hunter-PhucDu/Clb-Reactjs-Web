import React from 'react'
import PropTypes from 'prop-types'

const BasePostCard = ({ post }) => {
    return (
        <div className="post-card">
            <h2>{post.title}</h2>
            <div
                className="rich-text-content"
                dangerouslySetInnerHTML={{ __html: post.richTextContent }}
            />
            <p><strong>Tác giả:</strong> {post.author}</p>
        </div>
    )
}

BasePostCard.propTypes = {
    post: PropTypes.shape({
        title: PropTypes.string.isRequired,
        richTextContent: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired
    }).isRequired
}

export default BasePostCard
