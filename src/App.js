import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './login';

import Header from './header';
import Dashboard from './dashboard1';
import Loginpage from './loginpage';


function App() {
  const [authenticated, setAuthenticated] = useState(false);

  const handleLoginSuccess = (email) => {
    setAuthenticated(true);
  };

  const PrivateRoute = ({ element }) => {
    return authenticated ? element : <Navigate to="/" />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login onLoginSuccess={handleLoginSuccess} />} />
       
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
