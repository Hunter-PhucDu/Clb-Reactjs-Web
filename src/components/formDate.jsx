import React, { useState } from 'react';

const DateInputForm = () => {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [formattedDate, setFormattedDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Kiểm tra xem các trường có hợp lệ không
    if (day && month && year) {
      const date = new Date(year, month - 1, day);
      if (date.getDate() === Number(day) && date.getMonth() === month - 1 && date.getFullYear() === Number(year)) {
        const formatted = `${String(month).padStart(2, '0')}/${String(day).padStart(2, '0')}/${year}`;
        setFormattedDate(formatted);
        console.log('Formatted Date:', formatted); // Gửi lên server tại đây
      } else {
        alert('Ngày không hợp lệ.');
      }
    } else {
      alert('Vui lòng nhập đầy đủ ngày, tháng và năm.');
    }
  };

  return (
    <div>
      <h1>Nhập Ngày</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Ngày:</label>
          <input
            type="number"
            value={day}
            onChange={(e) => setDay(e.target.value)}
            min="1"
            max="31"
            placeholder="Ngày"
          />
        </div>
        <div>
          <label>Tháng:</label>
          <input
            type="number"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            min="1"
            max="12"
            placeholder="Tháng"
          />
        </div>
        <div>
          <label>Năm:</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="Năm"
          />
        </div>
        <button type="submit">Chuyển Đổi</button>
      </form>
      {formattedDate && <p>Ngày định dạng: {formattedDate}</p>}
    </div>
  );
};

export default DateInputForm;
