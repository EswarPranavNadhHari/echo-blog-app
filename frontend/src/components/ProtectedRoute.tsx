import { Navigate } from 'react-router-dom';
import React from 'react';

const ProtectedRoute = ({ children}: {children: React.ReactNode} ) => {

  const token = localStorage.getItem('token');
  
  if (!token) {
    return <Navigate to="/signin" />;
  }

  return children;
};

export default ProtectedRoute;
