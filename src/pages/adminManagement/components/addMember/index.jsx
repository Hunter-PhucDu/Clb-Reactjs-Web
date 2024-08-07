import React, { useState } from 'react';
import memberServiceAPI from '../../../../api/member.api';

const AddMember = () => {
  const [memberData, setMemberData] = useState({
    fullName: '',
    class: '',
    phone: '',
    email: '',
    sex: '',
    dateOfBirth: '',
    joinedDate: '',
    committee: ''
  });
  const [avatar, setAvatar] = useState(null);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMemberData({
      ...memberData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(memberData).forEach(key => {
      formData.append(key, memberData[key]);
    });
    if (avatar) {
      formData.append('avatar', avatar);
    }

    try {
      const response = await memberServiceAPI.addMember(formData);
      setSuccess('Member added successfully!');
      setErrors({});
    } catch (error) {
      const errorData = JSON.parse(error.message);
      setErrors(errorData);
      setSuccess(null);
    }
  };

  return (
    <div>
      <h2>Add Member</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Ảnh đại diện:</label>
          <input type="file" name="avatar" onChange={handleFileChange} />
        </div>
        <div>
          <label>Họ và tên:</label>
          <input type="text" name="fullName" value={memberData.fullName} onChange={handleChange} required />
          {errors.fullName && <p style={{ color: 'red' }}>{errors.fullName}</p>}
        </div>
        <div>
          <label>Khoa:</label>
          <input type="text" name="class" value={memberData.class} onChange={handleChange} required />
          {errors.class && <p style={{ color: 'red' }}>{errors.class}</p>}
        </div>
        <div>
          <label>Số điện thoại:</label>
          <input type="text" name="phone" value={memberData.phone} onChange={handleChange} required />
          {errors.phone && <p style={{ color: 'red' }}>{errors.phone}</p>}
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={memberData.email} onChange={handleChange} required />
          {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
        </div>
        <div>
          <label>Giới tính: </label>
          <select name="sex" value={memberData.sex} onChange={handleChange} required>
            <option value="">Chọn giới tính</option>
            <option value="male">Nam</option>
            <option value="female">Nữ</option>
            <option value="other">Khác</option>
          </select>
          {errors.sex && <p style={{ color: 'red' }}>{errors.sex}</p>}
        </div>
        <div>
          <label>Ngày sinh:</label>
          <input type="date" name="dateOfBirth" value={memberData.dateOfBirth} onChange={handleChange} required />
        </div>
        <div>
          <label>Ngày tham gia:</label>
          <input type="date" name="joinedDate" value={memberData.joinedDate} onChange={handleChange} required />
        </div>
        <div>
          <label>Chức vụ:</label>
          <select name="committee" value={memberData.committee} onChange={handleChange}>
            <option value="">Lựa chọn Ban</option>
            <option value="Executive Board">Ban Chủ nhiệm</option>
            <option value="Content Committee">Ban nội dung</option>
            <option value="Communication Committee">Ban truyền thông</option>
            <option value="External Relations Committee">Ban đối ngoại</option>
            <option value="Logistics Committee">Ban hậu cần</option>
            <option value="Member">Thành viên</option>
          </select>
          {errors.committee && <p style={{ color: 'red' }}>{errors.committee}</p>}
        </div>
        <button type="submit">Add Member</button>
      </form>
      {success && <p style={{ color: 'green' }}>{success}</p>}

    </div>
  );
};

export default AddMember;
