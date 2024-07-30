
import "./index.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { onSignUp } from "../../../../redux/action/auth.action";

const SignUpForm = ({ notify }) => {
  const dispatch = useDispatch();
  let [account, setAccount] = useState({
    userName: "",
    email: "",
    password: "",
    rePassword: "",
    fullName: "",
    phone: "",
    sex: "FEMALE",
    dateOfBirth: "",
    avatar: null,
  });
  let [errMessage, setErrMessage] = useState({
    userName: "",
    fullName: "",
    phone: "",
    email: "",
    password: "",
    rePassword: "",
  });

  const onAccountChange = (e, key) => {
    setAccount({
      ...account,
      [key]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setAccount({
      ...account,
      avatar: e.target.files[0],
    });
  };

  let handleSubmit = async (e) => {
    e.preventDefault();

    let userNameError = "";
    let fullNameError = "";
    let phoneError = "";
    let emailError = "";
    let passwordError = "";
    let rePasswordError = "";

    if (!account.userName.trim()) {
      userNameError = "Tên người dùng không được để trống";
    } else if (account.userName.includes(" ")) {
      userNameError = "Tên đăng nhập không được chứa khoảng trống";
    }

    if (!account.fullName.trim()) {
      fullNameError = "Họ tên không được để trống";
    }

    if (!account.phone.trim()) {
      phoneError = "Số điện thoại không được để trống";
    }

    if (!account.email.trim()) {
      emailError = "Email không được để trống";
    } else if (!account.email.endsWith("@gmail.com")) {
      emailError = "Địa chỉ email không hợp lệ";
    }

    if (account.password.length <= 6) {
      passwordError = "Mật khẩu phải dài hơn 6 ký tự";
    }

    if (account.rePassword !== account.password) {
      rePasswordError = "Mật khẩu bạn nhập không trùng nhau";
    }

    if (userNameError || fullNameError || phoneError || emailError || passwordError || rePasswordError) {
      setErrMessage({
        userName: userNameError,
        fullName: fullNameError,
        phone: phoneError,
        email: emailError,
        password: passwordError,
        rePassword: rePasswordError,
      });
      return;
    }

    try {
      await dispatch(onSignUp(account)).unwrap();
    } catch (err) {
      notify(err, "ERROR");
      setErrMessage({});
    }
  };
  
  return (
    <section className="bg-image">
              <div className="card-sign-up" style={{ borderRadius: "5px" }}>
                <div className="card-body">
                  <div className="text-left mb-5">
                    Đăng ký
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="form-outline mb-3">
                      <input
                        type="text"
                        placeholder="Tên đăng nhập"
                        className="form-control form-control-lg"
                        value={account.userName}
                        onChange={(e) => onAccountChange(e, "userName")}
                      />
                      <p className="message">{errMessage.userName}</p>
                    </div>
                    <div className="form-outline mb-3">
                      <input
                        type="text"
                        placeholder="Họ và tên"
                        className="form-control form-control-lg"
                        value={account.fullName}
                        onChange={(e) => onAccountChange(e, "fullName")}
                      />
                      <p className="message">{errMessage.fullName}</p>
                    </div>
                    <div className="form-outline mb-3">
                      <input
                        type="text"
                        placeholder="Số điện thoại"
                        className="form-control form-control-lg"
                        value={account.phone}
                        onChange={(e) => onAccountChange(e, "phone")}
                      />
                      <p className="message">{errMessage.phone}</p>
                    </div>
                    <div className="form-outline mb-3">
                      <input
                        type="text"
                        placeholder="Email"
                        className="form-control form-control-lg"
                        value={account.email}
                        onChange={(e) => onAccountChange(e, "email")}
                      />
                      <p className="message">{errMessage.email}</p>
                    </div>
                    <div className="form-outline mb-3">
                      <label>Giới tính</label>
                      <select
                        className="form-control form-control-lg"
                        value={account.sex}
                        onChange={(e) => onAccountChange(e, "sex")}
                      >
                        <option value="MALE">Nam</option>
                        <option value="FEMALE">Nữ</option>        
                        <option value="OTHER">Khác</option>
                      </select>
                    </div>
                    <div className="form-outline mb-3">
                      <label>Ngày sinh</label>
                      <input
                        type="date"
                        className="form-control form-control-lg"
                        value={account.dateOfBirth}
                        onChange={(e) => onAccountChange(e, "dateOfBirth")}
                      />
                    </div>
                    <div className="form-outline mb-3">
                      <label>Avatar</label>
                      <input
                        type="file"
                        className="form-control form-control-lg"
                        onChange={handleFileChange}
                      />
                    </div>
                    <div className="form-outline mb-3">
                      <input
                        type="password"
                        placeholder="Mật khẩu"
                        className="form-control form-control-lg"
                        value={account.password}
                        onChange={(e) => onAccountChange(e, "password")}
                      />
                      <p className="message">{errMessage.password}</p>
                    </div>
                    <div className="form-outline mb-3">
                      <input
                        type="password"
                        placeholder="Nhập lại mật khẩu"
                        className="form-control form-control-lg"
                        value={account.rePassword}
                        onChange={(e) => onAccountChange(e, "rePassword")}
                      />
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
                      <Link to="/auth/sign-in" className="fw-bold text-body">
                        <u>Đăng nhập</u>
                      </Link>
                    </p>
                  </form>
                </div>
              </div>
    </section>
  );
};

export default SignUpForm;
