import React, { useEffect, useState } from 'react'
import RegistrationService from '../../../services/RegistrationService'
import Notification from '../Notification'
import './index.scss'

const RegistrationManagement = () => {
  const [registrations, setRegistrations] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedRegistration, setSelectedRegistration] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [formData, setFormData] = useState({ dateTime: '', address: '' })
  const [notification, setNotification] = useState({ message: '', type: '' })
  const [activeTab, setActiveTab] = useState('all')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [registrationToDelete, setRegistrationToDelete] = useState(null)

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const data = await RegistrationService.getRegistrations()
        console.log("registrations: ", data.data)
        setRegistrations(data.data || [])
        setLoading(false)
      } catch (error) {
        console.error('Error fetching registrations:', error.message)
        setLoading(false)
      }
    }

    fetchRegistrations()
  }, [])

  const handleFirstRoundApproval = async () => {
    if (selectedRegistration) {
      const formDataToSend = {
        dateTime: formData.dateTime,
        address: formData.address,
      }

      try {
        await RegistrationService.updatePassedFirstRound(selectedRegistration._id, formDataToSend)
        setRegistrations(prevRegistrations =>
          prevRegistrations.map(registration =>
            registration._id === selectedRegistration._id
              ? { ...registration, passedFirstRound: true }
              : registration
          )
        )
        setNotification({ message: 'Duyệt vòng 1 thành công!', type: 'success' })
        setSelectedRegistration(null)
        setFormData({ dateTime: '', address: '' })
      } catch (error) {
        console.error('Error updating first round approval:', error)
        setNotification({ message: `Nhập thời gian và địa điểm cho ứng viên`, type: 'error' })
      }
    }
  }

  const handleSecondRoundApproval = async (registrationId) => {
    try {
      await RegistrationService.updatePassedSecondRound(registrationId)
      setRegistrations(prevRegistrations =>
        prevRegistrations.map(registration =>
          registration._id === registrationId
            ? { ...registration, passedSecondRound: true }
            : registration
        )
      )
      setNotification({ message: 'Duyệt vòng 2 thành công!', type: 'success' })
    } catch (error) {
      console.error('Error updating second round approval:', error.response?.data || error.message)
      setNotification({ message: 'Đã xảy ra lỗi khi duyệt vòng 2!', type: 'error' })
    }
  }

  const handleDeleteRegistration = (registrationId) => {
    setShowDeleteConfirm(true)
    setRegistrationToDelete(registrationId)
  }

  const cancelDeleteAdmin = () => {
    setShowDeleteConfirm(false)
  }

  const confirmDelete = async () => {
    try {
      await RegistrationService.deleteRegistration(registrationToDelete)
      setRegistrations(prevRegistrations =>
        prevRegistrations.filter(registration => registration._id !== registrationToDelete)
      )
      setNotification({ message: 'Đã xóa đơn đăng ký!', type: 'success' })
    } catch (error) {
      console.error('Error deleting registration:', error.message)
      setNotification({ message: `Error deleting registration: ${error.message}`, type: 'error' })
    } finally {
      setShowDeleteConfirm(false)
    }
  }

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const openDetailForm = (registration) => {
    setSelectedRegistration(registration)
    setFormData({ dateTime: '', address: '' })
  }

  const filteredRegistrations = () => {
    
    const filteredByTab = registrations.filter(r => {
      switch (activeTab) {
        case 'approved-all':
          return r.passedFirstRound && r.passedSecondRound
        case 'approved-first':
          return r.passedFirstRound && !r.passedSecondRound
        case 'pending':
          return !r.passedFirstRound
        case 'approved-second':
          return r.passedFirstRound && !r.passedSecondRound
        default:
          return true
      }
    })
    

    return filteredByTab.filter(r =>
      r.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.phone.includes(searchQuery)
    )
  }

  const handleSearchChange = (e) => {
    const { value } = e.target
    setSearchQuery(value)
  }

  const genderMap = {
    male: 'Nam',
    female: 'Nữ',
    other: 'Khác',
  }
  

  if (loading) {
    return <p>Loading...</p>
  }

  console.log("registrations filter: ", filteredRegistrations())

  return (
<div className="registration-management">
      <h1>Quản lý Đăng ký</h1>
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
          placeholder="Tìm kiếm Đơn đăng ký..."
          className="search-input"
        />

      </div>

      <div className="tabs">
        <button className={`tab ${activeTab === 'all' ? 'active' : ''}`} onClick={() => setActiveTab('all')}>
          Tất cả
        </button>
        <button className={`tab ${activeTab === 'pending' ? 'active' : ''}`} onClick={() => setActiveTab('pending')}>
          Chưa duyệt
        </button>
        <button className={`tab ${activeTab === 'approved-first' ? 'active' : ''}`} onClick={() => setActiveTab('approved-first')}>
          Đã duyệt vòng 1
        </button>
        <button className={`tab ${activeTab === 'approved-all' ? 'active' : ''}`} onClick={() => setActiveTab('approved-all')}>
          Đã duyệt hết
        </button>
      </div>
      <div className="member-count">
          Tổng: {filteredRegistrations().length}
      </div>

      <div className="tab-content">
        <ul className="registration-list">
          {filteredRegistrations().map((registration, index) => ( 
            <li className="registration-list-item" key={registration._id}>
              <div className="registration-info">
                <div className="registration-details">
                  <span className="registration-stt">{index + 1}. </span>
                  <span className="">Họ và tên: <b> {registration.fullName}</b></span>
                  <p className="registration-class">Lớp:  <b>{registration.class}</b></p>
                  <p className="registration-phone">SĐT: <b>{registration.phone}</b></p>
                  <p className="registration-email">Email: <b>{registration.email}</b></p>
                  <p className="registration-dob">Ngày sinh: <b>{new Date(registration.dateOfBirth).toLocaleDateString()}</b></p>
                  <p className="registration-sex">Giới tính: <b>{genderMap[registration.sex]}</b></p>
                  <p style={{textAlign: 'center'}}> <b>Câu hỏi:</b></p>
                  <div className="registration-questions">
                    {registration.answers.map((q, index) => (
                      <div key={index}>
                        <span> <b>{index + 1}. {q.question}</b></span>
                        <p> {q.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="actions">
                {!registration.passedFirstRound && (
                  <button className="edit-button" onClick={() => openDetailForm(registration)}>
                    Duyệt vòng 1
                  </button>
                )}
                {registration.passedFirstRound && registration.passedSecondRound && (
                  <span>Đã qua cả hai vòng</span>
                )}
                <button className="detail-button" onClick={() => openDetailForm(registration)}>
                  <i className="info-icon">i</i>
                </button>

                <button className="delete-button" onClick={() => handleDeleteRegistration(registration._id)}>
                  Xóa
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {selectedRegistration && (
        <div className="popup-form">
          <h2>Chi tiết Đơn Đăng Ký</h2>
          <div className="form-content">
            <p><strong>Họ tên:</strong> {selectedRegistration.fullName}</p>
            <p><strong>Lớp:</strong> {selectedRegistration.class}</p>
            <p><strong>Ngày sinh:</strong> {new Date(selectedRegistration.dateOfBirth).toLocaleDateString()}</p>
            <p><strong>Email:</strong> {selectedRegistration.email}</p>
            <p><strong>Giới tính:</strong> {selectedRegistration.sex}</p>
            <p><strong>Điện thoại:</strong> {selectedRegistration.phone}</p>
            <div className="registration-questions">
              {selectedRegistration.answers.map((q, index) => (
                <div key={index}>
                  <strong>{q.question}</strong>: {q.answer}
                </div>
              ))}
            </div>
          </div>

          {/* Hiển thị form duyệt vòng 1 nếu đơn chưa qua vòng 1 */}
          {selectedRegistration.passedFirstRound ? null : (
            <div className="first-round-form">
              <h3>Duyệt vòng 1</h3>
              <input
                type="text"
                name="dateTime"
                placeholder="Nhập ngày và giờ"
                value={formData.dateTime}
                onChange={handleFormChange}
              />
              <input
                type="text"
                name="address"
                placeholder="Nhập địa chỉ"
                value={formData.address}
                onChange={handleFormChange}
              />
              <button className="submit-button" onClick={handleFirstRoundApproval}>Xác nhận</button>
              <button className="cancel-button" onClick={() => setSelectedRegistration(null)}>Hủy</button>
            </div>
          )}

          {/* Hiển thị form duyệt vòng 2 nếu đơn đã qua vòng 1 và chưa qua vòng 2 */}
          {selectedRegistration.passedFirstRound && !selectedRegistration.passedSecondRound && (
            <div className="second-round-form">
              <h3>Duyệt vòng 2</h3>
              <button className="submit-button" onClick={() => handleSecondRoundApproval(selectedRegistration._id)}>
                Duyệt vòng 2
              </button>
              <button className="cancel-button" onClick={() => setSelectedRegistration(null)}>Hủy</button>
            </div>
          )}

          {/* Hiển thị thông báo đã duyệt hết nếu đơn đã qua cả hai vòng */}
          {selectedRegistration.passedFirstRound && selectedRegistration.passedSecondRound && (
            <div className="approved-all">
              <h3>Đã qua cả hai vòng</h3>
              <button className="cancel-button" onClick={() => setSelectedRegistration(null)}>Đóng</button>
            </div>
          )}
        </div>
      )}


      {showDeleteConfirm && (
            <>
              <div className="overlay"></div>
              <div className="delete-confirmation-modal">
                <div className="delete-confirmation-content">
                  <p>Bạn có chắc chắn muốn xóa đơn này?</p>
                  <div className="delete-confirmation-actions">
                    <button onClick={confirmDelete}>Xóa ngay</button>
                    <button onClick={cancelDeleteAdmin} className="close">Hủy</button>
                  </div>
                </div>
              </div>
            </>
          )}
    </div>
  );
};

export default RegistrationManagement;