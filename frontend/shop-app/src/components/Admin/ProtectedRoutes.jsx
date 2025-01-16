import { Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../store/AuthContext";

const ProtectedRoutes = ({ children, requiredRole }) => {
  const authCtx = useContext(AuthContext);

  if (!authCtx.isUserLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && !authCtx.roles.includes(requiredRole)) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default ProtectedRoutes;
