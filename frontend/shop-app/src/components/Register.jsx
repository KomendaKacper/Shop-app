import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import "../index.css";
import { FaGoogle } from "react-icons/fa";
import { IoMdArrowBack } from "react-icons/io";
import { validationRegistration } from "../utils/validation";

export default function Register() {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigateToLogin = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    console.log(formData);
    e.preventDefault();
    const validationError = validationRegistration(formData);
    if (validationError) {
      setError(validationError);
      console.log("Validation error", error);
      return;
    }
    setError(null);

    try {
      const response = await fetch(
        "http://localhost:8765/auth-service/api/auth/public/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.username,
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        navigateToLogin("/login");
      } else {
        if (response.status === 409) {
          setError(
            "User already exists. Please use a different email or username."
          );
          return;
        }
        if (!response.ok) {
          const errorDetails = await response.json();
          console.error("Server error:", errorDetails);
          setError(errorDetails.message || "An unknown error occurred.");
          return;
        }
      }
    } catch (error) {
      console.error("Error in login in", error);
      setError("Error During logining in");
    }
  };

  const isError = error === null ? false : true;

  return (
    <>
      <div id="container" className="flex items-center justify-center h-screen">
        <form
          onSubmit={handleSubmit}
          className="w-2/6 h-3/4 bg-slate-100 flex flex-col justify-center items-center rounded-3xl p-4 shadow-2xl border-2 border-slate-100 relative"
        >
          <a href="/login">
            <IoMdArrowBack className="text-black text-2xl absolute top-4 left-4 cursor-pointer" />
          </a>
          <h1 className="text-3xl text-black">Register</h1>

          <div id="form-input" className="w-full">
            {/* LOGO */}
            {isError && <p className="text-red-500 m-2">{error}</p>}

            {/* Email */}
            <div className=" ">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-black"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                className="mt-1 block w-full  p-2 rounded-md border text-black bg-slate-100 border-black focus:outline-none focus:ring focus:ring-slate-200"
                placeholder="Enter email"
                onChange={handleInputChange}
              />
            </div>

            {/* Login */}
            <div className="mb-3 mt-3 ">
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
                min={6}
                className="mt-1 block w-full  p-2 rounded-md border text-black bg-slate-100 border-black focus:outline-none focus:ring focus:ring-slate-200"
                placeholder="Enter login"
                onChange={handleInputChange}
                max={12}
              />
            </div>

            {/* Password */}
            <div className="mb-3 mt-3 ">
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
                className="mt-1 block w-full p-2 border-black rounded-md border bg-slate-100 text-black  focus:outline-none focus:ring focus:ring-slate-200"
                placeholder="Enter password"
                onChange={handleInputChange}
                min={6}
                max={16}
              />
            </div>
            <button className="mt-4 w-full bg-[rgb(78,67,56)] text-white p-2 rounded-md hover:bg-[rgb(95,82,68)]">
              Sign Up
            </button>
            <p className="mt-4 text-black">Sign up with:</p>
            <div id="social-media-icons" className="flex float-left">
              <FaGoogle className="mt-2 text-2xl text-slate-600 cursor-pointer float-left" />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
