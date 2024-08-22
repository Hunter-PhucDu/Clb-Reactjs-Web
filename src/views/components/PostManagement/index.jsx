import React, { useState, useEffect } from 'react';
import './index.scss';
import PostService from '../../../services/PostService';
import Notification from '../Notification';
import BasePostEditor from '../../base/BasePostEditor';

const PostManagement = () => {
  const [posts, setPosts] = useState([]);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [showAddPostForm, setShowAddPostForm] = useState(false);

  const fetchPosts = async () => {
    try {
      const response = await PostService.getPosts();
      console.log("data post: ", response.data);
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleOpenAddPostForm = () => {
    setShowAddPostForm(true);
  };

  const notify = (message, type) => {
    setNotification({ message, type });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="post-management-content">
      <h1>Quản lý bài viết</h1>
      <button className="button-add-post" onClick={handleOpenAddPostForm}>
        Thêm bài viết
      </button>
      <div className="post-summary">
        Tổng: {posts.length}
      </div>
      {showAddPostForm && (
        <BasePostEditor notify={notify} />
      )}
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: '', type: '' })}
      />
    </div>
  );
};

export default PostManagement;
