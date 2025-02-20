import React from "react";
import { FcGoogle } from "react-icons/fc";

const Login = ({ loginHandler }) => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#121212] text-white px-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-4xl font-bold mb-4">Gemini AI</h1>
        <p className="text-gray-400 mb-8">
          Sign in to explore the power of AI.
        </p>
        <button
          onClick={loginHandler}
          className="w-full flex items-center justify-center gap-3 px-5 py-3 rounded-md bg-[#1F1F1F] hover:bg-[#292929] transition duration-200 text-white text-lg font-medium shadow-lg"
        >
          <FcGoogle className="w-6 h-6" />
          Sign in with Google
        </button>
        <p className="text-xs text-gray-500 mt-4">
          By continuing, you agree to the Terms of Service & Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default Login;
