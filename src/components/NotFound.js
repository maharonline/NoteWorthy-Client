import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const NotFound = () => {
  const {ThemeToggle}=useAuthContext()
  return (
    
    <div className="min-h-[100vh] flex flex-col items-center justify-center font-raleway  px-4">
      <div className="hidden"><ThemeToggle/></div>
      {/* 🧭 Animated emoji */}
      <div className="text-7xl animate-bounce mb-4">😵</div>

      {/* 🖼️ Optional image (can be removed or replaced) */}
      {/* <img 
        src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png" 
        alt="404 Illustration"
        className="w-40 h-40 mb-6"
      /> */}

      {/* 🔢 404 Title */}
      <h1 className="text-5xl font-bold text-blue-700 dark:text-blue-700 mb-2">
        404 - Page Not Found 
      </h1>

      {/* 📜 Message */}
      <p className="text-gray-600 dark:text-gray-300 text-lg text-center mb-6 max-w-md">
        Oops! The page you are looking for doesn’t exist or has been moved.
      </p>

      {/* 🏠 Go Home Button */}
      <Link
        to="/"
        className="px-6 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
