import React, { useState } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; 

export default function Navbar() {
  const { ThemeToggle } = useAuthContext();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const goToLogin = () => navigate("/auth/login");
  const goToRegister = () => navigate("/auth/register");

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <>
      
      {/* <div className="w-full flex items-center justify-between px-4  bg-red-500 dark:bg-[#0f172a] z-50 sticky top-0 "> */}
      <div className="w-full flex items-center justify-between px-4  bg-gradient-to-r from-white via-gray-100 to-white  text-blue-600 dark:from-[#0f172a] dark:via-[#1e293b] dark:to-[#0f172a] z-50 sticky top-0 ">
        {/* Left: Logo */}
        <div className="flex items-center">
          <img
            src="/Assets/image/Logo.png"
            alt="NoteWorthy Logo"
            className="h-28 object-contain -my-6"
          />
        </div>

        {/* Center: Navigation Links (Desktop) */}
        <div className="hidden md:flex space-x-6 text-base font-medium text-blue-600">
          <Link to="/" className="dark:hover:text-white hover:text-black transition">Home</Link>
          <Link to="/about" className="dark:hover:text-white hover:text-black transition">About</Link>
          <Link to="/contact" className="dark:hover:text-white hover:text-black transition">Contact Us</Link>
          <Link to="/faq" className="dark:hover:text-white hover:text-black transition">FAQ</Link>
        </div>

        {/* Right: Theme Toggle + Auth Buttons (Desktop) */}
        <div className="hidden md:flex space-x-4 items-center">
          <ThemeToggle />
          <button onClick={goToLogin} className="text-blue-600 dark:hover:text-gray-300 hover:text-black font-medium transition">Login</button>
          <button onClick={goToRegister} className="text-blue-600 dark:hover:text-gray-300 hover:text-black font-medium transition">Signup</button>
        </div>

        {/* Hamburger Menu (Mobile) */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {menuOpen ? <X size={28} className="text-blue-600" /> : <Menu size={28} className="text-blue-600" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
    {menuOpen && (
  <div className="md:hidden bg-white dark:bg-[#0f172a] shadow-md px-4 py-4 space-y-4 flex flex-col items-center text-blue-600 font-medium">
    <Link to="/" className="dark:hover:text-gray-300 hover:text-black transition">Home</Link>
    <Link to="/about" className="dark:hover:text-gray-300 hover:text-black transition">About</Link>
    <Link to="/contact" className="dark:hover:text-gray-300 hover:text-black transition">Contact Us</Link>
    <Link to="/faq" className="dark:hover:text-gray-300 hover:text-black transition">FAQ</Link>
      <button onClick={goToLogin} className="text-blue-600 dark:hover:text-gray-300 hover:text-black font-medium">Login</button>
      <button onClick={goToRegister} className="text-blue-600 dark:hover:text-gray-300 hover:text-black font-medium">Signup</button>
      <ThemeToggle/>
  </div>
)}
    </>
  );
}
