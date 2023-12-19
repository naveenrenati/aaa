// LoginForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import CryptoJS from 'crypto-js';
import 'bootstrap/dist/css/bootstrap.min.css';
import SCINLABSLOGO from './SCINLABSLOGO.jpg';

import './login.css';
import './loginpage.js';


// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCT6-lNTV5ANpSRdC60jd8Hz5I1pb3FWMs",
  authDomain: "scinlabs-ba5b5.firebaseapp.com",
  projectId: "scinlabs-ba5b5",
  storageBucket: "scinlabs-ba5b5.appspot.com",
  messagingSenderId: "544472195388",
  appId: "1:544472195388:web:a57443add1e0e3b591be39",
  measurementId: "G-VYHVG09PKW"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function LoginForm({ onLoginSuccess }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loginError, setLoginError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // Use Firebase for authentication
      const userCredential = await firebase.auth().signInWithEmailAndPassword(formData.email, formData.password);

      // If authentication is successful
      if (userCredential) {
        console.log('Login successful');
        onLoginSuccess(formData.email);

        // Encrypt the email before navigating to the dashboard
        const encryptedEmail = CryptoJS.AES.encrypt(formData.email, 'uniqueDashboardKey').toString();
        navigate(`/dashboard/${encodeURIComponent(encryptedEmail)}`);
      }
    } catch (error) {
      console.error('Login failed:', error.message);
      setLoginError(true);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div>
      <div className="a-container">
        <div className="a-left">
          <img src={SCINLABSLOGO} alt="SCINLABS LOGO" />

          <div className="a-left-content">
            <h1>Join Us Now.</h1>
            <div className="a-btn" onClick={() => navigate('/signup')}>
              SIGN UP
            </div>
          </div>
        </div>

        <div className="a-right">
          <h1>Admin Login</h1>
          <p className="a-p1">Login to continue</p>
          <form action="#" className="a-form">
            <div className="a-input-box">
              <input
                type="text"
                placeholder="Email"
                className="a-input"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <label htmlFor="input">Email</label>
            </div>
            <div className="a-input-box">
              <input
                type="password"
                placeholder="Password"
                className="a-input"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <label htmlFor="input">Password</label>
            </div>
            {loginError && (
              <p style={{ color: 'red' }}>Login failed. Please check your credentials.</p>
            )}
            <button className="a-btn-sec" onClick={handleLogin}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
        <div>
          <button className="member" onClick={() => navigate('/loginpage')}>
            Member
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;