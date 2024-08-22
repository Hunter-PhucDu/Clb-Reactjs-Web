import React, { useState, useEffect } from 'react'
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
  CFormSelect
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilUser } from '@coreui/icons'
import QuestionService from '../../../services/QuestionService'
import RegistrationService from '../../../services/RegistrationService'
import RegistrationSettingService from '../../../services/RegistrationSettingService'
import DefaultLayout from '../../../layout/DefaultLayout'
import './index.scss'

const RegistrationForm = ({ notify }) => {
  const [errMsg, setErrMsg] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [questions, setQuestions] = useState([])
  
  const [registrationSetting, setRegistrationSetting] = useState({
    isRegistrationOpen: false,
    createdAt: '',
    updatedAt: '',
  })

  const [registrationData, setRegistrationData] = useState({
    fullName: '',
    class: '',
    phone: '',
    email: '',
    gender: '',
    dateOfBirth: '',
    questions: []
  })


  const handleDobChange = (e) => {
    const value = e.target.value // format YYYY-MM-DD
    setRegistrationData(prevData => ({
      ...prevData,
      dateOfBirth: value
    }))
    // Convert to DD/MM/YYYY format
    const [year, month, day] = value.split('-')
    const formattedDate = `${day}/${month}/${year}`
    setRegistrationData(prevData => ({
      ...prevData,
      dateOfBirth: formattedDate
    }))
  }

  useEffect(() => {
    const fetchRegistrationSetting = async () => {
      try {
        const response = await RegistrationSettingService.getStatus()
        setRegistrationSetting(response.data)
      } catch (error) {
        console.error('Error fetching registration setting:', error)
      }
    }

    fetchRegistrationSetting()
  }, [])

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await QuestionService.getQuestions()
        const questionData = response.data.map(q => ({ question: q.question, answer: '' }))
        setQuestions(questionData)
        setRegistrationData(prevData => ({
          ...prevData,
          questions: questionData
        }))
      } catch (error) {
        console.error('Error fetching questions:', error)
      }
    }

    fetchQuestions()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setRegistrationData({
      ...registrationData,
      [name]: value
    })
    setErrMsg({ ...errMsg, [name]: '' })
  }

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...registrationData.questions]
    if (newQuestions[index]) {
      newQuestions[index].answer = value
      setRegistrationData({ ...registrationData, questions: newQuestions })
    }
  }

  const validateSignupData = () => {
    const errors = {}

    if (!registrationData.fullName) {
      errors.fullName = 'Bạn quên điền Họ tên.'
    }

    if (!registrationData.class) {
      errors.class = 'Bạn quên nhập tên lớp.'
    }

    if (!registrationData.phone) {
      errors.phone = 'Bạn quên nhập số điện thoại.'
    } else {
      const phoneRegex = /^\d{10}$/
      if (!phoneRegex.test(registrationData.phone)) {
        errors.phone = 'Số điện thoại không đúng.'
      }
    }

    if (!registrationData.email) {
      errors.email = 'Bạn quên nhập địa chỉ email.'
    } else if (/\s/.test(registrationData.email)) {
      errors.email = "Email không được chứa khoảng trắng."
    } else {
      const emailRegex = /\S+@\S+\.\S+/
      if (!emailRegex.test(registrationData.email)) {
        errors.email = 'Địa chỉ email bạn nhập không đúng'
      }
    }

    if (!registrationData.gender) {
      errors.gender = 'Bạn quên chọn giới tính.'
    }

    if (!registrationData.dateOfBirth) {
      errors.dateOfBirth = 'Nhập ngày sinh.'
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
      const [day, month, year] = registrationData.dateOfBirth.split('/')
      const formattedDate = `${year}-${month}-${day}`
      const dataToSubmit = { ...registrationData, dateOfBirth: formattedDate }

      await RegistrationService.addRegistration(dataToSubmit)

      setErrMsg({})
      notify('Đăng ký thành công!', 'success')
      setIsSubmitted(true)
    } catch (error) {
      const errorMessage = "Đăng ký không thành công!"
      notify(errorMessage, "ERROR")
      setErrMsg({ general: errorMessage })
    }
  }

  return (
    <DefaultLayout>
      <div className="registration-container">
        {registrationSetting.isRegistrationOpen ? (
          !isSubmitted ? (
            <div className="registration-form bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
              <CContainer>
                <CRow className="justify-content-center">
                  <CCol md={9} lg={7} xl={6}>
                    <CCard className="mx-4">
                      <CCardBody className="p-4">
                        <CForm onSubmit={handleSubmit}>
                          <h1>Đơn đăng ký tham gia</h1>
                          <p className="text-body-secondary">Đơn đăng ký tham gia câu lạc bộ</p>

                          <CInputGroup className="mb-3">
                            <CInputGroupText>
                              <CIcon icon={cilUser} />
                            </CInputGroupText>
                            <CFormInput
                              name="fullName"
                              placeholder="Họ và tên"
                              autoComplete="fullName"
                              value={registrationData.fullName}
                              onChange={handleChange}
                            />
                          </CInputGroup>
                          {errMsg.fullName && <div className="text-danger mb-3">{errMsg.fullName}</div>}
                          <CInputGroup className="mb-3">
                            <CInputGroupText>
                              <CIcon icon={cilUser} />
                            </CInputGroupText>
                            <CFormInput
                              name="class"
                              placeholder="Lớp"
                              autoComplete="class"
                              value={registrationData.class}
                              onChange={handleChange}
                            />
                          </CInputGroup>
                          {errMsg.class && <div className="text-danger mb-3">{errMsg.class}</div>}

                          <CInputGroup className="mb-3">
                            <CInputGroupText>
                              <CIcon icon={cilUser} />
                            </CInputGroupText>
                            <CFormInput
                              name="phone"
                              placeholder="Số điện thoại"
                              autoComplete="phone"
                              value={registrationData.phone}
                              onChange={handleChange}
                            />
                          </CInputGroup>
                          {errMsg.phone && <div className="text-danger mb-3">{errMsg.phone}</div>}

                          <CInputGroup className="mb-3">
                            <CInputGroupText>@</CInputGroupText>
                            <CFormInput
                              name="email"
                              placeholder="Email"
                              autoComplete="email"
                              value={registrationData.email}
                              onChange={handleChange}
                            />
                          </CInputGroup>
                          {errMsg.email && <div className="text-danger mb-3">{errMsg.email}</div>}

                          <CInputGroup className="mb-3">
                            <CInputGroupText>Giới tính</CInputGroupText>
                            <CFormSelect
                              name="gender"
                              value={registrationData.gender}
                              onChange={handleChange}
                            >
                              <option value="">Chọn giới tính</option>
                              <option value="Male">Nam</option>
                              <option value="Female">Nữ</option>
                              <option value="Other">Khác</option>
                            </CFormSelect>
                          </CInputGroup>
                          {errMsg.gender && <div className="text-danger mb-3">{errMsg.gender}</div>}

                          <CInputGroup className="mb-3">
                            <CInputGroupText>Ngày sinh</CInputGroupText>
                            <CFormInput
                              type="date"
                              name="dateOfBirth"
                              placeholder="Ngày sinh"
                              autoComplete="dateOfBirth"
                              value={registrationData.dateOfBirth ? new Date(registrationData.dateOfBirth.split('/').reverse().join('-')).toISOString().split('T')[0] : ''}
                              onChange={handleDobChange}
                            />
                          </CInputGroup>
                          {errMsg.dateOfBirth && <div className="text-danger mb-3">{errMsg.dateOfBirth}</div>}

                          <hr />
                          <p className="text-center">Câu hỏi</p>
                          <hr />
                          {questions.map((question, index) => (
                            <div key={index}>
                              <label>{question.question}</label>
                              <CFormInput
                                placeholder="Trả lời..."
                                value={registrationData.questions[index]?.answer || ''}
                                onChange={(e) => handleQuestionChange(index, e.target.value)}
                              />
                              <br />
                            </div>
                          ))}

                          <div className="d-grid">
                            <CButton color="success" type="submit">Gửi đơn đăng ký</CButton>
                          </div>
                        </CForm>
                      </CCardBody>
                    </CCard>
                  </CCol>
                </CRow>
              </CContainer>
            </div>
          ) : (
            <div>
              <p>Chúc mừng bạn đã đăng ký thành công tham gia CLB của chúng tớ.<br />
                Chúng tớ sẽ duyệt đơn của các bạn.<br />
                Xin vui lòng kiểm tra email đã đăng ký để biết được <br />
                Hãy ghé thăm fanpage của câu lạc bộ chúng tớ: <a href="https://www.facebook.com/clblaptrinhutb" target="_blank" rel="noopener noreferrer">Facebook Fanpage</a><br />
              </p>
              <button className="back-button" onClick={() => setIsSubmitted(false)}>Quay lại đơn đăng ký</button>
            </div>
          )
        ) : (
          <p>Hiện tại chưa mở đơn đăng ký</p>
        )}
      </div>
    </DefaultLayout>
  )
}

export default RegistrationForm
