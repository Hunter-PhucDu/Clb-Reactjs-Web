import React, { useState, useEffect } from "react"
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
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { onSignInUser } from "../../../redux/action"
import "./login.scss"
import LoginImg from "../../../assets/images/main.png"
import DefaultLayout from '../../../layout/DefaultLayout'

const LoginUser = ({ notify }) => {
  useEffect(() => {
    document.title = "Đăng nhập"
  }, [])

  const navigate = useNavigate()
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  const dispatch = useDispatch()
  const [rememberMe, setRememberMe] = useState(localStorage.getItem("rememberMe") === "true")
  const [errMsg, setErrMsg] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [account, setAccount] = useState({
    userName: "",
    password: "",
  })

  const onAccountChange = (e) => {
    const { name, value } = e.target
    setAccount({
      ...account,
      [name]: value
    })
    setErrMsg({ ...errMsg, [name]: '' })
  }

  const validateSigninData = () => {
    const errors = {}

    if (!account.userName.trim()) {
      errors.userName = "*Tên người dùng không được để trống"
    } else if (account.userName.includes(" ")) {
      errors.userName = "*Tên đăng nhập không được chứa khoảng trống"
    }

    if (!account.password.trim()) {
      errors.password = "Mật khẩu không được để trống."
    } else if (/\s/.test(account.password)) {
      errors.password = "Mật khẩu không được chứa khoảng trắng."
    } else if (account.password.length <= 5) {
      errors.password = "Mật khẩu phải dài hơn 5 ký tự."
    }

    return errors
  }

  const handleSubmitSignin = async (e) => {
    e.preventDefault()
    const errors = validateSigninData()
    if (Object.keys(errors).length > 0) {
      setErrMsg(errors)
      return
    }

    try {
      if (rememberMe) {
        localStorage.setItem("username", account.userName)
        localStorage.setItem("password", account.password)
        localStorage.setItem("rememberMe", rememberMe)
      } else {
        localStorage.removeItem("username")
        localStorage.removeItem("password")
        localStorage.removeItem("rememberMe")
      }
      await dispatch(onSignInUser({
        userName: account.userName.trim(),
        password: account.password.trim(),
      })).unwrap()
      if (isLoggedIn) {
        navigate('/')
      }
      setErrMsg({})
    } catch (err) {
      const errorMessage = "Tên đăng nhập hoặc mật khẩu không đúng!"
      notify(errorMessage, "ERROR")
      setErrMsg({ general: errorMessage })
    }
  }

  return (
    <DefaultLayout>
      <div className={"login-container-fl"}>
        <div className="container login-content">
          <div className="image-login">
            <img src={LoginImg} alt="Illustrated svg" />
          </div>
          <div className="login-container ">
            <CRow className="justify-content-center">
              <CCol md={8} lg={8} xl={8}>
                <CCard className="mx-4">
                  <CCardBody className="p-4">
                    <CForm onSubmit={handleSubmitSignin}>
                      <h1>Đăng nhập</h1>
                      <p className="text-body-secondary">Đăng nhập tài khoản</p>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput
                          name="userName"
                          placeholder="Username / email"
                          autoComplete="userName"
                          value={account.userName}
                          onChange={onAccountChange}
                        />
                      </CInputGroup>
                      {errMsg.userName && <div className="text-danger mb-3">{errMsg.userName}</div>}
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          autoComplete="new-password"
                          value={account.password}
                          onChange={onAccountChange}
                        />
                        <CInputGroupText>
                          <FontAwesomeIcon
                            icon={showPassword ? faEyeSlash : faEye}
                            className="password-icon"
                            onClick={() => setShowPassword(!showPassword)}
                          />
                        </CInputGroupText>

                      </CInputGroup>
                      {errMsg.password && <div className="text-danger mb-3">{errMsg.password}</div>}
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
                      <div className="d-grid">
                        <CButton color="success" type="submit">Đăng nhập</CButton>
                      </div>
                    </CForm>
                    <p className="text-center text-muted mt-5 mb-0">
                      <Link to="/forgotpassword" className="fw-bold text-body" style={{ paddingRight: '10px' }}>
                        <u>Quên mật khẩu</u>
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
        </div>
      </div>
    </DefaultLayout>
  )
}

export default LoginUser


