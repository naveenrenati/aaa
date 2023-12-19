// LoginForm.js
import React from 'react';
import './loginpage.css'
import logo from './SCINLABSLOGO.jpg';

const LoginForm = ({ newPerson, handleInputChange, handleLogin }) => {
  return (
      <div className="form-container">
      <div className="form-left">
        <img className="form-bg" src={logo} alt="scinlabs" />
        

        <div className="form-left-content">
          <h1>Welcome Member!</h1>
        </div>
      </div>
      <div className="form-right">
        <h1>Login</h1>
        <p className="form-p1">Login to continue</p>
        <form action="#" className="form-form">
          <div className="form-input-box">
            <input type="text" name="username" placeholder="Username" value={newPerson.username} onChange={handleInputChange} className="form-input" required />
            <label for="input">Username</label>
          </div>
          <div className="form-input-box">
            <input
              type="password"
              name="password" placeholder="Password" value={newPerson.password} onChange={handleInputChange}
              className="form-input"
              required
            />
            <label for="input">Password</label>
          </div>
          <button className="form-btn-sec" onClick={handleLogin}>LOGIN</button>
        </form>
       
      </div>
    </div>
  
    
  );
};

export default LoginForm;
