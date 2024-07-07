import React, { useState, useEffect } from 'react';
import registrationAPI from '../../../../api/registration.api';
import 'react-toastify/dist/ReactToastify.css';
import './index.scss';

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        dateOfBirth: '',
        class: '',
        maSV: '',
        phone: '',
        email: '',
        facebook: '',
        answer: [],
    });
    const [questions, setQuestions] = useState([]);
    const [formErrors, setFormErrors] = useState({}); // State để lưu trữ các lỗi của form

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await registrationAPI.getAllQuestions();
                setQuestions(response.data);
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };

        fetchQuestions();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = {};
        if (!formData.fullName) {
            errors.fullName = 'Bạn quên điền Họ tên.';
        }
        if (!formData.dateOfBirth) {
            errors.dateOfBirth = 'Nhập ngày sinh.';
        }
        if (!formData.class) {
            errors.class = 'Bạn quên nhập tên lớp.';
        }
        if (!formData.maSV) {
            errors.maSV = 'Bạn quên nhập mã sinh viên.';
        }
        if (!formData.phone) {
            errors.phone = 'Bạn quên nhập số điện thoại.';
        } else {
            const phoneRegex = /^\d{10}$/;
            if (!phoneRegex.test(formData.phone)) {
                errors.phone = 'Số điện thoại không đúng.';
            }
        }
        if (!formData.email) {
            errors.email = 'Bạn quên nhập địa chỉ email.';
        } else {
            const emailRegex = /\S+@\S+\.\S+/;
            if (!emailRegex.test(formData.email)) {
                errors.email = `Địa chỉ email bạn nhập không đúng`;
            }
        }

        if (Object.keys(errors).length > 0) {
            // Nếu có lỗi, setFormErrors để hiển thị các cảnh báo dưới các ô input
            setFormErrors(errors);
            return;
        }

        try {
            const response = await registrationAPI.addRegistration(formData);
            console.log(response);
        } catch (error) {
            console.error(error);
            if (error.response && error.response.data && error.response.data.message) {
                // Hiển thị thông báo lỗi từ backend (nếu có)
                console.error(error.response.data.message);
            } else {
                console.error('An error occurred. Please try again later.');
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setFormErrors({ ...formErrors, [name]: '' });
    };

    const handleAnswerChange = (e, questionIndex) => {
        const { value } = e.target;
        setFormData((prevFormData) => {
            const updatedAnswers = [...prevFormData.answer];
            updatedAnswers[questionIndex] = value;
            return { ...prevFormData, answer: updatedAnswers };
        });
        setFormErrors({ ...formErrors, [`answer_${questionIndex}`]: '' });
    };

    return (
        <>
            <h1 className='h1'>Đơn đăng ký tham gia</h1>
            <div className="registration-form">
                <form onSubmit={handleSubmit}>
                    <label>
                        Họ và tên
                        {formErrors.fullName && <span className="error">{formErrors.fullName}</span>}
                        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
                    </label>

                    <label>
                        Ngày sinh
                        {formErrors.dateOfBirth && <span className="error">{formErrors.dateOfBirth}</span>}
                        <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
                    </label>

                    <label>
                        Lớp
                        {formErrors.class && <span className="error">{formErrors.class}</span>}
                        <input type="text" name="class" value={formData.class} onChange={handleChange} />
                    </label>

                    <label>
                        Mã sinh viên
                        {formErrors.maSV && <span className="error">{formErrors.maSV}</span>}
                        <input type="text" name="maSV" value={formData.maSV} onChange={handleChange} />
                    </label>

                    <label>
                        Số điện thoại
                        {formErrors.phone && <span className="error">{formErrors.phone}</span>}
                        <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
                    </label>

                    <label>
                        Email
                        {formErrors.email && <span className="error">{formErrors.email}</span>}
                        <input type="email" name="email" value={formData.email} onChange={handleChange} />
                    </label>

                    <label>
                        Facebook
                        {formErrors.facebook && <span className="error">{formErrors.facebook}</span>}
                        <input type="text" name="facebook" value={formData.facebook} onChange={handleChange} />
                    </label>

                    {questions.map((question, index) => (
                        <div key={question._id}>
                            <label>
                                {question.question}
                                {formErrors[`answer_${index}`] && <span className="error">{formErrors[`answer_${index}`]}</span>}
                                <input
                                    className="answer-input"
                                    type="text"
                                    name={`answer_${question._id}`}
                                    value={formData.answer[index] || ''}
                                    onChange={(e) => handleAnswerChange(e, index)}
                                />
                            </label>
                        </div>
                    ))}
                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    );
};

export default RegistrationForm;
