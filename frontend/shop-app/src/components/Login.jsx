import "../index.css";
import { FaGoogle, FaPassport } from "react-icons/fa";
import { IoMdArrowBack } from "react-icons/io";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../store/AuthContext";

export default function Login() {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const authCtx = useContext(AuthContext);
  const navigateToHome = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:8100/api/auth/public/signin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.username,
            password: formData.password,
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        //Token
        if (data.jwtToken && data.roles) {
          authCtx.login(data.jwtToken, data.roles);
          localStorage.setItem("token", data.jwtToken);
          localStorage.setItem("roles", JSON.stringify(data.roles));

          if (data.roles.includes("ROLE_ADMIN")) {
            navigateToHome("/dashboard");
          } else {
            navigateToHome("/home");
          }
        } else {
          setError("Invalid response from server");
        }
      } else {
        const error = await response.json();
        setError(error.message || "Login failed");
      }
    } catch (error) {
      console.error("Error in login in", error);
      setError("Error During logining in");
    }
  };

  return (
    <div id="container" className="flex items-center justify-center h-screen">
      <div className="w-2/6 h-2/3 bg-slate-100 flex flex-col justify-center items-center rounded-3xl p-6 shadow-2xl border-2 border-slate-100  relative">
        <a href="/home">
          <IoMdArrowBack className="text-black text-2xl absolute top-4 left-4 cursor-pointer" />
        </a>
        <h1 className="mt-3 text-3xl text-black">Login</h1>
        <div id="form-input" className="w-full">
          <div className="mb-5 mt-5 ">
            {/* LOGO */}
            <label
              htmlFor="username"
              className="block text-sm font-medium text-black"
            >
              Login
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              className="mt-1 block w-full  p-2 rounded-md border text-black bg-slate-100 border-black focus:outline-none focus:ring focus:ring-slate-200"
              placeholder="Enter login"
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3 mt-5 ">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-black"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border-black rounded-md border bg-slate-100 text-black  focus:outline-none focus:ring focus:ring-slate-200"
              placeholder="Enter password"
            />
            <p className="mt-1 text-black float-right text-sm">
              <a className="cursor-pointer hover:text-slate-500">
                Forgot password?
              </a>
            </p>
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button
            onClick={handleLogin}
            className="mt-4 w-full bg-[rgb(78,67,56)] text-white p-2 rounded-md hover:bg-[rgb(95,82,68)]"
          >
            Sign In
          </button>
          <p className="mt-4 text-black float-right hover:text-slate-600 cursor-pointer">
            <a href="/register">Sign up now!</a>
          </p>
          <p className="mt-4 text-black">Sign in with:</p>
          <div id="social-media-icons" className="flex float-left">
            <a
              href="http://localhost:8100/oauth2/authorization/google"
              className=""
            >
              <FaGoogle className="mt-2 text-2xl text-slate-600 cursor-pointer float-left" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
