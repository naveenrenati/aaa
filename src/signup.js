import React, { useState } from 'react';
import './signup.css'
import { useNavigate } from 'react-router-dom';
import './login'
import SCINLABSLOGO from './SCINLABSLOGO.jpg'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { API_BASE_URL } from './configure.js';

function SignupForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role:'admin',
  });
  const [emailExists, setEmailExists] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEmailCheck = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/check-email/${formData.email}`);
      if (response.ok) {
        const data = await response.json();
        setEmailExists(data.exists);
      } else {
        console.error('Failed to check email');
      }
    } catch (error) {
      console.error('Error checking email:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form
    const errors = {};
    if (!formData.username.trim()) {
      errors.username = 'Username is required';
    }
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    }
    if (!formData.password.trim()) {
      errors.password = 'Password is required';
    }
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      // There are validation errors; do not submit the form
      return;
    }

    if (emailExists) {
      console.log('Email is already in use. Please choose a different email.');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('User data saved on the server');
        // Clear the form data after successful submission
        setFormData({
          username: '',
          email: '',
          password: '',
        });
      } else {
        console.error('Failed to save user data on the server');
      }
    } catch (error) {
      console.error('Error connecting to the server:', error);
    }
  };

  return (
    <div >
      {/*<img src={SCINLABSLOGO} alt="SCINLABS LOGO" style={{ }} />
      
      
      <form className="form-boxx rounded" onSubmit={handleSubmit}>
        <h3 className='heading2'> SignUp</h3>
        <p>
          <input
            placeholder="Username"
            type="username"
	          name="username"
            value={formData.name}
            onChange={handleChange}
		        autoComplete="off"
          />
        </p>
        <p>
          <input
            placeholder="Email"
            type="email"
	          name="email"
            value={formData.email}
            onChange={handleChange}
		        autoComplete='off'
             onBlur={handleEmailCheck}
          />
        </p>
        {emailExists && <p>Email is already in use. Please choose a different email.</p>}
        <p>
          <input
            placeholder="Password"
            type="password"
		        name="password"
            value={formData.password}
            onChange={handleChange}
		        autoComplete="off"
          />
        </p>
        {formErrors.password && <p>{formErrors.password}</p>}
        <button className="bone" type="submit">Sign Up</button>
        <p style={{marginTop:"15px"}}>have an account?<span onClick={() => navigate('/login')}>Login</span></p>
  </form>*/}


      <div className="aa-container">
      <div className="aa-left">
        <img src={SCINLABSLOGO} alt="SCINLABS LOGO" />
        

        <div className="aa-left-content">
          <h1>Have an Account?</h1>
          <div className="aa-btn" onClick={() => navigate('/')}>Login</div>
        </div>
      </div>
      
      <div className="aa-right">
        
        <h1>Sign Up</h1>
        <p className="aa-p1">Signup to continue</p>
        <form className="aa-form">
          <div className="aa-input-box">
            <input type="username" placeholder="Username" className="aa-input"   name="username"
            value={formData.name}
            onChange={handleChange} required />
            <label htmlFor="input">Username</label>
          </div>
          <div className="aa-input-box">
            <input type="text" placeholder="Email" className="aa-input"  name="email"
            value={formData.email}
            onChange={handleChange}
             onBlur={handleEmailCheck} required />
            <label htmlFor="input">Email</label>
            {emailExists && <p>Email is already in use. Please choose a different email.</p>}
          </div>
          <div className="aa-input-box">
            <input
              type="password"
              placeholder="Password"
              className="aa-input"
              name="password"
            value={formData.password}
            onChange={handleChange}
              required
            />
            <label htmlFor="input">Password</label>
          </div>
          {formErrors.password && <p>{formErrors.password}</p>}
          <button className="aa-btn-sec" onClick={handleSubmit}>Submit</button>
        </form>
       
      </div>
    </div>
    </div>
    
  );
}

export default SignupForm;
