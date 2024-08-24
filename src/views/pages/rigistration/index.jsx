import React, { useState, useEffect } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
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
    sex: '',
    dateOfBirth: '',
    questions: []
  })

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
    const newQuestions = [...registrationData.questions];
    if (newQuestions[index]) {
      newQuestions[index].answer = value;
      setRegistrationData({ ...registrationData, questions: newQuestions });
    }
  };

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

    if (!registrationData.sex) {
      errors.sex = 'Bạn quên chọn giới tính.'
    }

    if (!registrationData.dateOfBirth) {
      errors.dateOfBirth = 'Nhập ngày sinh theo định dạng DD/MM/YYYY.'
    } else {
      const datePattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/
      if (!datePattern.test(registrationData.dateOfBirth)) {
        errors.dateOfBirth = 'Ngày tháng không đúng định dạng DD/MM/YYYY'
      } else {
        const [day, month, year] = registrationData.dateOfBirth.split('/').map(Number)
        const isValidDate = (day, month, year) => {
          const date = new Date(year, month - 1, day)
          return date.getDate() === day && date.getMonth() === (month - 1) && date.getFullYear() === year
        }

        if (!isValidDate(day, month, year)) {
          errors.dateOfBirth = 'Ngày sinh không hợp lệ'
        }
      }
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
      await RegistrationService.addRegistration(registrationData)

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
            <div className="registration-form">
              <CContainer>
                <CCard>
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
                          name="sex"
                          value={registrationData.sex}
                          onChange={handleChange}
                        >
                          <option value="">Chọn giới tính</option>
                          <option value="male">Nam</option>
                          <option value="female">Nữ</option>
                          <option value="other">Khác</option>
                        </CFormSelect>
                      </CInputGroup>
                      {errMsg.sex && <div className="text-danger mb-3">{errMsg.sex}</div>}

                      <CInputGroup className="mb-3">
                        <CInputGroupText>Ngày sinh</CInputGroupText>
                        <CFormInput
                          type="text"
                          name="dateOfBirth"
                          placeholder="DD/MM/YYYY"
                          autoComplete="dateOfBirth"
                          value={registrationData.dateOfBirth}
                          onChange={handleChange}
                        />
                      </CInputGroup>
                      {errMsg.dateOfBirth && <div className="text-danger mb-3">{errMsg.dateOfBirth}</div>}

                      <hr />
                      <p className="text-center">Câu hỏi</p>
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
              </CContainer>
            </div>
          ) : (
            <div className='success-rigistration'>
              <CCard>
                <div className='success-body'>
                  <p className='success-text'>Chúc mừng bạn đã đăng ký thành công </p>
                  <p>Chúng tớ sẽ duyệt đơn của bạn. </p>
                  <p>Mọi thông tin và thông báo các vòng xét duyệt tiếp theo xin vui lòng kiểm email bạn đã đăng ký để biết được thêm thông tin chi tiết </p>
                  <p>Trong thời gian chờ đợi hãy ghé thăm fanpage của câu lạc bộ chúng tớ: <a href="https://www.facebook.com/clblaptrinhutb" target="_blank" rel="noopener noreferrer">Fanpage Câu lạc bộ Lập trình</a></p>
                  <CButton color="success" className="back-button" onClick={() => setIsSubmitted(false)}>Quay lại đơn đăng ký</CButton>
                </div>
              </CCard>
            </div>
          )
        ) : (
          <div className='not-open-registration'>
            <CCard>
              <div className='not-open-body'>
                <p className='notify-not-open'>Hiện tại Câu lạc bộ chúng mình chưa mở đơn đăng ký tham gia Clb</p>
                <p>Xin bạn vui lòng quay lại trong thời gian khác</p>
                <p>Trong thời gian chờ đợi hãy ghé thăm fanpage của câu lạc bộ chúng tớ để biết thông tin và thông báo mới nhất: <a href="https://www.facebook.com/clblaptrinhutb" target="_blank" rel="noopener noreferrer">Fanpage Câu lạc bộ Lập trình</a></p>
              </div>
            </CCard>
          </div>
        )}
      </div>
    </DefaultLayout>
  )
}

export default RegistrationForm
