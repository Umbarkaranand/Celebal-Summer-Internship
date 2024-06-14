// src/Form.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './FormStyle.css';

const Form = () => {
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    phoneNo: '',
    country: '',
    city: '',
    panNo: '',
    aadharNo: '',
  });

  const [errors, setErrors] = useState({});
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formValues.firstName) newErrors.firstName = 'First Name is required';
    if (!formValues.lastName) newErrors.lastName = 'Last Name is required';
    if (!formValues.username) newErrors.username = 'Username is required';
    if (!formValues.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formValues.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formValues.password) newErrors.password = 'Password is required';
    if (!formValues.phoneNo) newErrors.phoneNo = 'Phone Number is required';
    if (!formValues.country) newErrors.country = 'Country is required';
    if (!formValues.city) newErrors.city = 'City is required';
    if (!formValues.panNo) newErrors.panNo = 'PAN No. is required';
    if (!formValues.aadharNo) newErrors.aadharNo = 'Aadhar No. is required';

    return newErrors;
  };

  useEffect(() => {
    const validationErrors = validate();
    setErrors(validationErrors);
  }, [formValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      navigate('/success', { state: formValues });
    }
  };

  return (
    <div className="main">
      <form onSubmit={handleSubmit}>
        <h2 style={{ margin: 'auto' }}>React Form</h2>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formValues.firstName}
            onChange={handleChange}
          />
          {errors.firstName && <span>{errors.firstName}</span>}
        </div>

        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formValues.lastName}
            onChange={handleChange}
          />
          {errors.lastName && <span>{errors.lastName}</span>}
        </div>

        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formValues.username}
            onChange={handleChange}
          />
          {errors.username && <span>{errors.username}</span>}
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
          />
          {errors.email && <span>{errors.email}</span>}
        </div>

        <div>
          <label>Password:</label>
          <input
            type={isPasswordVisible ? 'text' : 'password'}
            name="password"
            value={formValues.password}
            onChange={handleChange}
          />
          <button type="button" onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
            {isPasswordVisible ? 'Hide' : 'Show'}
          </button>
          {errors.password && <span>{errors.password}</span>}
        </div>

        <div>
          <label>Phone No.:</label>
          <input
            type="text"
            name="phoneNo"
            value={formValues.phoneNo}
            onChange={handleChange}
          />
          {errors.phoneNo && <span>{errors.phoneNo}</span>}
        </div>

        <div>
          <label>Country:</label>
          <select name="country" value={formValues.country} onChange={handleChange}>
            <option value="">Select Country</option>
            <option value="India">India</option>
            <option value="USA">USA</option>
            <option value="UK">UK</option>
          </select>
          {errors.country && <span>{errors.country}</span>}
        </div>

        <div>
          <label>City:</label>
          <select name="city" value={formValues.city} onChange={handleChange}>
            <option value="">Select City</option>
            <option value="Pune">Pune</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Delhi">Delhi</option>
          </select>
          {errors.city && <span>{errors.city}</span>}
        </div>

        <div>
          <label>PAN No.:</label>
          <input
            type="text"
            name="panNo"
            value={formValues.panNo}
            onChange={handleChange}
          />
          {errors.panNo && <span>{errors.panNo}</span>}
        </div>

        <div>
          <label>Aadhar No.:</label>
          <input
            type="text"
            name="aadharNo"
            value={formValues.aadharNo}
            onChange={handleChange}
          />
          {errors.aadharNo && <span>{errors.aadharNo}</span>}
        </div>

        <button type="submit" disabled={Object.keys(errors).length > 0}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
