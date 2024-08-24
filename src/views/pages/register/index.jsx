import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import "./index.scss"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { onSignUp } from "../../../redux/action"
import DefaultLayout from '../../../layout/DefaultLayout'

const Register = ({ notify }) => {
  useEffect(() => {
    document.title = "Đăng ký"
  }, [])

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [errMsg, setErrMsg] = useState({})
  const [account, setAccount] = useState({
    userName: "",
    fullName: "",
    email: "",
    password: "",
    rePassword: "",
  })

  const onAccountChange = (e) => {
    const { name, value } = e.target
    setAccount({
      ...account,
      [name]: value
    })
    setErrMsg({ ...errMsg, [name]: '' })
  }

  const validateSignupData = () => {
    const errors = {}

    if (!account.userName.trim()) {
      errors.userName = "*Tên người dùng không được để trống"
    } else if (account.userName.includes(" ")) {
      errors.userName = "*Tên đăng nhập không được chứa khoảng trống"
    }

    if (!account.fullName.trim()) {
      errors.fullName = "*Họ tên không được để trống"
    }

    if (!account.email.trim()) {
      errors.email = "*Email không được để trống"
    } else if (/\s/.test(account.password)) {
      errors.email = "Email không được chứa khoảng trắng."
    } else {
      const emailRegex = /\S+@\S+\.\S+/
      if (!emailRegex.test(account.email.trim())) {
        errors.email = "*Email không hợp lệ."
      }
    }

    if (!account.password.trim()) {
      errors.password = "*Mật khẩu không được để trống"
    } else if (/\s/.test(account.password)) {
      errors.password = "*Mật khẩu không được chứa khoảng trắng."
    } else if (account.password.length <= 5) {
      errors.password = "*Mật khẩu phải dài hơn 5 ký tự."
    }

    if (!account.rePassword.trim()) {
      errors.rePassword = "*Mật khẩu nhập lại không được để trống"
    } else if (account.rePassword !== account.password) {
      errors.rePassword = "*Mật khẩu bạn nhập không trùng nhau"
    }

    return errors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errors = validateSignupData()
    if (Object.keys(errors).length > 0) {
      setErrMsg(errors)
      return
    }

    try {
      await dispatch(onSignUp({
        userName: account.userName.trim(),
        fullName: account.fullName.trim(),
        email: account.email.trim(),
        password: account.password.trim(),
      })).unwrap()
      setErrMsg({})
      notify('Đăng ký thành công!', 'success')
      navigate("/sign-in")
    } catch (err) {
      const errorMessage = "Đăng ký không thành công!"
      notify(errorMessage, "ERROR")
      setErrMsg({ general: errorMessage })
    }
  }

  return (
    <DefaultLayout>
      <div className="register-container d-flex flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md={9} lg={7} xl={6}>
              <CCard className="mx-4">
                <CCardBody className="p-4">
                  <CForm onSubmit={handleSubmit}>
                    <h1>Đăng ký</h1>
                    <p className="text-body-secondary">Tạo tài khoản của bạn</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        name="userName"
                        placeholder="Tên người dùng"
                        autoComplete="userName"
                        value={account.userName}
                        onChange={onAccountChange}
                      />
                    </CInputGroup>
                    {errMsg.userName && <div className="text-danger mb-3">{errMsg.userName}</div>}

                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        name="fullName"
                        placeholder="Họ và tên"
                        autoComplete="fullName"
                        value={account.fullName}
                        onChange={onAccountChange}
                      />
                    </CInputGroup>
                    {errMsg.fullName && <div className="text-danger mb-3">{errMsg.fullName}</div>}

                    <CInputGroup className="mb-3">
                      <CInputGroupText>@</CInputGroupText>
                      <CFormInput
                        name="email"
                        placeholder="Email"
                        autoComplete="email"
                        value={account.email}
                        onChange={onAccountChange}
                      />
                    </CInputGroup>
                    {errMsg.email && <div className="text-danger mb-3">{errMsg.email}</div>}

                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        name="password"
                        type="password"
                        placeholder="Mật khẩu"
                        autoComplete="new-password"
                        value={account.password}
                        onChange={onAccountChange}
                      />
                    </CInputGroup>
                    {errMsg.password && <div className="text-danger mb-3">{errMsg.password}</div>}

                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        name="rePassword"
                        type="password"
                        placeholder="Nhập lại mật khẩu"
                        autoComplete="new-password"
                        value={account.rePassword}
                        onChange={onAccountChange}
                      />
                    </CInputGroup>
                    {errMsg.rePassword && <div className="text-danger mb-3">{errMsg.rePassword}</div>}

                    <div className="d-grid">
                      <CButton color="success" type="submit">Tạo tài khoản</CButton>
                    </div>
                    <hr />
                    <p className="text-center text-muted mt-5 mb-0">
                      Đã có tài khoản?{" "}
                      <Link to="/sign-in" className="fw-bold text-body">
                        <u>Đăng nhập</u>
                      </Link>
                    </p>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </DefaultLayout>
  )
}

export default Register
