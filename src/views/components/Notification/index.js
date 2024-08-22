// thông báo 
import React, { useEffect, useState } from 'react';
import './index.scss';

const Notification = ({ message, type, onClose, autoCloseTime = 3000 }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        const fadeOutTimer = setTimeout(() => {
          onClose();
        }, 500); // Thời gian fade-out (phải trùng với thời gian trong CSS)
        return () => clearTimeout(fadeOutTimer);
      }, autoCloseTime);

      return () => clearTimeout(timer);
    }
  }, [message, autoCloseTime, onClose]);

  if (!message || !isVisible) return null;

  return (
    <div className={`notification ${type} ${!isVisible ? 'fade-out' : ''}`}>
      <span>{message}</span>
      <button className="close-button" onClick={() => {
        setIsVisible(false);
        setTimeout(onClose, 500); // Đảm bảo onClose được gọi sau khi fade-out
      }}>X</button>
    </div>
  );
};

export default Notification;