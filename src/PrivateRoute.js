 // PrivateRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';

const secretKey = 'yourSecretKey';

const PrivateRoute = ({ element, authenticated, ...props }) => {
  return authenticated ? (
    <Route {...props} element={element} />
  ) : (
    <Navigate to="/login" state={{ from: props.location.pathname }} replace />
  );
};

export default PrivateRoute;
