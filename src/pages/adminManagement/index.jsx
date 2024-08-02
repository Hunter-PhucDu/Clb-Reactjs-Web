import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './index.scss';
import adminServiceAPI from '../../api/admin.api';

const AdminManagement = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [activeContent, setActiveContent] = useState('');
  const [admins, setAdmins] = useState([]);
  const [adminData, setAdminData] = useState({
    userName: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const sidebarRef = useRef(null);

  const handleMouseMove = (e) => {
    if (sidebarRef.current) {
      const sidebarRect = sidebarRef.current.getBoundingClientRect();
      const isNearSidebar = e.clientX < sidebarRect.left +300;
      setIsSidebarVisible(isNearSidebar);
    }
  };

  const handleMouseEnter = () => {
    setIsSidebarVisible(true);
  };

  const handleMouseLeave = () => {
    setIsSidebarVisible(false);
  };

  const handleButtonClick = (content) => {
    setActiveContent(content);
  };

  const fetchAdmins = async () => {
    try {
      const response = await adminServiceAPI.getAdmins();
      setAdmins(response.data); // set response.data to state
    } catch (error) {
      console.error('Error fetching admins:', error);
    }
  };

  const handleDeleteAdmin = async (adminId) => {
    try {
      await adminServiceAPI.deleteAdmin(adminId); // Gọi hàm deleteAdmin với adminId
      fetchAdmins(); // Tải lại danh sách admin sau khi xóa
    } catch (error) {
      console.error('Error deleting admin:', error);
    }
  };

  useEffect(() => {
    fetchAdmins();
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminData({
      ...adminData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await adminServiceAPI.addAdmin(adminData);
      setSuccess("Admin added successfully!");
      setError(null);
      console.log(response);
      fetchAdmins();
    } catch (error) {
      setError(error.message);
      setSuccess(null);
    }
  };

  return (
    <div className="admin-management">
      <aside
        className={`sidebar ${isSidebarVisible ? 'visible' : ''}`}
        ref={sidebarRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="sidebar-content">
          <h2>Menu</h2>
          <ul>
            <li><button onClick={() => handleButtonClick('Quản lý quản trị viên')}>Quản lý quản trị viên</button></li>
            <li><button onClick={() => handleButtonClick('Quản lý người dùng')}>Quản lý người dùng</button></li>
            <li><button onClick={() => handleButtonClick('Quản lý thành viên')}>Quản lý thành viên</button></li>
            <li><button onClick={() => handleButtonClick('Quản lý bài viết')}>Quản lý bài viết</button></li>
            <li><button onClick={() => handleButtonClick('Quản lý đơn đăng ký')}>Quản lý đơn đăng ký</button></li>
          </ul>
        </div>
      </aside>
      <main className="main-content">
        {activeContent === 'Quản lý quản trị viên' && (
          <div>
            <h1>Quản lý quản trị viên</h1>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Username:</label>
                <input type="text" name="userName" value={adminData.userName} onChange={handleChange} required />
              </div>
              <div>
                <label>Password:</label>
                <input type="password" name="password" value={adminData.password} onChange={handleChange} required />
              </div>
              <button type="submit">Add Admin</button>
            </form>
            <ul className="admin-list-container">
              {admins.map((admin, index) => (
                <li className="admin-list-item" key={admin._id}>
                  <div className="admin-info">
                    <span className="admin-stt">{index + 1}</span>
                    {admin.userName}
                  </div>
                  <div className="actions">
                    <button className="change-password-button">Đổi Mật Khẩu</button>
                    <button className="delete-button" onClick={() => handleDeleteAdmin(admin._id)}>Xóa</button>
                    
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminManagement;
