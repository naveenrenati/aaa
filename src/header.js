import React from 'react';
import { useNavigate } from 'react-router-dom';
import './header.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import  './signup.js';
import './login.js';
import './dashboard1.js';
import logo from './SCINLABSLOGO.jpg';
import './loginpage.js';

const Header = () => {
  const navigate = useNavigate();

  const handleClientClick = () => {
    navigate('/login');
  };

  const handleAnalystClick = () => {
    navigate('/signup');
  };
  
  const handleAMemberLogin = () => {
    navigate('/loginpage');
  };

 

  return (
    <div className="d-flex justify-content-center align-items-center  vh-100">
       <img src={logo} className="logo" alt="scinlabs" />
      
            <div className="bg-white p-3 rounded w-15">
              <p className='admin'>Admin</p>
                <button className="btn btn-primary" style={{ marginRight:"10px"}} onClick={handleClientClick}>
                  Login
                </button>
                
                <button className="btn btn-primary ml-2"   style={{ marginRight:"10px"}} onClick={handleAnalystClick}>
                  Signup
                </button>

                <button className="btn btn-primary ml-2"   style={{ marginRight:"10px"}} onClick={handleAMemberLogin}>
                  Member Login
                </button>

               

                </div>
              </div>
            
          
  );
};

export default Header;