import React, { useState, useEffect } from 'react';
import UserService from '../../../services/UserService';
import Notification from '../Notification';
import './index.scss';


const UserManagementContent = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [notification, setNotification] = useState({ message: '', type: '' });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await UserService.getUsers();
        setUsers(response.data || []);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults(users);
    } else {
      const results = users.filter(user =>
        user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
    }
  }, [searchQuery, users]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDeleteUser = (userId) => {
    setUserToDelete(userId);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await UserService.deleteUser(userToDelete);
      setUsers(users.filter(user => user._id !== userToDelete));
      setSearchResults(searchResults.filter(user => user._id !== userToDelete));
      setNotification({ message: 'Xóa thành công!', type: 'success' });
    } catch (error) {
      console.error('Error deleting user:', error);
      setNotification({ message: 'Xóa thất bại!', type: 'error' });
    }
    setShowDeleteConfirm(false);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setUserToDelete(null);
  };

  return (
    <div className="user-management-content">
      <h1>Quản lý Người dùng</h1>
      <div className="search-container">
        <Notification 
          message={notification.message} 
          type={notification.type} 
          onClose={() => setNotification({ message: '', type: '' })} 
        />
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Tìm kiếm người dùng..."
          className="search-input"
        />
      </div>
      <div className="user-count">
        Tổng: {searchResults.length}
      </div>
      <div className="tab-content">
        <ul className="user-list">
          {searchResults.map((user, index) => (
            <li className="user-list-item" key={user._id}>
              <div className="user-info">
                <div className="user-details">
                  <span className="user-stt">{index + 1}</span>
                  <span className="user-name">{user.fullName}</span>
                  <span className="user-email">Email: {user.email}</span>
                </div>
              </div>
              <div className="actions">
                <button className="delete-button" onClick={() => handleDeleteUser(user._id)}>Xóa</button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {showDeleteConfirm && (
        <>
          <div className="overlay"></div>
          <div className="delete-confirmation-modal">
            <div className="delete-confirmation-content">
              <p>Bạn có chắc chắn muốn xóa người dùng này?</p>
              <div className="delete-confirmation-actions">
                <button onClick={confirmDelete}>Xóa ngay</button>
                <button onClick={cancelDelete} className="close">Hủy</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserManagementContent;