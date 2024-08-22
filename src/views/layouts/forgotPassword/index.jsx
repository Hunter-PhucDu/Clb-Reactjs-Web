import { useState } from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CForm,
    CFormInput,
    CInputGroup,
    CInputGroupText,
    CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import LoginImg from "../../../assets/images/main.png"
import "./index.scss"
import AuthService from "../../../services/AuthService"
import DefaultLayout from "../../../layout/DefaultLayout"

const ForgotPassword = () => {
    const [errMsg, setErrMsg] = useState({})
    const [isOtpSent, setIsOtpSent] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [success, setSuccess] = useState(null)
    const [showPassword, setShowPassword] = useState(false)
    const [generateOtpData, setGenerateOtpData] = useState({
        email: '',
    })

    const [forgotPwData, setForgotPwData] = useState({
        email: '',
        otp: '',
        newPassword: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setGenerateOtpData({
            ...generateOtpData,
            [name]: value
        })
        setErrMsg({ ...errMsg, [name]: '' })
    }

    const onChangePw = (e) => {
        const { name, value } = e.target
        setForgotPwData({
            ...forgotPwData,
            [name]: value
        })
        setErrMsg({ ...errMsg, [name]: '' })
    }

    const validateGenerateOtpData = () => {
        const errors = {}
        if (!generateOtpData.email || !generateOtpData.email.trim()) {
            errors.email = 'Email không được để trống.'
        } else if (/\s/.test(generateOtpData.email.trim())) {
            errors.email = 'Email không được chứa khoảng trắng.'
        } else {
            const emailRegex = /\S+@\S+\.\S+/
            if (!emailRegex.test(generateOtpData.email.trim())) {
                errors.email = 'Email không hợp lệ.'
            }
        }
        return errors
    }

    const validateForgotPwData = () => {
        const errors = {}
        if (!forgotPwData.otp.trim()) {
            errors.otp = 'Mã OTP không được để trống.'
        } else if (/\s/.test(forgotPwData.otp.trim())) {
            errors.otp = 'Mã OTP không được chứa khoảng trắng.'
        }
        else if (!/^\d{6}$/.test(forgotPwData.otp.trim())) {
            errors.otp = 'Mã OTP phải là 6 chữ số.'
        }

        if (!forgotPwData.newPassword.trim()) {
            errors.newPassword = 'Mật khẩu không được để trống.'
        } else if (/\s/.test(forgotPwData.newPassword.trim())) {
            errors.newPassword = 'Mật khẩu không được chứa khoảng trắng.'
        } else if (forgotPwData.newPassword.trim().length <= 5) {
            errors.newPassword = 'Mật khẩu phải dài hơn 5 ký tự.'
        }

        return errors
    }

    const handleSubmitGenerateOtp = async (e) => {
        e.preventDefault()
        const errors = validateGenerateOtpData()
        if (Object.keys(errors).length > 0) {
            setErrMsg(errors)
            return
        }
        setIsLoading(true)

        try {
            await AuthService.generateOtp(generateOtpData)
            setIsOtpSent(true)
            setIsLoading(false)
            setSuccess("Gửi mã OTP thành công!")
            setErrMsg({})
        } catch (error) {
            setIsLoading(false)
            setErrMsg({ email: "Gửi mã OTP không thành công!" })
        }
    }

    const handleSubmitForgotPw = async (e) => {
        e.preventDefault()
        const errors = validateForgotPwData()
        if (Object.keys(errors).length > 0) {
            setErrMsg(errors)
            return
        }
        try {
            await AuthService.forgotPassword(forgotPwData)
            setIsOtpSent(false)
            setSuccess("Đổi mật khẩu thành công!")
            setErrMsg({})
        } catch (error) {
            setErrMsg({ otp: "Mã OTP không chính xác!" })
            setSuccess(null)
        }
    }

    return (
        <DefaultLayout>
            <div className="fogotpw-container">
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
                                        <div className="generateOtp-container">
                                            <CRow className="justify-content-center">
                                                <CCol md={8} lg={8} xl={8}>
                                                    <CCard className="mx-4">
                                                        <CCardBody className="p-4">
                                                            <CForm onSubmit={handleSubmitGenerateOtp}>
                                                                <h1>Quên mật khẩu</h1>
                                                                <p className="text-body-secondary">Nhập email tài khoản lấy mã OTP</p>
                                                                <CInputGroup className="mb-3">
                                                                    <CInputGroupText>
                                                                        <CIcon icon={cilUser} />
                                                                    </CInputGroupText>
                                                                    <CFormInput
                                                                        name="email"
                                                                        placeholder="email"
                                                                        autoComplete="email"
                                                                        value={generateOtpData.email}
                                                                        onChange={handleChange}
                                                                    />
                                                                </CInputGroup>
                                                                {errMsg.email && <div className="text-danger mb-3">{errMsg.email}</div>}

                                                                <div className="d-grid">
                                                                    <CButton color="success" type="submit">Gửi OTP</CButton>
                                                                </div>
                                                            </CForm>
                                                            <hr />
                                                            <p className="text-center text-muted mt-5 mb-0">
                                                                <Link to="/" className="fw-bold text-body" style={{ paddingRight: '10px' }}>
                                                                    <u>Trang chủ</u>
                                                                </Link>
                                                                Đã có tài khoản?{" "}
                                                                <Link to="/sign-in" className="fw-bold text-body">
                                                                    <u>Đăng nhập</u>
                                                                </Link>
                                                            </p>
                                                        </CCardBody>
                                                    </CCard>
                                                </CCol>
                                            </CRow>
                                        </div>
                                    )}

                                    {isOtpSent && !isLoading && (
                                        <div className="form-changePw-container ">
                                            <CRow className="justify-content-center">
                                                <CCol md={8} lg={8} xl={8}>
                                                    <CCard className="mx-4">
                                                        <CCardBody className="p-4">
                                                            <CForm onSubmit={handleSubmitForgotPw}>
                                                                <h1>Đổi mật khẩu</h1>
                                                                <p className="text-body-secondary">Nhập mã OTP và mật khẩu mới</p>
                                                                <CInputGroup className="mb-3">
                                                                    <CInputGroupText>
                                                                        <CIcon icon={cilLockLocked} />
                                                                    </CInputGroupText>
                                                                    <CFormInput
                                                                        name="otp"
                                                                        placeholder="OTP"
                                                                        autoComplete="otp"
                                                                        value={forgotPwData.otp}
                                                                        onChange={onChangePw}
                                                                    />
                                                                </CInputGroup>
                                                                {errMsg.otp && <div className="text-danger mb-3">{errMsg.otp}</div>}
                                                                <CInputGroup className="mb-3">
                                                                    <CInputGroupText>
                                                                        <CIcon icon={cilLockLocked} />
                                                                    </CInputGroupText>
                                                                    <CFormInput
                                                                        name="newPassword"
                                                                        type={showPassword ? "text" : "password"}
                                                                        placeholder="New Password"
                                                                        autoComplete="newPassword"
                                                                        value={forgotPwData.newPassword}
                                                                        onChange={onChangePw}
                                                                    />
                                                                    <CInputGroupText>
                                                                        <FontAwesomeIcon
                                                                            icon={showPassword ? faEyeSlash : faEye}
                                                                            className="password-icon"
                                                                            onClick={() => setShowPassword(!showPassword)}
                                                                        />
                                                                    </CInputGroupText>

                                                                </CInputGroup>
                                                                {errMsg.newPassword && <div className="text-danger mb-3">{errMsg.newPassword}</div>}
                                                                <div className="d-grid">
                                                                    <CButton color="success" type="submit">Đổi mật khẩu</CButton>
                                                                </div>
                                                            </CForm>
                                                            <p className="text-center text-muted mt-5 mb-0">
                                                                <Link to="/" className="fw-bold text-body" style={{ paddingRight: '10px' }}>
                                                                    <u>Trang chủ</u>
                                                                </Link>
                                                                Đã có tài khoản?{" "}
                                                                <Link to="/sign-in" className="fw-bold text-body">
                                                                    <u>Đăng nhập</u>
                                                                </Link>
                                                            </p>
                                                        </CCardBody>
                                                    </CCard>
                                                </CCol>
                                            </CRow>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    )
}

export default ForgotPassword
