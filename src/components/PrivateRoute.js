import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

// const PrivateRoute = () => {
//   const { auth } = useAuth();

//   return auth?.token ? <Outlet /> : <Navigate to="/login" />;
// };

// export default PrivateRoute;

const PrivateRoute = ({children}) => {
  const { auth } = useAuth();
  console.log(auth);
  if(!auth?.token) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default PrivateRoute;