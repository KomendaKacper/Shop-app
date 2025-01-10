import {createContext, useState} from 'react';
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});



export function AuthContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const navigateToHome = useNavigate();

  const login = (token) => {
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
    navigateToHome("/login");
  }

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigateToHome("/home");
  } 

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );

}

export default AuthContext;