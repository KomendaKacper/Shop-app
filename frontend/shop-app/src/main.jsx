import { createRoot } from "react-dom/client";
import React from "react";
import App from "./App.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDashboard from "./components/Admin/AdminDashboard.jsx";
import ProtectedRoutes from "./components/Admin/ProtectedRoutes.jsx";
import { AuthContextProvider } from "./store/AuthContext";

const Root = () => {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/home" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoutes requiredRole="ROLE_ADMIN">
                <AdminDashboard />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
};

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);