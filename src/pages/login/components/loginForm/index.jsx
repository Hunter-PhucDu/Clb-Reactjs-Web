import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { onSignIn, onSignInUser } from "../../../../redux/action/auth.action";
import "./index.scss";

const LoginForm = ({ notify }) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState(localStorage.getItem("username") || "");
  const [password, setPassword] = useState(localStorage.getItem("password") || "");
  const [rememberMe, setRememberMe] = useState(localStorage.getItem("rememberMe") === "true");
  const [errMsg, setErrMsg] = useState({});
  const [darkMode, setDarkMode] = useState(false);

  const account = {
    userName: username,
    password: password,
  };

  const handleLogin = async () => {
    let usernameMsg = username ? "" : "Tên đăng nhập không được để trống";
    let pwMsg = password ? "" : "Mật khẩu không được để trống";
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
      await dispatch(onSignInUser(account)).unwrap();
    } catch (err) {
      console.log(err);
      if (typeof notify === 'function') {
        notify(err.message, 'ERROR'); // Ensure notify is called with correct arguments
      } else {
        console.error("notify is not a function");
      }
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <section className={`LogIn-Form ${darkMode ? 'dark-mode' : ''}`}>
      <button className={`toggle-dark-mode ${darkMode ? 'dark-mode' : ''}`} onClick={toggleDarkMode}>
        {darkMode ? "Chế độ sáng" : "Chế độ tối"}
      </button>
      <div className={`card-login ${darkMode ? 'dark-mode' : ''}`} style={{ borderRadius: "5px" }}>
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
                onChange={(e) => setUsername(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleLogin();
                }}
              />
              <p className="message">{errMsg.password}</p>
            </div>

            {/* <div className="form-outline mb-3 remember-me">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="rememberMe">Nhớ tài khoản</label>
            </div> */}

            <div className="btn-container">
              <button
                type="button"
                className={`btn btn-success btn-block btn-lg gradient-custom-4 text-body mt-5 ${darkMode ? 'dark-mode' : ''}`}
                onClick={handleLogin}
              >
                Đăng nhập
              </button>
            </div>
            <div className="login-options">
              <span className="text-left">
                <Link to="/" className="no-underline">Quên mật khẩu</Link>
              </span>
              <span className="text-right">
                Chưa có tài khoản? <Link to="/auth/sign-up" className="no-underline">Đăng ký</Link>
              </span>
              <hr />
              <p className="text-center">
                <Link to="/" className="no-underline">Quay về trang chủ</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
