import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const RedirectToAppropriatePage = () => {
  const { auth } = useAuth();

  return auth?.token ? <Navigate to="/dashboard" /> : <Navigate to="/login" />;
};

export default RedirectToAppropriatePage;
