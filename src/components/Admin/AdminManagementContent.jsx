import React, { useState, useEffect } from 'react';
import './AdminManagementContent.scss';
import adminServiceAPI from '../../api/admin.api';
import Notification from '../../components/Notification';

const AdminManagementContent = () => {
  const [admins, setAdmins] = useState([]);
  const [adminData, setAdminData] = useState({
    userName: '',
    password: ''
  });
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [showAddAdminForm, setShowAddAdminForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showForgotPasswordForm, setShowForgotPasswordForm] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState(null);
  const [forgotPasswordData, setForgotPasswordData] = useState({
    userName: '',
    newPassword: ''
  });
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  const fetchAdmins = async () => {
    try {
      const response = await adminServiceAPI.getAdmins();
      setAdmins(response.data);
    } catch (error) {
      console.error('Error fetching admins:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminData({
      ...adminData, 
      [name]: value
    });
  };

  const handleForgotPasswordChange = (e) => {
    const { name, value } = e.target;
    setForgotPasswordData({
      ...forgotPasswordData, 
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await adminServiceAPI.addAdmin(adminData);
      setNotification({ message: 'Admin added successfully!', type: 'success' });
      setAdminData({
        userName: '',
        password: ''
      });
      fetchAdmins();
      setShowAddAdminForm(false);
    } catch (error) {
      setNotification({ message: error.message, type: 'error' });
    }
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      await adminServiceAPI.forgotPasswordAdmin(forgotPasswordData);
      setNotification({ message: 'Password reset successfully!', type: 'success' });
      setForgotPasswordData({
        userName: '',
        newPassword: ''
      });
      setShowForgotPasswordForm(false);
    } catch (error) {
      setNotification({ message: error.message, type: 'error' });
    }
  };

  const handleOpenAddAdminForm = () => {
    setShowAddAdminForm(true);
  };

  const handleCloseAddAdminForm = () => {
    setShowAddAdminForm(false);
  };

  const handleOpenForgotPasswordForm = (admin = null) => {
    if (admin) {
      setForgotPasswordData({ userName: admin.userName, newPassword: '' });
      setSelectedAdmin(admin);
    } else {
      setForgotPasswordData({ userName: '', newPassword: '' });
      setSelectedAdmin(null);
    }
    setShowForgotPasswordForm(true);
  };

  const handleCloseForgotPasswordForm = () => {
    setShowForgotPasswordForm(false);
  };

  const confirmDeleteAdmin = (adminId) => {
    setAdminToDelete(adminId);
    setShowDeleteConfirm(true);
  };

  const cancelDeleteAdmin = () => {
    setAdminToDelete(null);
    setShowDeleteConfirm(false);
  };

  const confirmDelete = async () => {
    if (adminToDelete) {
      try {
        await adminServiceAPI.deleteAdmin(adminToDelete);
        fetchAdmins();
        setAdminToDelete(null);
        setShowDeleteConfirm(false);
        setNotification({ message: 'Admin deleted successfully!', type: 'success' });
      } catch (error) {
        setNotification({ message: 'Error deleting admin.', type: 'error' });
      }
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  return (
    <div className="admin-management-content">
      <h1>Quản lý quản trị viên</h1>
      <button className="button-add-admin" onClick={handleOpenAddAdminForm}>Thêm Quản Trị Viên</button>
      <button className="button-forgot-password" onClick={() => handleOpenForgotPasswordForm()}>Quên Mật Khẩu</button>
      <div className="admin-summary">
        Tổng: {admins.length}
      </div>
      <div className="admin-list-container">
        <ul className="admin-list">
          {admins.map((admin, index) => (
            <li className="admin-list-item" key={admin._id}>
              <div className="admin-info">
                <span className="admin-stt">{index + 1}</span>
                {admin.userName}
              </div>
              <div className="actions">
                <button className="forgot-password-button" onClick={() => handleOpenForgotPasswordForm(admin)}>Quên Mật Khẩu</button>
                <button className="delete-button" onClick={() => confirmDeleteAdmin(admin._id)}>Xóa</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {showAddAdminForm && (
        <>
          <div className="overlay"></div>
          <div className="popup-form">
            <div className="popup-form-content">
              <h2>Thêm Quản Trị Viên</h2>
              <form onSubmit={handleSubmit}>
                <div>
                  <label>Username:</label>
                  <input type="text" name="userName" value={adminData.userName} onChange={handleChange} required />
                </div>
                <div className="password-container">
                  <label>Password:</label>
                  <input
                    type="password"
                    name="password"
                    value={adminData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="submit-button">Thêm Quản Trị Viên</button>
                <button type="button" className="close-buttons" onClick={handleCloseAddAdminForm}>Đóng</button>
              </form>
            </div>
          </div>
        </>
      )}
      {showForgotPasswordForm && (
        <>
          <div className="overlay"></div>
          <div className="popup-form">
            <div className="popup-form-content">
              <h2>Quên Mật Khẩu</h2>
              <form onSubmit={handleForgotPasswordSubmit}>
                <div>
                  <label>Username:</label>
                  <input
                    type="text"
                    name="userName"
                    value={forgotPasswordData.userName || (selectedAdmin ? selectedAdmin.userName : '')}
                    onChange={handleForgotPasswordChange}
                    readOnly={!!selectedAdmin} // Thêm thuộc tính readOnly nếu có quản trị viên được chọn
                    required
                  />
                </div>
                <div>
                  <label>New Password:</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={forgotPasswordData.newPassword}
                    onChange={handleForgotPasswordChange}
                    required
                  />
                </div>
                <button type="submit" className="submit-button">Cập Nhật Mật Khẩu</button>
                <button type="button" className="close-buttons" onClick={handleCloseForgotPasswordForm}>Đóng</button>
              </form>
            </div>
          </div>
        </>
      )}

      {showDeleteConfirm && (
        <>
          <div className="overlay"></div>
          <div className="delete-confirmation-modal">
            <div className="delete-confirmation-content">
              <p>Bạn có chắc chắn muốn xóa không?</p>
              <div className="delete-confirmation-actions">
                <button onClick={confirmDelete}>Xóa ngay</button>
                <button onClick={cancelDeleteAdmin} className="close">Hủy</button>
              </div>
            </div>
          </div>
        </>
      )}
      
      <Notification 
        message={notification.message} 
        type={notification.type} 
        onClose={() => setNotification({ message: '', type: '' })} 
      />
    </div>
  );
};

export default AdminManagementContent;
