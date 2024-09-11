import React, { useState, useEffect } from 'react'
import MemberService from '../../../services/MemberService'
import Notification from '../Notification'
import './index.scss'

const MemberManagement = () => {
  const [members, setMembers] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [showAddMemberForm, setShowAddMemberForm] = useState(false)
  const [selectedMember, setSelectedMember] = useState(null)
  const [formData, setFormData] = useState({
    avatar: null,
    fullName: '',
    class: '',
    phone: '',
    email: '',
    sex: '',
    dateOfBirth: '',
    joinedDate: '',
    committee: ''
  })
  const [activeTab, setActiveTab] = useState('All') // Tab mặc định
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [memberToDelete, setMemberToDelete] = useState(null)
  const [notification, setNotification] = useState({ message: '', type: '' })

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await MemberService.getMembers()
        const data = response.data // Giả sử rằng `response.data` chứa dữ liệu trả về từ server
        setMembers(Array.isArray(data) ? data : []) // Đảm bảo `members` là một mảng
      } catch (error) {
        console.error('Error fetching members:', error)
      }
    }

    fetchMembers()
  }, [])

  useEffect(() => {
    // Cập nhật kết quả tìm kiếm mỗi khi thay đổi activeTab hoặc searchQuery
    const filterMembers = () => {
      if (searchQuery.trim() === '') {
        setSearchResults(membersByCommittee[activeTab])
      } else {
        const results = membersByCommittee[activeTab].filter(member =>
          member.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          member.class.toLowerCase().includes(searchQuery.toLowerCase())
        )
        setSearchResults(results)
      }
    }

    filterMembers()
  }, [searchQuery, activeTab, members])

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleOpenAddMemberForm = () => {
    setSelectedMember(null)
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
    })
    setShowAddMemberForm(true)
  }

  

  const handleCloseAddMemberForm = () => {
    setShowAddMemberForm(false)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      avatar: e.target.files[0]
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formDataToSend = new FormData()
    if (formData.avatar) formDataToSend.append('avatar', formData.avatar)
    formDataToSend.append('fullName', formData.fullName)
    formDataToSend.append('class', formData.class)
    if (formData.phone) formDataToSend.append('phone', formData.phone)
    formDataToSend.append('email', formData.email)
    if (formData.sex) formDataToSend.append('sex', formData.sex)
    if (formData.dateOfBirth) formDataToSend.append('dateOfBirth', formatDateForDateOfBirth(formData.dateOfBirth))
    if (formData.joinedDate) formDataToSend.append('joinedDate', formatDateForJoinedDate(formData.joinedDate))
    if (formData.committee) formDataToSend.append('committee', formData.committee)

    try {
        if (selectedMember) {
            // Cập nhật thông tin thành viên
            await MemberService.updateMember(selectedMember._id, formDataToSend)
            setNotification({ message: 'Cập nhật thành công!', type: 'success' })
        } else {
            // Thêm thành viên mới
            await MemberService.addMember(formDataToSend)
            setNotification({ message: 'Thêm thành viên thành công!', type: 'success' })
        }
        handleCloseAddMemberForm()
        // Cập nhật danh sách thành viên
        const response = await MemberService.getMembers()
        const updatedMembers = response.data 
        setMembers(Array.isArray(updatedMembers) ? updatedMembers : [])
    } catch (error) {
        if (error.response) {
            console.error('Error saving member:', error.response.data)
            setNotification({ message: `Đã xảy ra lỗi: ${error.response.data.message || 'Không rõ'}`, type: 'error' })
        } else {
            console.error('Error saving member:', error.message)
            setNotification({ message: `Đã xảy ra lỗi: ${error.message}`, type: 'error' })
        }
    }
}


  
  const handleEditMember = (member) => {
    setSelectedMember(member)
    setFormData({
      avatar: member.avatar || '',
      fullName: member.fullName || '',
      class: member.class || '',
      phone: member.phone || '',
      email: member.email || '',
      sex: member.sex || '',
      dateOfBirth: member.dateOfBirth || '',
      joinedDate: member.joinedDate || '',
      committee: member.committee || ''
    })
    setShowAddMemberForm(true)
  }

  const handleDeleteMember = (memberId) => {
    setMemberToDelete(memberId)
    setShowDeleteConfirm(true)
  }

  const confirmDelete = async () => {
    try {
      await MemberService.deleteMember(memberToDelete)
      setMembers(members.filter(member => member._id !== memberToDelete))
      setSearchResults(searchResults.filter(member => member._id !== memberToDelete))
      setNotification({ message: 'Xóa thành công!', type: 'success' })
    } catch (error) {
      console.error('Error deleting member:', error)
      setNotification({ message: 'Xóa thất bại!', type: 'error' })
    }
    setShowDeleteConfirm(false)
  }

  const cancelDeleteAdmin = () => {
    setShowDeleteConfirm(false)
    setMemberToDelete(null)
  }


  const formatDateForDateOfBirth = (dateString) => {
    const date = new Date(dateString)
    const day = date.getDate().toString().padStart(2, '0') // Ngày (01-31)
    const month = (date.getMonth() + 1).toString().padStart(2, '0') // Tháng (01-12)
    const year = date.getFullYear() // Năm (yyyy)

    return `${day}/${month}/${year}`
}

