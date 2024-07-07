import { useState } from "react";
import "./index.scss";
import authAPI from "../../../../api/auth.api";

const ForgetPw = ({ notify }) => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reNewPassword, setReNewPassword] = useState("");

  const handleChangePw = async () => {
    if (!password || !newPassword || !reNewPassword) {
      notify("Các mục nhập không được để trống", "INFO");
      return;
    }
    if (newPassword !== reNewPassword) {
      notify("Mật khẩu nhập lại không đúng", "INFO");
      return;
    }

    try {
      await authAPI.changePassword({ password, newPassword });
      notify("Đổi mật khẩu thành công");
      setPassword("");
      setNewPassword("");
      setReNewPassword("");
    } catch (err) {
      console.log(err);
      notify(err.response?.data, "ERROR");
    }
  };

  return (
    <div className="forgot-pw col-9">
      <div className="title">
        <h4>Đổi mật khẩu</h4>
        <p>Đổi mật khẩu để bảo vệ chính bạn</p>
      </div>
      <div className="forgot-pw__content">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="input-box">
            <label>Mật khẩu hiện tại</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="input-box">
            <label>Mật khẩu mới</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
            />
          </div>
          <div className="input-box">
            <label>Nhập lại mật khẩu mới</label>
            <input
              type="password"
              value={reNewPassword}
              onChange={(e) => {
                setReNewPassword(e.target.value);
              }}
            />
          </div>
          <div className="btn-submit">
            <button type="button" onClick={handleChangePw}>
              Xác nhận
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgetPw;
