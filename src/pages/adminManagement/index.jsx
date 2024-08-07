// AdminManagement.js

import React, { useState, useEffect, useRef } from 'react';
import './index.scss';
import adminServiceAPI from '../../api/admin.api';
import memberServiceAPI from '../../api/member.api';

const AdminManagement = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [activeContent, setActiveContent] = useState('');
  const [admins, setAdmins] = useState([]);
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState(null);
  const [memberToDelete, setMemberToDelete] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState(''); // 'add' or 'edit'
  const [currentMemberId, setCurrentMemberId] = useState(null);
  const [formData, setFormData] = useState({
    avatar:null,
    fullName: '',
    class: '',
    phone: '',
    email: '',
    sex: '',
    dateOfBirth: '',
    joinedDate: '',
    committee: ''
  });

  const sidebarRef = useRef(null); // Khai báo ref cho sidebar

  const handleMouseMove = (e) => {
    if (sidebarRef.current) {
      const sidebarRect = sidebarRef.current.getBoundingClientRect();
      const isNearSidebar = e.clientX < sidebarRect.left + 300;
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
    if (content === 'Quản lý thành viên') {
      fetchMembers(); // Fetch all members when switching to this tab
    }
  };

  const fetchAdmins = async () => {
    try {
      const response = await adminServiceAPI.getAdmins();
      setAdmins(response.data);
    } catch (error) {
      console.error('Error fetching admins:', error);
    }
  };

  const fetchMembers = async () => {
    try {
      const response = await memberServiceAPI.getMembers();
      setMembers(response.data);
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };

  const searchMembers = async () => {
    try {
      const response = await memberServiceAPI.searchMembers({ search: searchTerm });
      if (response.data.length > 0) {
        setMembers(response.data);
      } else {
        setMembers(members); // If no matches, show all members
      }
    } catch (error) {
      console.error('Error searching members:', error);
    }
  };

  const handleDeleteAdmin = async (adminId) => {
    try {
      await adminServiceAPI.deleteAdmin(adminId);
      fetchAdmins();
    } catch (error) {
      console.error('Error deleting admin:', error);
    }
  };

  const handleDeleteMember = async (memberId) => {
    try {
      await memberServiceAPI.deleteMember(memberId);
      fetchMembers();
    } catch (error) {
      console.error('Error deleting member:', error);
    }
  };

  useEffect(() => {
    fetchAdmins();
    fetchMembers();
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (searchTerm) {
      searchMembers(); // Search members based on searchTerm
    } else {
      fetchMembers(); // Fetch all members when searchTerm is cleared
    }
  }, [searchTerm]);

  const handleOpenForm = (memberId = '') => {
    setCurrentMemberId(memberId);
    setFormMode(memberId ? 'edit' : 'add');
    setShowForm(true);
    if (memberId) {
      const fetchMemberData = async () => {
        try {
          const response = await memberServiceAPI.getMemberById(memberId);
          setFormData(response.data);
        } catch (error) {
          console.error('Error fetching member data:', error);
        }
      };
      fetchMemberData();
    } else {
      setFormData({
        avatar: null,
        fullName: '',
        class: '',
        phone: '',
        email: '',
        sex: '',
        dateOfBirth: '',
        joinedDate: '',
        committee: ''
      });
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setCurrentMemberId(null);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formMode === 'edit') {
        await memberServiceAPI.updateMember(currentMemberId, formData);
      } else {
        await memberServiceAPI.addMember(formData);
      }
      fetchMembers();
      handleCloseForm();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const confirmDeleteAdmin = (adminId) => {
    setAdminToDelete(adminId);
    setShowDeleteConfirm(true);
  };

  const confirmDeleteMember = (memberId) => {
    setMemberToDelete(memberId);
    setShowDeleteConfirm(true);
  };

  const cancelDeleteAdmin = () => {
    setAdminToDelete(null);
    setShowDeleteConfirm(false);
  };

  const cancelDeleteMember = () => {
    setMemberToDelete(null);
    setShowDeleteConfirm(false);
  };

  const confirmDelete = () => {
    if (adminToDelete) {
      handleDeleteAdmin(adminToDelete);
      cancelDeleteAdmin();
    }
    if (memberToDelete) {
      handleDeleteMember(memberToDelete);
      cancelDeleteMember();
    }
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      avatar: e.target.files[0],
    });
  };

  return (
    <div className="admin-management">
      <aside
        className={`sidebar ${isSidebarVisible ? 'visible' : ''}`}
        ref={sidebarRef} // Sử dụng ref
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="sidebar-content">
          <h2>Menu</h2>
          <ul>
            <li><button onClick={() => handleButtonClick('Quản lý quản trị viên')}>Quản lý quản trị viên</button></li>
            <li><button onClick={() => handleButtonClick('Quản lý thành viên')}>Quản lý thành viên</button></li>
            {/* Các mục khác */}
          </ul>
        </div>
      </aside>
      <main className="main-content">
        {activeContent === 'Quản lý quản trị viên' && (
          <div>
            <h1>Quản lý quản trị viên</h1>
            <ul className="admin-list-container">
              {admins.map((admin, index) => (
                <li className="admin-list-item" key={admin._id}>
                  <div className="admin-info">
                    <span className="admin-stt">{index + 1}</span>
                    {admin.userName}
                  </div>
                  <div className="actions">
                    <button className="change-password-button">Đổi Mật Khẩu</button>
                    <button className="delete-button" onClick={() => confirmDeleteAdmin(admin._id)}>Xóa</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeContent === 'Quản lý thành viên' && (
          <div>
            <h1>Quản lý thành viên</h1>
            <button onClick={() => handleOpenForm()}>Thêm Thành Viên</button>
            <input
              type="text"
              placeholder="Tìm kiếm theo tên hoặc lớp học"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <ul className="member-list-container">
              {members.map((member, index) => (
                <li className="member-list-item" key={member._id}>
                  <div className="member-info">
                    <span className="member-stt">{index + 1}</span>
                    {member.fullName} - {member.email}
                  </div>
                  <div className="actions">
                    <button className="update-button" onClick={() => handleOpenForm(member._id)}>Sửa</button>
                    <button className="delete-button" onClick={() => confirmDeleteMember(member._id)}>Xóa</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>

      {showDeleteConfirm && (
        <div className="delete-confirmation-modal">
          <div className="delete-confirmation-content">
            <p>Bạn có chắc chắn muốn xóa không?</p>
            <button onClick={confirmDelete}>Xóa ngay</button>
            <button onClick={cancelDeleteAdmin}>Hủy</button>
          </div>
        </div>
      )}

      {showForm && (
        <div className="form-modal">
          <div className="form-modal-content">
            <h2>{formMode === 'add' ? 'Thêm Thành Viên' : 'Sửa Thành Viên'}</h2>
            <form onSubmit={handleFormSubmit}>
            <div className="form-outline mb-3">
                      <label>Avatar</label>
                      <input
                        type="file"
                        className="form-control form-control-lg"
                        onChange={handleFileChange}
                      />
                    </div>
              <label>
                Họ và tên:
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleFormChange}
                />
              </label>
              <label>
                Lớp:
                <input
                  type="text"
                  name="class"
                  required
                  value={formData.class}
                  onChange={handleFormChange}
                />
              </label>
              <label>
                Số điện thoại:
                <input
                  type="text"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleFormChange}
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleFormChange}
                />
              </label>
              <label>
                Giới tính:
                <select
                  name="sex"
                  required
                  value={formData.sex}
                  onChange={handleFormChange}
                >
                  <option value="male">Nam</option>
                  <option value="female">Nữ</option>
                </select>
              </label>
              <label>
                Ngày sinh:
                <input
                  type="date"
                  name="dateOfBirth"
                  required
                  value={formData.dateOfBirth}
                  onChange={handleFormChange}
                />
              </label>
              <label>
                Ngày vào hội:
                <input
                  type="date"
                  name="joinedDate"
                  required
                  value={formData.joinedDate}
                  onChange={handleFormChange}
                />
              </label>
              <label>
                Hội:
                <input
                  type="text"
                  name="committee"
                  required
                  value={formData.committee}
                  onChange={handleFormChange}
                />
              </label>
              <button type="submit">Lưu</button>
              <button type="button" onClick={handleCloseForm}>Đóng</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminManagement;
