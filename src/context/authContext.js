import { createContext, useState, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  // 🎯 Inicialización síncrona segura desde localStorage
  const [auth, setAuth] = useState(() => {
    const token = localStorage.getItem('token');
    if (!token) return { user: null, token: null };

    try {
      const decoded = jwtDecode(token);

      // Verificación de expiración del token
      if (decoded.exp && decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem('token');
        return { user: null, token: null };
      }

      // Si decoded.user existe se usa, de lo contrario se usa la raíz decoded
      const userPayload = decoded.user || decoded;
      return { user: userPayload, token };

    } catch (error) {
      console.error('Invalid token on initial load:', error);
      localStorage.removeItem('token');
      return { user: null, token: null };
    }
  });

  // Login normal manteniendo tus argumentos (user, token) y navegación
  const login = (user, token) => {
    localStorage.setItem('token', token);
    setAuth({ user, token });
    navigate('/dashboard');
  };

  // Logout borra storage y redirige a login
  const logout = () => {
    localStorage.removeItem('token');
    setAuth({ user: null, token: null });
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};