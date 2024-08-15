import React, { useState, useRef, useEffect } from 'react';
import './index.scss'; // Đảm bảo rằng đường dẫn tới SCSS là chính xác
import AdminManagementContent from '../../components/Admin/AdminManagementContent';
import MemberManagementContent from '../../components/Member/MemberManagementContent';
import UserManagementContent from '../../components/User/UserManagementContent';

const AdminManagement = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [activeContent, setActiveContent] = useState('');
  const sidebarRef = useRef(null);

  const handleMouseMove = (e) => {
    if (sidebarRef.current) {
      const sidebarRect = sidebarRef.current.getBoundingClientRect();
      const isNearSidebar = e.clientX < sidebarRect.left + 260;
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

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

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
        {activeContent === 'Quản lý quản trị viên' && <AdminManagementContent />}
        {activeContent === 'Quản lý thành viên' && <MemberManagementContent />} 
        {activeContent === 'Quản lý người dùng' && <UserManagementContent />} 
        
      </main>
    </div>
  );
};

export default AdminManagement;
