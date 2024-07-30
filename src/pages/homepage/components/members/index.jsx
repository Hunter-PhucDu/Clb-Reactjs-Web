import React, { useState, useEffect } from 'react';
import memberServiceAPI from '../../../../api/member.api';

const Members = () => {
    const [members, setMembers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
  
    useEffect(() => {
      const fetchMembers = async () => {
        try {
          const response = await memberServiceAPI.getMembers();
          setMembers(response.data); // Đặt response.data vào state
        } catch (error) {
          console.error('Error fetching members:', error.response?.data || error.message);
        }
      };
  
      fetchMembers();
    }, []);
  
    const handleSearch = async () => {
      try {
        const searchParams = {
          page: 1,
          size: 10,
          search: searchQuery
        };
        await memberServiceAPI.searchMembers(searchParams);
        //setMembers(data);
      } catch (error) {
        console.error('Error searching members:', error.message);
      }
    };
  
    return (
      <div>
        <h1>Danh sách thành viên</h1>
        <input
        type="text"
        placeholder="Tìm kiếm theo tên hoặc lớp"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Tìm kiếm</button>
        <ul>
          {members.map((member) => (
            <li key={member._id}>
              <p>Họ tên: {member.fullName}</p>
              <p>Lớp: {member.class}</p>
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
    );
  };
  
  export default Members;