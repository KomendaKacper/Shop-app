// import "../index.css";
import { FaGoogle } from "react-icons/fa";
import { IoMdArrowBack } from "react-icons/io";

export default function Login() {
  function test() {
    console.log("test");
  }

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
              className="mt-1 block w-full  p-2 rounded-md border text-black bg-slate-100 border-black focus:outline-none focus:ring focus:ring-slate-200"
              placeholder="Wpisz login"
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
              className="mt-1 block w-full p-2 border-black rounded-md border bg-slate-100 text-black  focus:outline-none focus:ring focus:ring-slate-200"
              placeholder="Wpisz hasło"
            />
            <p className="mt-1 text-black float-right text-sm">
              <a className="cursor-pointer hover:text-slate-500" onClick={test}>
                Forgot password?
              </a>
            </p>
          </div>
          <button className="mt-4 w-full bg-[rgb(78,67,56)] text-white p-2 rounded-md hover:bg-[rgb(95,82,68)]">
            Sign In
          </button>
          <p className="mt-4 text-black float-right hover:text-slate-600 cursor-pointer"><a href="/register">Don't have an account? Sign up now!</a></p>
          <p className="mt-4 text-black">Sign in with:</p>
          <div id="social-media-icons" className="flex float-left">
            <FaGoogle className="mt-2 text-2xl text-slate-600 cursor-pointer float-left" />
          </div>
        </div>
      </div>
    </div>
  );
}
