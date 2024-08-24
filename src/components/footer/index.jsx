import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import './index.scss'


const Footer = () => {

  return (
    <div className="footer-container">
      <div className="about-us">
        <span>&copy; 2024 <strong>Câu lạc bộ Lập trình</strong><br /></span>
        <span><strong>Học tập - Thực hành - Tư duy - Sáng tạo</strong><br /></span>
        <span>Địa chỉ: Khoa Khoa học Tự nhiên - Công nghệ, Trường Đại học Tây Bắc<br /></span>
        <span>ĐT: 0378.627.156<br /></span>
        <span>Email: clblaptrinh@utb.edu.vn</span>
      </div>

      <div className="cr-us">
        <span><strong>VỀ CÂU LẠC BỘ</strong></span>
        <li>Mục tiêu, phương hướng</li>
        <li>Quy tắc hoạt động</li>
        <li>Cơ cấu thành viên</li>
        <li>Thông tin liên lạc</li>
        <li>Câu hỏi thường gặp</li>
      </div>
      <div className="contact-us">
        <span><strong>KẾT NỐI VỚI CHÚNG TỚ</strong> <br /></span>
        <div className="social-icons">
          <a href="https://www.facebook.com/clblaptrinhutb" target="_blank" rel="noopener noreferrer" style={{ color: 'blue' }}>
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: 'rgb(255, 149, 0)' }}>
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" style={{ color: 'red' }}>
            <FontAwesomeIcon icon={faYoutube} />
          </a>
          <a href="clblaptrinh@utb.edu.vn" style={{ color: 'rgb(60, 110, 225)' }}>
            <FontAwesomeIcon icon={faEnvelope} />
          </a>
        </div>
      </div>
    </div>
  )
}

export default Footer;
