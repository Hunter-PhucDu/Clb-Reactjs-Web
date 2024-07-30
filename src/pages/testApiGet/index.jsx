import React, { useState, useEffect } from 'react';
import adminServiceAPI from '../../api/admin.api';


const TestApiGet = () => {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await adminServiceAPI.getAdmins();
        setAdmins(response.data); // set response.data to state
      } catch (error) {
        console.error('Error fetching admins:', error);
      }
    };

    fetchAdmins();
  }, []);

 
  return (
    <div>
      <h1>Test API ở đây</h1>

      <ul>
        {admins.map((admin) => (
          <li key={admin._id}>
            <p>User Name:  {admin.userName}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TestApiGet;
