import React, { useState, useEffect } from 'react'
import MemberService from '../../../services/MemberService'

const Members = () => {
  const [members, setMembers] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchMembers()
  }, [])

  const fetchMembers = async () => {
    try {
      const response = await MemberService.getMembers()
      setMembers(response.data)
    } catch (error) {
      console.error('Error fetching members:', error.response?.data || error.message)
    }
  }

  const handleSearch = async () => {
    if (searchQuery.trim() === '') {
      fetchMembers()
      return
    }

    try {
      const searchParams = {
        page: 1,
        size: 10,
        search: searchQuery
      }
      const response = await MemberService.searchMembers(searchParams)
      setMembers(response.data)
    } catch (error) {
      console.error('Error searching members:', error.message)
    }
  }

  const clearSearch = () => {
    setSearchQuery('')
    fetchMembers()
  }

  return (
    <div>
      <h1>Danh sách thành viên</h1>
      <div>
        <input
          type="text"
          placeholder="Tìm kiếm theo tên hoặc lớp"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Tìm kiếm</button>
        <button onClick={clearSearch}>X</button>
      </div>
      <ul>
        {members.map((member) => (
          <li key={member._id}>
            <p>Họ tên: {member.fullName}</p>
            <p>Khóa: {member.class}</p>
            <p>Số điện thoại: {member.phone}</p>
            <p>Email: {member.email}</p>
            <p>Giới tính: {member.sex}</p>
            <p>Ngày sinh: {new Date(member.dateOfBirth).toLocaleDateString()}</p>
            <p>Ngày gia nhập: {new Date(member.joinedDate).toLocaleDateString()}</p>
            <p>Ban: {member.committee}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Members