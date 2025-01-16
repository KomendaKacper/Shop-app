import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({
  token: null,
  roles: [],
  isLoggedIn: false,
  isUserLoggedIn: false,
  login: (token, roles) => {},
  logout: () => {},
});

export function AuthContextProvider({ children }) {
  const [token, setToken] = useState(null); 
  const [roles, setRoles] = useState([]); 
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    let storedRoles = [];
  
    // Dodanie zabezpieczenia przed błędami w przypadku niepoprawnego formatu JSON
    try {
      const storedRolesString = localStorage.getItem("roles");
      if (storedRolesString) {
        storedRoles = JSON.parse(storedRolesString);
      }
    } catch (error) {
      console.error("Error parsing roles from localStorage", error);
    }
  
    if (storedToken) {
      setToken(storedToken);
    }
  
    if (storedRoles.length > 0) {
      setRoles(storedRoles);
    }
  }, []);

  const login = (newToken, newRoles) => {

    if (!newToken) {
      console.error("Attempting to login without token!");
      return;
    }

    localStorage.setItem("token", newToken);
    localStorage.setItem("roles", JSON.stringify(newRoles));

    setToken(newToken);
    setRoles(newRoles);
    setIsUserLoggedIn(true);

    if (newRoles.includes("ROLE_ADMIN")) {
      navigate("/dashboard");
    } else {
      navigate("/home");
    }
  };

  const logout = () => {
    setToken(null);
    setRoles([]);
    setIsUserLoggedIn(false);
    localStorage.removeItem("token");
    localStorage.removeItem("roles");
    navigate("/home");
  };

  const contextValue = {
    token,
    roles,
    isLoggedIn: !!token,
    isUserLoggedIn,
    login,
    logout,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

export default AuthContext;
