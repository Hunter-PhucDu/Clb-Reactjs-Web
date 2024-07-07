import { useState } from "react";
import "./index.scss";
import accountAPI from "../../../../api/account.api";
import { updateAccount } from "../../../../redux/slice/auth.slice";
import { useDispatch, useSelector } from "react-redux";
import { HiPencil } from "react-icons/hi";

const Profile = ({ account, notify }) => {
  const [userName, setUserName] = useState(account.userName);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const onUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleUpdateAccount = async () => {
    try {
      let account = await accountAPI.updateAccount(
        { userName },
        auth.account._id
      );
      dispatch(updateAccount(account.userName));
      notify("Cập nhật thành công!");
    } catch (err) {
      console.log(err);
      notify(err.response.data, "ERROR");
    }
  };
  return (
    <>
      <div className="container profile">
        <div className="profile">
          <a href="/account/profile">
            <div class="shop-avatar_placeholder">
              <svg enable-background="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" class="shopee-svg-icon icon-headshot"><g><circle cx="7.5" cy="4.5" fill="none" r="3.8" stroke-miterlimit="10"></circle><path d="m1.5 14.2c0-3.3 2.7-6 6-6s6 2.7 6 6" fill="none" stroke-linecap="round" stroke-miterlimit="10"></path></g>
              </svg>
            </div>
            <img class="shop-avatar_img" src="https://down-vn.img.susercontent.com/file/81fb06705c5f9f97e87305d42d924e4a_tn"></img>
          </a>
          <div className="info">
            <div>{account.userName}</div>
            <p>
              {" "}
              <HiPencil /> Sửa Hồ Sơ
            </p>
          </div>
        </div>
        <div>

        </div>
      </div>
      <div className="profile col-9">
        <div className="title">
          <h4>Thông tin tài khoản</h4>
          <p>Quản lý thông tin tài khoản</p>
        </div>
        <div className="profile__content">
          <div className="field-row">
            <label>Tên người dùng</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => onUserNameChange(e)}
            />
          </div>
          <div className="field-row">
            <label>Email</label>
            <span>{account.email}</span>
          </div>
          <div className="field-row">
            <label>Ảnh đại diện </label>
            <div className="avatar">
              <img
                src="https://cdn.xxl.thumbs.canstockphoto.com/anonymous-avatar-profile-icon-vector-illustration_csp21530127.jpg"
                alt="avatar"
              />
            </div>
          </div>
        </div>
        <div className="btn-save">
          <button onClick={handleUpdateAccount}>Lưu</button>
        </div>
      </div>
    </>
  );
};

export default Profile;
