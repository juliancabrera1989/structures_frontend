import React, { createContext, useState, useEffect, useContext } from 'react';
import  { jwtDecode }  from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
// import { getUser } from '../services/authService';

export const AuthContext = createContext();


 export const useAuth = ()=>{
  return useContext(AuthContext);
 }

 
export const AuthProvider = ({ children }) => {
  // const [auth, setAuth] = useState({ user: null, token: null });
  const [auth, setAuth] = useState(()=> {
    const token = localStorage.getItem('token');
    return token ? { user: jwtDecode(token).user, token } : { user: null, token: null };
  });
  const navigate = useNavigate();

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   console.log('Retrieved token:', token);
  //   if (token) {
  //     try { 
        
  //       const decoded = jwtDecode(token);
  //       if (decoded.exp * 1000 > Date.now()) {
  //         setAuth({ user: decoded.user, token });
          
  //       } else {
  //         // logout();
  //         localStorage.removeItem('token');
  //         setAuth({ user: null, token: null });
  //       }
  //     }
  //     catch (error){
  //       console.error('Invalid token:', error);
  //       localStorage.removeItem('token');
  //       setAuth({ user: null, token: null });
  //     }
  //   }
  // }, []);


  useEffect(() => {
    
    
    const token = localStorage.getItem('token');
    console.log('Retrieved token:', token);
    if (token) {
      try { 
        
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 > Date.now()) {
          setAuth({ user: decoded.user, token });
          
        } else {
          // logout();
          localStorage.removeItem('token');
          setAuth({ user: null, token: null });
        }
      }
      catch (error){
        console.error('Invalid token:', error);
        localStorage.removeItem('token');
        setAuth({ user: null, token: null });
      }
    }

    

  //  const fetchUserData = async () => {
  //   if (token) {
  //     try {
  //       const userData = await getUser(token);
  //       setAuth({ user : userData, token });


  //       // const decoded = jwtDecode(token);
  //       // if (decoded.exp * 1000 > Date.now()) {
  //       //   setAuth({ user: decoded.user, token });
        
  //     }
  //     catch(error) {
  //       console.error('Failed to fetch user data: ', error);
  //       setAuth({ user: null, token : null });
  //       localStorage.removeItem('token');
  //     }

  //   }
  //  };
  //  fetchUserData();
  }, []);






  const login = (user, token) => {
    localStorage.setItem('token', token);
    setAuth({ user, token });
    navigate('/dashboard');
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuth({ user: null, token: null });
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{  auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};