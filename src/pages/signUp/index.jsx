
import "./index.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { onSignUp } from "../../redux/action/auth.action";
import Header from "../../layouts/header";
import Footer from "../../layouts/footer";

const SignUp = ({ notify }) => {
  let [activeOn, setActiveOn] = useState("");
  const dispatch = useDispatch();
  const [errMsg, setErrMsg] = useState({});
  const [account, setAccount] = useState({
    userName: "",
    fullName: "",
    email: "",
    password: "",
    rePassword: "",
  });

  const onAccountChange = (e) => {
    const { name, value } = e.target;
    setAccount({
      ...account,
      [name]: value
    });
    setErrMsg({ ...errMsg, [name]: '' });
  };

  const validateSignupData = () => {
    const errors = {};

    if (!account.userName.trim()) {
      errors.userName = "*Tên người dùng không được để trống";
    } else if (account.userName.includes(" ")) {
      errors.userName = "*Tên đăng nhập không được chứa khoảng trống";
    }

    if (!account.fullName.trim()) {
      errors.fullName = "*Họ tên không được để trống";
    }

    if (!account.email.trim()) {
      errors.email = "Email không được để trống.";
    } else {
      const emailRegex = /\S+@\S+\.\S+/;
      if (!emailRegex.test(account.email.trim())) {
        errors.email = "Email không hợp lệ.";
      }
    }

    if (!account.password.trim()) {
      errors.password = "Mật khẩu không được để trống.";
    } else if (/\s/.test(account.password)) {
      errors.password = "Mật khẩu không được chứa khoảng trắng.";
    } else if (account.password.length <= 5) {
      errors.password = "Mật khẩu phải dài hơn 5 ký tự.";
    }

    if (!account.rePassword.trim()) {
      errors.rePassword = "*Mật khẩu nhập lại không được để trống";
    } else if (account.rePassword !== account.password) {
      errors.rePassword = "*Mật khẩu bạn nhập không trùng nhau";
    }

    return errors;
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateSignupData();
    if (Object.keys(errors).length > 0) {
      setErrMsg(errors);
      return;
    }

    try {
      await dispatch(onSignUp({
        userName: account.userName.trim(),
        fullName: account.fullName.trim(),
        email: account.email.trim(),
        password: account.password.trim(),
      })).unwrap();
      setErrMsg({});
    } catch (err) {
      notify(err, "ERROR");
      setErrMsg("Đăng ký không thành công!");
    }
  };


  return (
    <>
      <Header setActiveOn={setActiveOn} />

      <div className="signup-container">
        <div className="container">
          <section className="signup-content">
            <div className="card-signup" style={{ borderRadius: "5px" }}>
              <div className="card-signup-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-outline mb-3">
                    <label>Tên tài khoản</label>
                    <input
                      type="text"
                      placeholder="Tên đăng nhập"
                      name="userName"
                      value={account.userName}
                      onChange={onAccountChange}
                    />
                    {errMsg.userName && <p className="error">{errMsg.userName}</p>}
                  </div>
                  <div className="form-outline mb-3">
                    <label>Họ tên</label>
                    <input
                      type="text"
                      placeholder="Họ và tên"
                      name="fullName"
                      value={account.fullName}
                      onChange={onAccountChange}
                    />
                    {errMsg.fullName && <p className="error">{errMsg.fullName}</p>}
                  </div>
                  <div className="form-outline mb-3">
                    <label>Email</label>
                    <input
                      type="text"
                      placeholder="Email"
                      name="email"
                      value={account.email}
                      onChange={onAccountChange}
                    />
                    {errMsg.email && <p className="error">{errMsg.email}</p>}
                  </div>

                  <div className="form-outline mb-3">
                    <label>Mật khẩu</label>
                    <input
                      type="password"
                      placeholder="Mật khẩu"
                      name="password"
                      value={account.password}
                      onChange={onAccountChange}
                    />
                    {errMsg.password && <p className="error">{errMsg.password}</p>}
                  </div>
                  <div className="form-outline mb-3">
                    <label>Nhập lại mật khẩu</label>
                    <input
                      type="password"
                      placeholder="Nhập lại mật khẩu"
                      name="rePassword"
                      value={account.rePassword}
                      onChange={onAccountChange}
                    />
                    {errMsg.rePassword && <p className="error">{errMsg.rePasswordl}</p>}
                  </div>
                  <div className="d-flex justify-content-center">
                    <button
                      type="submit"
                      className="btn btn-success btn-block btn-lg gradient-custom-4 text-body mt-5"
                    >
                      Đăng ký
                    </button>
                  </div>
                  <p className="text-center text-muted mt-5 mb-0">
                    Đã có tài khoản?{" "}
                    <Link to="/sign-in" className="fw-bold text-body">
                      <u>Đăng nhập</u>
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignUp;