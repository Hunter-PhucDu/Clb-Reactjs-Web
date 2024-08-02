import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { onSignIn, onSignInAdmin } from "../../../redux/action/auth.action";
// import "./index.scss";

const AdminLogin = ({ notify }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

//   // Lưu trữ tài khoản trong 3 ngày
//   const EXPIRATION_DAYS = 3;
//   const EXPIRATION_TIME = EXPIRATION_DAYS * 24 * 60 * 60 * 1000; // 3 ngày tính bằng milliseconds

//   const getLocalStorageWithExpiry = (key) => {
//     const itemStr = localStorage.getItem(key);
//     if (!itemStr) {
//       return null;
//     }
//     const item = JSON.parse(itemStr);
//     const now = new Date();
//     if (now.getTime() > item.expiry) {
//       localStorage.removeItem(key);
//       return null;
//     }
//     return item.value;
//   };

  const [username, setUsername] = useState(localStorage.getItem("username") || "");
  const [password, setPassword] = useState(localStorage.getItem("password") || "");
  const [rememberMe, setRememberMe] = useState(localStorage.getItem("rememberMe") === "true");
  const [errMsg, setErrMsg] = useState({});

  const account = {
    userName: username,
    password: password,
  };

  const onUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleLogin = async () => {
    const usernameMsg = username ? "" : "Tên đăng nhập không được để trống";
    const pwMsg = password ? "" : "Mật khẩu không được để trống";
    setErrMsg({
      userName: usernameMsg,
      password: pwMsg,
    });
    if (usernameMsg || pwMsg) {
      return;
    }
    try {
        if (rememberMe) {
          localStorage.setItem("username", username);
          localStorage.setItem("password", password);
          localStorage.setItem("rememberMe", rememberMe);
        } else {
          localStorage.removeItem("username");
          localStorage.removeItem("password");
          localStorage.removeItem("rememberMe");
        }
    
        const result = await dispatch(onSignInAdmin(account)).unwrap();
        console.log(result); // Kiểm tra phản hồi từ API
    
        // Điều hướng dựa trên vai trò
        if (result.role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/user/dashboard');
        }
      } catch (err) {
        console.log(err);
        notify(err, "ERROR");
      }
    };

  return (
    <section className="LogIn-Form">
      <div className="card-login" style={{ borderRadius: "5px" }}>
        <div className="card-body">
          <h2 className="text-center mb-5">Đăng nhập</h2>
          <form className="form-login">
            <div className="form-outline mb-3">
              <input
                type="text"
                placeholder="Tên đăng nhập / email"
                className="form-control form-control-lg"
                id="email"
                value={username}
                onChange={onUsernameChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleLogin();
                }}
              />
              <p className="message">{errMsg.userName}</p>
            </div>

            <div className="form-outline mb-3">
              <input
                type="password"
                placeholder="Mật khẩu"
                className="form-control form-control-lg"
                id="pwd"
                value={password}
                onChange={onPasswordChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleLogin();
                }}
              />
              <p class="message">{errMsg.password}</p>
            </div>
            <div className="btn-container">
              <button
                type="button"
                className="btn btn-success btn-block btn-lg gradient-custom-4 text-body mt-5"
                onClick={handleLogin}
              >
                Đăng nhập
              </button>
            </div>
            <hr/>
            <p className="text-center">
                <Link to="/" className="no-underline">Quay về trang chủ</Link>
              </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AdminLogin;
