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
  const navigate = useNavigate();

  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [roles, setRoles] = useState(() => {
    const storedRoles = localStorage.getItem("roles");
    return storedRoles ? JSON.parse(storedRoles) : [];
  });
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(localStorage.getItem("isUserLoggedIn") === "true");

  useEffect(() => {
    console.log("AuthContext Initialized - Token:", token);
    console.log("Roles:", roles);
    console.log("isUserLoggedIn:", isUserLoggedIn);
  }, [token, roles, isUserLoggedIn]);

  const login = (newToken, newRoles) => {
    if (!newToken) {
      console.error("Attempting to login without token!");
      return;
    }

    localStorage.setItem("token", newToken);
    localStorage.setItem("roles", JSON.stringify(newRoles));
    localStorage.setItem("isUserLoggedIn", "true"); 

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
    localStorage.removeItem("token");
    localStorage.removeItem("roles");
    localStorage.removeItem("isUserLoggedIn");

    setToken(null);
    setRoles([]);
    setIsUserLoggedIn(false);

    navigate("/home");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        roles,
        isLoggedIn: !!token,
        isUserLoggedIn,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