const formatDateForJoinedDate = (dateString) => {
    const date = new Date(dateString)
    const month = (date.getMonth() + 1).toString().padStart(2, '0') // Tháng (01-12)
    const day = date.getDate().toString().padStart(2, '0') // Ngày (01-31)
    const year = date.getFullYear() // Năm (yyyy)

    return `${month}/${day}/${year}`
}

  
  const formatDateForInput = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = (`0${date.getMonth() + 1}`).slice(-2)
    const day = (`0${date.getDate()}`).slice(-2)
    return `${year}-${month}-${day}`
  }

  const formatDate = (isoDateString) => {
    if (!isoDateString) return ''
    const date = new Date(isoDateString)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${day}/${month}/${year}`
  }
  

  const committees = [
    'All',
    'Executive Board',
    'Content Committee',
    'Communication Committee',
    'External Relations Committee',
    'Logistics Committee',
    'Member'
  ]
  

  const membersByCommittee = committees.reduce((acc, committee) => {
    acc[committee] = committee === 'All' ? members : members.filter(member => member.committee === committee)
    return acc
  }, {})

  const handleExport = () => {
    const headers = ['ID', 'Họ và tên', 'Lớp', 'Điện thoại', 'Email', 'Giới tính', 'Ngày sinh', 'Ngày gia nhập', 'Ban']
    const rows = [
      headers,
      ...searchResults.map(member => [
        member._id,
        member.fullName,
        member.class,
        member.phone,
        member.email,
        member.sex,
        formatDate(member.dateOfBirth), // Định dạng ngày sinh
        formatDate(member.joinedDate),  // Định dạng ngày gia nhập
        member.committee
      ])
    ]
    const filename = `${activeTab.replace(/\s+/g, '_')}_members.csv`
    exportToCSV(filename, rows)
  }
  const exportToCSV = (filename, rows) => {
    const csvContent = rows.map(row => row.join(',')).join('\n')
    const blob = new Blob([csvContent], { type: 'text/csvcharset=utf-8' })
  
    const link = document.createElement('a')
    if (link.download !== undefined) { // feature detection
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', filename)
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }
  
  


  return (
    <div className="member-management-content">
      <h1>Quản lý thành viên</h1>
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
          placeholder="Tìm kiếm thành viên..."
          className="search-input"
        />
        <div className="tabs">
          {committees.map(committee => (
            <button
              key={committee}
              className={`tab-button ${activeTab === committee ? 'active' : ''}`}
              onClick={() => setActiveTab(committee)}
            >
              {committee}
            </button>
          ))}
        </div>
      </div>
      <div className="member-count">
        Tổng: {searchResults.length}
      </div>
      
      <div className="tab-content">
        <ul className="member-list">
          {searchResults.map((member, index) => (
            <li className="member-list-item" key={member._id}>
              <div className="member-info">
                <img className="member-avatar" src={'http://'+member.avatar} alt="Avatar" />
                <div className="member-details">
                  <span className="member-stt">{index + 1}</span>
                  <span className="member-name">{member.fullName}</span>
                  <span className="member-class">({member.class})</span>
                  <span className="member-dob">Ngày sinh: {formatDate(member.dateOfBirth)}</span>
                  <span className="member-joinedDate">Ngày gia nhập: {formatDate(member.joinedDate)}</span>
                  <span className="member-committee">Ban: {member.committee}</span>
                  
                  
                </div>
              </div>
              <div className="actions">
                <button className="edit-button" onClick={() => handleEditMember(member)}>Sửa</button>
                <button className="delete-button" onClick={() => handleDeleteMember(member._id)}>Xóa</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="add-member-button-container">
        <button className="add-member-button" onClick={handleOpenAddMemberForm}>Thêm Thành Viên</button>
        <button className="export-button" onClick={handleExport}>Xuất ra CSV</button>
      </div>



      {showAddMemberForm && (
        <>
          <div className="overlay" onClick={handleCloseAddMemberForm}></div>
          <div className="popup-form">
            <form onSubmit={handleSubmit}>
              <div>
                <label>Avatar:</label>
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
              <div>
                <label>Họ và tên:</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Lớp:</label>
                <input
                  type="text"
                  name="class"
                  value={formData.class}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Điện thoại:</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Giới tính:</label>
                <select name="sex" value={formData.sex} onChange={handleChange}>
                  <option value="">Chọn giới tính</option>
                  <option value="male">Nam</option>
                  <option value="female">Nữ</option>
                  <option value="other">Khác</option>
                </select>
              </div>
              <div>
                <label>Ngày sinh:</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formatDateForInput(formData.dateOfBirth)}
                  onChange={handleChange}
                  
                />
              </div>
              <div>
                <label>Ngày gia nhập:</label>
                <input
                  type="date"
                  name="joinedDate"
                  value={formatDateForInput(formData.joinedDate)}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Ban:</label>
                <select
                  name="committee"
                  value={formData.committee}
                  onChange={handleChange}
                  required
                >
                  {committees.map((committee) => (
                    <option key={committee} value={committee}>
                      {committee}
                    </option>
                  ))}
                </select>
              </div>
              <button className="deletes-button" type="submit">
                {selectedMember ? 'Lưu' : 'Thêm'}
              </button>
              <button className="cancel-button" type="button" onClick={handleCloseAddMemberForm}>
                Hủy
              </button>
            </form>
          </div>
        </>
      )}

      {showDeleteConfirm && (
        <>
          <div className="overlay"></div>
          <div className="delete-confirmation-modal">
            <div className="delete-confirmation-content">
              <p>Bạn có chắc chắn muốn xóa thành viên này?</p>
              <div className="delete-confirmation-actions">
                <button onClick={confirmDelete}>Xóa ngay</button>
                <button onClick={cancelDeleteAdmin} className="close">Hủy</button>
              </div>
            </div>
          </div>
        </>
      )}

    </div>
  )
}

export default MemberManagement