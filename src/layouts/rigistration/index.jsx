import React, { useState, useEffect } from 'react';
import questionServiceAPI from '../../api/question.api'
import registrationServiceAPI from '../../api/registration.api';
import registrationSettingServiceAPI from '../../api/registrationSetting.api';
import './index.scss';

  const RegistrationForm = () => {
  const [registrationSetting, setRegistrationSetting] = useState({
    isRegistrationOpen: false,
    createdAt: '',
    updatedAt: '',
  });

  const [questions, setQuestions] = useState([]);
const [registrationData, setRegistrationData] = useState({
    fullName: '',
    class: '',
    phone: '',
    email: '',
    sex: '',
    dateOfBirth: '',
    questions: []
  });
  const [formErrors, setFormErrors] = useState({});
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const fetchRegistrationSetting = async () => {
      try {
        const response = await registrationSettingServiceAPI.getStatus();
        setRegistrationSetting(response.data); // set response.data to state
      } catch (error) {
        console.error('Error fetching registration setting:', error);
      }
    };

    fetchRegistrationSetting();
  }, []);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await questionServiceAPI.getQuestions();
        const questionData = response.data.map(q => ({ question: q.question, answer: '' }));
        setQuestions(questionData); 
        setRegistrationData(prevData => ({
          ...prevData,
          questions: questionData
        }));
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegistrationData({
      ...registrationData,
      [name]: value
    });
  };

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...registrationData.questions];
    if (newQuestions[index]) {
      newQuestions[index].answer = value;
      setRegistrationData({ ...registrationData, questions: newQuestions });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};
    if (!registrationData.fullName) {
      errors.fullName = 'Bạn quên điền Họ tên.';
    }
    if (!registrationData.dateOfBirth) {
      errors.dateOfBirth = 'Nhập ngày sinh.';
    }
    if (!registrationData.class) {
      errors.class = 'Bạn quên nhập tên lớp.';
    }
    if (!registrationData.phone) {
      errors.phone = 'Bạn quên nhập số điện thoại.';
    } else {
      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(registrationData.phone)) {
        errors.phone = 'Số điện thoại không đúng.';
      }
    }
    if (!registrationData.email) {
      errors.email = 'Bạn quên nhập địa chỉ email.';
    } else {
      const emailRegex = /\S+@\S+\.\S+/;
      if (!emailRegex.test(registrationData.email)) {
        errors.email = 'Địa chỉ email bạn nhập không đúng';
      }
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      const response = await registrationServiceAPI.addRegistration(registrationData);
      setSuccess("Đăng ký thành công!");
      setError(null);
      setIsSubmitted(true);
      console.log(response);
    } catch (error) {
      setError(error.message);
      setSuccess(null);
    }
  };

  return (
    <div className="registration-form">

      {registrationSetting.isRegistrationOpen ? (
        !isSubmitted ? (
          <form onSubmit={handleSubmit}>
            <div>
              <h2 className="shining-title">Đơn đăng ký tham gia</h2>
              <label>Họ và tên:<span className="required">*Bắt buộc</span></label>
              <input
                type="text"
                name="fullName"
                value={registrationData.fullName}
                onChange={handleChange}
                className={formErrors.fullName ? 'input-error' : ''}
                placeholder="Nguyễn Văn A"
              />
              {formErrors.fullName && <p className="error">{formErrors.fullName}</p>}
            </div>
            <div>
              <label>Lớp:<span className="required">*Bắt buộc</span></label>
              <input
                type="text"
                name="class"
                value={registrationData.class}
                onChange={handleChange}
                className={formErrors.class ? 'input-error' : ''}
                placeholder="K65 ĐH CNTT A"
              />
              {formErrors.class && <p className="error">{formErrors.class}</p>}
            </div>
            <div>
              <label>Số điện thoại:<span className="required">*Bắt buộc</span></label>
              <input
                type="text"
                name="phone"
                value={registrationData.phone}
                onChange={handleChange}
                className={formErrors.phone ? 'input-error' : ''}
                placeholder="0123456789"
              />
              {formErrors.phone && <p className="error">{formErrors.phone}</p>}
            </div>
            <div>
              <label>Email:<span className="required">*Bắt buộc</span></label>
              <input
                type="text"
                name="email"
                value={registrationData.email}
                onChange={handleChange}
                className={formErrors.email ? 'input-error' : ''}
                placeholder="abc@gmail.com"
              />
              {formErrors.email && <p className="error">{formErrors.email}</p>}
            </div>
            <div>
              <label>Giới tính:</label>
              <select name="sex" value={registrationData.sex} onChange={handleChange}>
                <option value="male">Nam</option>
                <option value="female">Nữ</option>
                <option value="other">Khác</option>
              </select>
            </div>
            <div>
              <label>Ngày sinh:<span className="required">*Bắt buộc</span></label>
              <input
                type="date"
                name="dateOfBirth"
                value={registrationData.dateOfBirth}
                onChange={handleChange}
                className={formErrors.dateOfBirth ? 'input-error' : ''}
              />
              {formErrors.dateOfBirth && <p className="error">{formErrors.dateOfBirth}</p>}
            </div>
            {questions.map((question, index) => (
              <div key={index}>
                <label>{question.question}</label>
                <input
                  type="text"
                  value={registrationData.questions[index]?.answer || ''}
                  onChange={(e) => handleQuestionChange(index, e.target.value)}
                  className="question-input"
                />
              </div>
            ))}
            <button type="submit">Gửi đăng ký</button>
            {success && <p className="success">{success}</p>}
            {error && <p className="error">{error}</p>}
          </form>
        ) : (
          <div>
            <p>Chúc mừng bạn đã đăng ký thành công tham gia CLB của chúng tớ.<br />
              Chúng tớ sẽ duyệt đơn của các bạn.<br />
              Xin vui lòng kiểm tra email đã đăng ký để biết được <br />
              Hãy ghé thăm fanpage của câu lạc bộ chúng tớ: <a href="https://www.facebook.com/clblaptrinhutb"></a><br />

            </p>
            <button className="back-button" onClick={() => setIsSubmitted(false)}>Quay lại đơn đăng ký</button>
          </div>
        )
      ) : (
        <p>Hiện tại chưa mở đơn đăng ký</p>
      )}
    </div>
  );
};

export default RegistrationForm;