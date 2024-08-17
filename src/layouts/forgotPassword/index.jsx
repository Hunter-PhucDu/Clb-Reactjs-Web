import { useState } from "react";
import { Link } from "react-router-dom";
import LoginImg from "../../assets/images/main.png";
import "./index.scss";
import Header from "../header";
import Footer from "../footer";
import authAPI from "../../api/auth.api";

const ForgotPassword = ({ notify }) => {
    const [errMsg, setErrMsg] = useState({});
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(null);
    const [generateOtpData, setGenerateOtpData] = useState({
        email: '',
    });

    const [forgotPwData, setForgotPwData] = useState({
        email: '',
        otp: '',
        newPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setGenerateOtpData({
            ...generateOtpData,
            [name]: value
        });
        setErrMsg({ ...errMsg, [name]: '' });
    };

    const handleChangePw = (e) => {
        const { name, value } = e.target;
        setForgotPwData({
            ...forgotPwData,
            [name]: value
        });
        setErrMsg({ ...errMsg, [name]: '' });
    };

    const validateGenerateOtpData = () => {
        const errors = {};
        if (!generateOtpData.email || !generateOtpData.email.trim()) {
            errors.email = 'Email không được để trống.';
        } else {
            const emailRegex = /\S+@\S+\.\S+/;
            if (!emailRegex.test(generateOtpData.email.trim())) {
                errors.email = 'Email không hợp lệ.';
            }
        }
        return errors;
    };

    const validateForgotPwData = () => {
        const errors = {};
        if (!forgotPwData.otp.trim()) {
            errors.otp = 'Mã OTP không được để trống.';
        } else if (!/^\d{6}$/.test(forgotPwData.otp.trim())) {
            errors.otp = 'Mã OTP phải là 6 chữ số.';
        }

        if (!forgotPwData.newPassword.trim()) {
            errors.newPassword = 'Mật khẩu không được để trống.';
        } else if (/\s/.test(forgotPwData.newPassword.trim())) {
            errors.newPassword = 'Mật khẩu không được chứa khoảng trắng.';
        } else if (forgotPwData.newPassword.trim().length <= 5) {
            errors.newPassword = 'Mật khẩu phải dài hơn 5 ký tự.';
        }

        return errors;
    };

    const handleSubmitGenerateOtp = async (e) => {
        e.preventDefault();
        const errors = validateGenerateOtpData();
        if (Object.keys(errors).length > 0) {
            setErrMsg(errors);
            return;
        }
        setIsLoading(true);

        try {
            await authAPI.generateOtp({
                email: generateOtpData.email.trim()
            });
            setIsOtpSent(true);
            setIsLoading(false);
            setSuccess("Gửi mã OTP thành công!");
            setErrMsg({});
        } catch (error) {
            setIsLoading(false);
            setErrMsg({ email: "Gửi mã OTP không thành công!" });
        }
    };

    const handleSubmitForgotPw = async (e) => {
        e.preventDefault();
        const errors = validateForgotPwData();
        if (Object.keys(errors).length > 0) {
            setErrMsg(errors);
            return;
        }
        try {
            await authAPI.forgotPassword({
                email: forgotPwData.email.trim(),
                otp: forgotPwData.otp.trim(),
                newPassword: forgotPwData.newPassword.trim()
            });
            setIsOtpSent(false);
            setSuccess("Đổi mật khẩu thành công!");
            setErrMsg({});
        } catch (error) {
            setErrMsg({ otp: "Mã OTP không chính xác!" });
            setSuccess(null);
        }
    };

    return (
        <>
            <div className="fogotpw-container">
                <Header />
                <div className="container">
                    <div className="fogotpw-content">
                        <div className="image-forgotpw">
                            <img src={LoginImg} alt="Illustrated svg" />
                        </div>
                        <section className="forgotpw-form">
                            <div className="forgotpw-body" style={{ borderRadius: "5px" }}>
                                <div className="card-body-otp">
                                    {isLoading && <p className="sending-otp">Đang gửi mã OTP - Vui lòng kiểm tra hộp thư email....</p>}
                                    {!isOtpSent && !isLoading && (
                                        <form className="form-generateOtp" onSubmit={handleSubmitGenerateOtp}>
                                            <label>Nhập email của tài khoản</label>
                                            <div className="form-outline mb-3">
                                                <input
                                                    type="text"
                                                    name="email"
                                                    value={generateOtpData.email}
                                                    onChange={handleChange}
                                                    required
                                                />
                                                {errMsg.email && <p className="error">{errMsg.email}</p>}
                                            </div>
                                            <button type="submit">Gửi mã OTP</button>
                                            <hr />
                                            <Link to="/">Về trang chủ</Link>
                                        </form>
                                    )}

                                    {isOtpSent && !isLoading && (
                                        <form className="form-changePw" onSubmit={handleSubmitForgotPw}>
                                            <label>Nhập mã OTP và mật khẩu mới</label>
                                            <div className="form-outline mb-3">
                                                <input
                                                    type="text"
                                                    name="otp"
                                                    placeholder="Mã OTP"
                                                    value={forgotPwData.otp}
                                                    onChange={handleChangePw}
                                                    required
                                                />
                                                {errMsg.otp && <p className="error">{errMsg.otp}</p>}
                                            </div>

                                            <div className="form-outline mb-3">
                                                <input
                                                    type="text"
                                                    name="newPassword"
                                                    placeholder="Mật khẩu mới"
                                                    value={forgotPwData.newPassword}
                                                    onChange={handleChangePw}
                                                    required
                                                />
                                                {errMsg.newPassword && <p className="error">{errMsg.newPassword}</p>}
                                            </div>
                                            <button type="submit">Đổi mật khẩu</button>
                                            <hr />
                                            <Link to="/">Về trang chủ</Link>
                                        </form>
                                    )}
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

export default ForgotPassword;
