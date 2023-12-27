import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './login';
import Signup from './signup';
import Header from './header';
import Dashboard from './dashboard1';
import Loginpage from './loginpage';
import firebase from 'firebase/compat/app'; 
import 'firebase/compat/auth';


function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyCT6-lNTV5ANpSRdC60jd8Hz5I1pb3FWMs",
    authDomain: "scinlabs-ba5b5.firebaseapp.com",
    projectId: "scinlabs-ba5b5",
    storageBucket: "scinlabs-ba5b5.appspot.com",
    messagingSenderId: "544472195388",
    appId: "1:544472195388:web:a57443add1e0e3b591be39",
    measurementId: "G-VYHVG09PKW"
  };
  firebase.initializeApp(firebaseConfig);
  
  const [authenticated, setAuthenticated] = useState(true);

  const handleLoginSuccess = (emaill) => {
    setAuthenticated(true);
  };

  const PrivateRoute = ({ element }) => {
    return authenticated ? element : <Navigate to="/" />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard/:emaill"
          element={<PrivateRoute element={<Dashboard />} />}
        />
        <Route path='/loginpage' element={<Loginpage/>} />
      </Routes>
    </Router>
  );
}

export default App;
