import "../index.css";
import { FaGoogle } from "react-icons/fa";


export default function Register() {

  function test() {
    console.log("test");
  }

  return (
    <div id="container" className="flex items-center justify-center h-screen">
      <form className="w-2/6 h-3/4 bg-slate-100 flex flex-col justify-center items-center rounded-3xl p-4 shadow-2xl border-2 border-slate-100">
        <h1 className="text-3xl text-black">Register</h1>

        <div id="form-input" className="w-full">
          {/* LOGO */}

          {/* Email */}
          <div className=" ">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-black"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              className="mt-1 block w-full  p-2 rounded-md border text-black bg-slate-100 border-black focus:outline-none focus:ring focus:ring-slate-200"
              placeholder="Enter email"
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
              className="mt-1 block w-full  p-2 rounded-md border text-black bg-slate-100 border-black focus:outline-none focus:ring focus:ring-slate-200"
              placeholder="Enter login"
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
              className="mt-1 block w-full p-2 border-black rounded-md border bg-slate-100 text-black  focus:outline-none focus:ring focus:ring-slate-200"
              placeholder="Enter password"
            />
          </div>
          <button className="mt-4 w-full bg-[rgb(78,67,56)] text-white p-2 rounded-md hover:bg-[rgb(95,82,68)]">
            Sign Up
          </button>
          <p className="mt-4 text-black">
            Sign up with: 
          </p>
          <div id="social-media-icons" className="flex float-left">
            <FaGoogle className="mt-2 text-2xl text-slate-600 cursor-pointer float-left" />
          </div>
        </div>
      </form>
    </div>
  );
}
