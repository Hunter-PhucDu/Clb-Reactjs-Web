import Modal from "react-modal";
import { useState } from "react";
import accountAPI from "../../../../api/account.api";
import './index.scss'

const customStyles = {
  content: {
    margin: "auto auto",
    width: "800px",
    height: "400px",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,.5)",
  },
};

const AccountModal = ({ isModalOpened, closeModal, notify, getAccounts }) => {
  let [accountInfo, setAccountInfo] = useState({
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
  let [errMsg, setErrMsg] = useState({
    userName: "",
    email: "",
    password: "",
    rePassword: "",
    fullName: "",
    phone: "",
  });

  const onAccountInfoChange = (e, key) => {
    setAccountInfo({
      ...accountInfo,
      [key]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setAccountInfo({
      ...accountInfo,
      avatar: e.target.files[0],
    });
  };

  const handleAddAccount = async () => {
    // Validate form fields here...
    let userNameError = "";
    let emailError = "";
    let passwordError = "";
    let rePasswordError = "";
  
    if (!accountInfo.userName.trim()) {
      userNameError = "Tên người dùng không được để trống";
    }
  
    if (!accountInfo.email.trim()) {
      emailError = "Email không được để trống";
    }
  
    if (!accountInfo.password.trim()) {
      passwordError = "Mật khẩu không được để trống";
    }
  
    if (!accountInfo.rePassword.trim()) {
      rePasswordError = "Nhập lại mật khẩu không được để trống";
    }
  
    if (accountInfo.userName.includes(" ")) {
      userNameError = "Tên đăng nhập không được chứa khoảng trống";
    }
  
    if (!accountInfo.email.endsWith("@gmail.com")) {
      emailError = "Địa chỉ email không hợp lệ";
    }
  
    if (accountInfo.password.length <= 5) {
      passwordError = "Mật khẩu phải dài hơn 5 ký tự";
    } else if (accountInfo.password !== accountInfo.rePassword) {
      passwordError = "Mật khẩu bạn nhập không trùng nhau";
      rePasswordError = "Mật khẩu bạn nhập không trùng nhau";
    }
  
    if (userNameError || emailError || passwordError || rePasswordError) {
      setErrMsg({
        userName: userNameError,
        email: emailError,
        password: passwordError,
        rePassword: rePasswordError,
      });
      return;
    }
  
    // If there are no errors, continue with form submission
    try {
      let formData = new FormData();
      for (const key in accountInfo) {
        formData.append(key, accountInfo[key]);
      }
  
      await accountAPI.addAccount(formData);
      getAccounts();
      notify("Thêm tài khoản thành công!");
      closeModal();
    } catch (err) {
      console.log(err);
      notify(err.response?.data, "ERROR");
    }
  };
  

  return (
    <Modal
      isOpen={isModalOpened}
      onRequestClose={closeModal}
      ariaHideApp={false}
      style={customStyles}
      contentLabel="Account Modal"
      id="account-modal"
    >
      <h2 className="text-center title">THÊM TÀI KHOẢN MỚI</h2>
      <span
        className="btn-close-modal"
        onClick={closeModal}
        style={{
          position: "absolute",
          fontSize: "25px",
          right: "10px",
          top: "-5px",
          padding: "3px",
          cursor: "pointer",
          color: "red",
        }}
      >
        x
      </span>

      <form className="add-user-form">
        <div className="row">
          {/* Existing form fields */}
          <div className="col-6 mb-3 mt-3">
            <label>Họ và tên:</label>
            <input
              type="text"
              className="form-control"
              value={accountInfo?.fullName}
              onChange={(e) => onAccountInfoChange(e, "fullName")}
            />
            <p className="message">{errMsg.fullName}</p>
          </div>
          <div className="col-6 mb-3 mt-3">
            <label>Số điện thoại:</label>
            <input
              type="text"
              className="form-control"
              value={accountInfo?.phone}
              onChange={(e) => onAccountInfoChange(e, "phone")}
            />
            <p className="message">{errMsg.phone}</p>
          </div>
          <div className="col-6 mt-3 mb-3">
            <label>Giới tính:</label>
            <select
              className="form-control"
              value={accountInfo.sex}
              onChange={(e) => onAccountInfoChange(e, "sex")}
            >
              <option value="FEMALE">Nữ</option>
              <option value="MALE">Nam</option>
              <option value="OTHER">Khác</option>
            </select>
          </div>
          <div className="col-6 mt-3 mb-3">
            <label>Ngày sinh:</label>
            <input
              type="date"
              className="form-control"
              value={accountInfo.dateOfBirth}
              onChange={(e) => onAccountInfoChange(e, "dateOfBirth")}
            />
          </div>
          <div className="col-6 mt-3 mb-3">
            <label>Avatar:</label>
            <input
              type="file"
              className="form-control"
              onChange={handleFileChange}
            />
          </div>
        </div>
      </form>
      <div className="add-account-modal__submit-btn text-end mt-5">
        <button className="btn btn-primary" onClick={handleAddAccount}>
          Hoàn tất
        </button>
      </div>
    </Modal>
  );
};

export default AccountModal;
