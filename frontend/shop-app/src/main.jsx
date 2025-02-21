import { createRoot } from "react-dom/client";
import React from "react";
import App from "./App.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDashboard from "./components/Admin/AdminDashboard.jsx";
import ProtectedRoutes from "./components/Admin/ProtectedRoutes.jsx";
import PaymentPage from "./store/PaymentPage.jsx";
import { AuthContextProvider } from "./store/AuthContext";
import AllUsers from "./components/Admin/AllUsers.jsx";
import { CartContextProvider } from "./store/CartContext.jsx";
import { UserProgressContextProvider } from "./store/UserProgressContext.jsx";

const Root = () => {
  const stripePromise = loadStripe(
    "pk_test_51QhA5WIB3emFVnXUXPx7Kxr1MEcDxzXmUWIBaQGlUr9x6HhaNYiQnRuvSuD1hlQ9IaGzH8TqaZjKqyCN86klHa8000nKIcGqot"
  );
  return (
    <BrowserRouter>
      <Elements stripe={stripePromise}>
        <CartContextProvider>
          <AuthContextProvider>
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/home" element={<App />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoutes requiredRole="ROLE_ADMIN">
                    <AdminDashboard />
                  </ProtectedRoutes>
                }
              />
              <Route
                path="/admin/users"
                element={
                  <ProtectedRoutes requiredRole="ROLE_ADMIN">
                    <AllUsers />
                  </ProtectedRoutes>
                }
              />
            </Routes>
          </AuthContextProvider>
        </CartContextProvider>
      </Elements>
    </BrowserRouter>
  );
};

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
