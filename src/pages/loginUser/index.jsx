import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { onSignInUser } from "../../redux/action/auth.action";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import LoginImg from "../../assets/images/main.png";
import "./index.scss";
import Header from "../../layouts/header";
import Footer from "../../layouts/footer";

const LoginUser = ({ notify }) => {
  const navigate = useNavigate();
  let [activeOn, setActiveOn] = useState("");
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const [rememberMe, setRememberMe] = useState(localStorage.getItem("rememberMe") === "true");
  const [errMsg, setErrMsg] = useState({});
  const [showPassword, setShowPassword] = useState(false); 
  const [account, setAccount] = useState({
    userName: "",
    password: "",
  });

  const onAccountChange = (e) => {
    const { name, value } = e.target;
    setAccount({
      ...account,
      [name]: value
    });
    setErrMsg({ ...errMsg, [name]: '' });
  };

  const validateSigninData = () => {
    const errors = {};

    if (!account.userName.trim()) {
      errors.userName = "*Tên người dùng không được để trống";
    } else if (account.userName.includes(" ")) {
      errors.userName = "*Tên đăng nhập không được chứa khoảng trống";
    }

    if (!account.password.trim()) {
      errors.password = "Mật khẩu không được để trống.";
    } else if (/\s/.test(account.password)) {
      errors.password = "Mật khẩu không được chứa khoảng trắng.";
    } else if (account.password.length <= 5) {
      errors.password = "Mật khẩu phải dài hơn 5 ký tự.";
    }

    return errors;
  };
  
  let handleSubmitSignin = async (e) => {
  e.preventDefault();
  const errors = validateSigninData();
  if (Object.keys(errors).length > 0) {
    setErrMsg(errors);
    return;
  }

  try {
    if (rememberMe) {
      localStorage.setItem("username", account.userName);
      localStorage.setItem("password", account.password);
      localStorage.setItem("rememberMe", rememberMe);
    } else {
      localStorage.removeItem("username");
      localStorage.removeItem("password");
      localStorage.removeItem("rememberMe");
    }
    await dispatch(onSignInUser({
      userName: account.userName.trim(),
      password: account.password.trim(),
    })).unwrap();
    if (isLoggedIn) {
      navigate('/');
    }
    setErrMsg({});
  } catch (err) {
    const errorMessage = "Tên đăng nhập hoặc mật khẩu không đúng!";
    notify(errorMessage, "ERROR");
    setErrMsg({ general: errorMessage });
  }
};

  return (
    <>
      <Header setActiveOn={setActiveOn} />
      <div className="login-container">
        <div className="container">
          <div className="login-content">
            <div className="image-login">
              <img src={LoginImg} alt="Illustrated svg" />
            </div>

            <section className="Login-Form">
              <div className="card-login" style={{ borderRadius: "5px" }}>
                <div className="card-body">
                  <form className="form-login" onSubmit={handleSubmitSignin}>
                    <h2 className="text-center mb-5">Đăng nhập</h2>
                    <div className="form-outline mb-3">
                      <input
                        type="text"
                        placeholder="Tên đăng nhập / email"
                        className="form-control form-control-lg"
                        name="userName"
                        value={account.userName}
                        onChange={onAccountChange}
                      />
                      {errMsg.userName && <p className="message">{errMsg.userName}</p>}
                    </div>

                    <div className="form-outline mb-3 password-container">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Mật khẩu"
                        className="form-control form-control-lg"
                        name="password"
                        value={account.password}
                        onChange={onAccountChange}
                      />
                      <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                        className="password-icon"
                        onClick={() => setShowPassword(!showPassword)}
                      />
                      {errMsg.userName && <p className="message">{errMsg.password}</p>}
                    </div>

                    <div className="form-check mb-3">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="rememberMe"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                      />
                      <label className="form-check-label" htmlFor="rememberMe">
                        Nhớ tài khoản
                      </label>
                    </div>

                    <div className="btn-login">
                      <button type="submit">
                        Đăng nhập
                      </button>
                    </div>

                    <div className="login-options">
                      <span className="text-left">
                        <Link to="/forgotpassword" className="no-underline">Quên mật khẩu</Link>
                      </span>
                      <span className="text-right">
                        Chưa có tài khoản? <Link to="/signup" className="no-underline">Đăng ký</Link>
                      </span>
                    </div>
                  </form>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginUser;
