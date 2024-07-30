import React, { useState } from 'react';
import adminServiceAPI from '../../api/admin.api';

const TestApiPost = () => {
  const [adminData, setAdminData] = useState({
    userName: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminData({
      ...adminData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await adminServiceAPI.addAdmin(adminData);
      setSuccess("Admin added successfully!");
      setError(null);
      console.log(response);
    } catch (error) {
      setError(error.message);
      setSuccess(null);
    }
  };

  return (
    <div>
      <h2>Add Admin</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" name="userName" value={adminData.userName} onChange={handleChange} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={adminData.password} onChange={handleChange} required />
        </div>
        <button type="submit">Add Admin</button>
      </form>
      {success && <p style={{ color: 'green' }}>{success}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default TestApiPost;
