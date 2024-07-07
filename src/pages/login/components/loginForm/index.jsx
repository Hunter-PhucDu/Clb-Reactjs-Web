import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { onSignIn } from "../../../../redux/action/auth.action";
import "./index.scss";

const LoginForm = ({ notify }) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState({});

  const account = {
    userName: username,
    password: password,
  };

  let onUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  let onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  let handleLogin = async () => {
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
      await dispatch(onSignIn(account)).unwrap();
    } catch (err) {
      console.log(err);
      notify(err, "ERROR");
    }
  };
  return (
    <section className="bg-image">
      <div className="card-login" style={{ borderRadius: "5px" }}>
        <div className="card-body">
          <h2 className="text-left mb-5">
            Đăng nhập
          </h2>
          <form className="form-login">
            <div className="form-outline mb-3">
              <input
                type="text"
                placeholder="Tên đăng nhập / email"
                className="form-control form-control-lg"
                id="email"
                value={username}
                onChange={(e) => onUsernameChange(e)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleLogin();
                  return;
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
                onChange={(e) => onPasswordChange(e)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleLogin();
                }}
              />
              <p className="message"> {errMsg.password} </p>
            </div>

            <button
              type="button"
              className="btn btn-success btn-block btn-lg gradient-custom-4 text-body mt-5"
              onClick={(e) => handleLogin(e)}
            >
              Đăng nhập
            </button>

            <div className="login-options">
              <span className="text-left">
                <Link to="/" className="no-underline">Quên mật khẩu</Link>
              </span>
              <span className="text-right">
                Chưa có tài khoản?{" "}
                <Link to="/auth/sign-up" className="no-underline">Đăng ký</Link>
              </span> <hr />
              <p className="text-center">
                <Link to="/" className="no-underline">Quay về trang chủ</Link>
              </p>
            </div>
          </form>
        </div>
      </div >
    </section >
  );
};

export default LoginForm;
