import { useState, useEffect } from "react";
import authAPI from "../../../../api/auth.api";
import "./index.scss";

const Profiles = ({ notify }) => {
  const [userData, setUserData] = useState({
    userName: "",
    fullName: "",
    email: "",
    phone: "",
    avatar: ""
  });
  const [avatarFile, setAvatarFile] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await authAPI.getCurrentUser();
        setUserData(response);
      } catch (err) {
        console.error(err);
        notify("Không thể lấy thông tin người dùng", "ERROR");
      }
    };

    fetchUserData();
  }, [notify]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleAvatarChange = (e) => {
    setAvatarFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("avatar", avatarFile);
    formData.append("userName", userData.userName);
    formData.append("fullName", userData.fullName);
    formData.append("email", userData.email);
    formData.append("phone", userData.phone);

    try {
      const updatedUser = await authAPI.updateUser(userData._id, formData);
      setUserData(updatedUser);
      notify("Cập nhật hồ sơ thành công", "SUCCESS");
    } catch (err) {
      console.error(err);
      notify("Cập nhật hồ sơ thất bại", "ERROR");
    }
  };

  return (
    <div className="profiles col-9">
      <div className="title">
        <h4>Hồ sơ của tôi</h4>
        <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
      </div>
      <div className="profiles__content">
        <form onSubmit={handleSubmit}>
          <div className="field-row">
            <label>Tên tài khoản</label>
            <span>{userData.userName}</span>
          </div>
          <div className="field-row">
            <label>Họ và tên</label>
            <input
              type="text"
              name="fullName"
              value={userData.fullName || ""}
              onChange={handleChange}
            />
          </div>
          <div className="field-row">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={userData.email || ""}
              onChange={handleChange}
            />
          </div>
          <div className="field-row">
            <label>Số điện thoại</label>
            <input
              type="text"
              name="phone"
              value={userData.phone || ""}
              onChange={handleChange}
            />
          </div>
          <div className="field-row">
            <label>Ảnh đại diện</label>
            <input
              type="file"
              onChange={handleAvatarChange}
            />
          </div>
          <div className="btn-submit">
            <button type="submit">Lưu thay đổi</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profiles;
