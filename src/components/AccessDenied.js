import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const AccessDenied = () => {
    const {ThemeToggle}=useAuthContext( )
  return (
    
    <div className="min-h-[100vh] flex flex-col items-center justify-center text-center font-raleway px-4">
        <div className="hidden">
        <ThemeToggle/>
    </div>
      <div className="text-6xl mb-4 animate-pulse">🚫</div>
      <h1 className="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">
        Access Denied
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        You don’t have permission to access this page.
      </p>
      <Link
        to="/"
        className="px-6 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium shadow transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default AccessDenied;
