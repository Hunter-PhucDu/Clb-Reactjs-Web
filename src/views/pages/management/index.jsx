import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.scss';
import AdminManagement from '../../components/AdminManagement';
import MemberManagement from '../../components/MemberManagement/MemberManagement';
import UserManagement from '../../components/UserManagement';
import RegistrationManagement from '../../components/RegistrationManagement';
import PostManagement from '../../components/PostManagement';

const HomeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    className="home-icon"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 12l9-9 9 9M4 12v8a1 1 0 001 1h5v-5h4v5h5a1 1 0 001-1v-8"
    />
  </svg>
);

const Management = ({ notify }) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [activeContent, setActiveContent] = useState('Quản lý quản trị viên');
  const sidebarRef = useRef(null);
  const navigate = useNavigate();

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
  };

  const handleHomeClick = () => {
    navigate('/');
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
            <li>
              <button onClick={handleHomeClick} className="home-button">
                <HomeIcon /> Trang Chủ
              </button>
            </li>
            <li><button onClick={() => handleButtonClick('Quản lý quản trị viên')}>Quản lý quản trị viên</button></li>
            <li><button onClick={() => handleButtonClick('Quản lý người dùng')}>Quản lý người dùng</button></li>
            <li><button onClick={() => handleButtonClick('Quản lý thành viên')}>Quản lý thành viên</button></li>
            <li><button onClick={() => handleButtonClick('Quản lý bài viết')}>Quản lý bài viết</button></li>
            <li><button onClick={() => handleButtonClick('Quản lý đơn đăng ký')}>Quản lý đơn đăng ký</button></li>
          </ul>
        </div>
      </aside>
      <main className="main-content">
        {activeContent === 'Quản lý quản trị viên' && <AdminManagement />}
        {activeContent === 'Quản lý thành viên' && <MemberManagement />} 
        {activeContent === 'Quản lý người dùng' && <UserManagement />} 
        {activeContent === 'Quản lý đơn đăng ký' && <RegistrationManagement />}
        {activeContent === 'Quản lý bài viết' && <PostManagement/>}  
        {!activeContent && <h1>Xin chào đây là trang quản lý của admin</h1>} 
      </main>
    </div>
  );
};

export default Management;