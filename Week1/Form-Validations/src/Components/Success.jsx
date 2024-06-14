// src/Success.js
import React from 'react';
import { useLocation } from 'react-router-dom';

const Success = () => {
  const location = useLocation();
  const formValues = location.state || {};

  return (
    <div className='main'>
      <div className='success'>
      <h2>Form Submitted Successfully</h2>
      <div>
        <strong>First Name:</strong> {formValues.firstName}
      </div>
      <div>
        <strong>Last Name:</strong> {formValues.lastName}
      </div>
      <div>
        <strong>Username:</strong> {formValues.username}
      </div>
      <div>
        <strong>Email:</strong> {formValues.email}
      </div>
      <div>
        <strong>Phone No.:</strong> {formValues.phoneNo}
      </div>
      <div>
        <strong>Country:</strong> {formValues.country}
      </div>
      <div>
        <strong>City:</strong> {formValues.city}
      </div>
      <div>
        <strong>PAN No.:</strong> {formValues.panNo}
      </div>
      <div>
        <strong>Aadhar No.:</strong> {formValues.aadharNo}
      </div>
    </div>
    </div>
  );
};

export default Success;
