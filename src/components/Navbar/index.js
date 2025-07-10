import React, { useState } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const { ThemeToggle } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const [menuOpen, setMenuOpen] = useState(false);

  const goToLogin = () => {
    navigate('/auth/login');
    setMenuOpen(false);
  };

  const goToRegister = () => {
    navigate('/auth/register');
    setMenuOpen(false);
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <>
      {/* Top Navbar */}
      <div className="w-full flex items-center justify-between px-4 bg-gradient-to-r from-white via-gray-100 to-white text-blue-600 dark:from-[#0f172a] dark:via-[#1e293b] dark:to-[#0f172a] z-50 sticky top-0">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src="/Assets/image/logo.png"
            alt="NoteWorthy Logo"
            className="h-28 object-contain -my-6"
          />
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 text-base font-medium text-blue-600">
          <Link
            to="/"
            className={`px-1 transition ${
              currentPath === '/' ? 'border-b-2 dark:border-white border-gray-900' : ''
            } dark:hover:text-white hover:text-black`}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`px-1 transition ${
              currentPath === '/about' ? 'border-b-2 dark:border-white border-gray-900' : ''
            } dark:hover:text-white hover:text-black`}
          >
            About
          </Link>
          <Link
            to="/contact"
            className={`px-1 transition ${
              currentPath === '/contact' ? 'border-b-2 dark:border-white border-gray-900' : ''
            } dark:hover:text-white hover:text-black`}
          >
            Contact Us
          </Link>
          <Link
            to="/faq"
            className={`px-1 transition ${
              currentPath === '/faq' ? 'border-b-2 dark:border-white border-gray-900' : ''
            } dark:hover:text-white hover:text-black`}
          >
            FAQ
          </Link>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex space-x-4 items-center">
          <ThemeToggle />
          <button
            onClick={goToLogin}
            className={`px-1 font-medium transition ${
              currentPath === '/auth/login' ? 'border-b-2 dark:border-white border-gray-900' : ''
            } text-blue-600 dark:hover:text-gray-300 hover:text-black`}
          >
            Login
          </button>
          <button
            onClick={goToRegister}
            className={`px-1 font-medium transition ${
              currentPath === '/auth/register'
                ? 'border-b-2 dark:border-white border-gray-900'
                : ''
            } text-blue-600 dark:hover:text-gray-300 hover:text-black`}
          >
            Signup
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {menuOpen ? (
              <X size={28} className="text-blue-600" />
            ) : (
              <Menu size={28} className="text-blue-600" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu (Bottom Fixed) */}
      {menuOpen && (
        <div className="md:hidden fixed top-12 left-0 w-full bg-white dark:bg-[#0f172a] shadow-t border-t border-gray-200 dark:border-gray-700 z-50 px-4 py-4 space-y-3 flex flex-col items-center text-blue-600 font-medium">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className={`transition ${
              currentPath === '/' ? 'border-b-2 dark:border-white border-gray-900' : ''
            } dark:hover:text-gray-300 hover:text-black`}
          >
            Home
          </Link>
          <Link
            to="/about"
            onClick={() => setMenuOpen(false)}
            className={`transition ${
              currentPath === '/about' ? 'border-b-2 dark:border-white border-gray-900' : ''
            } dark:hover:text-gray-300 hover:text-black`}
          >
            About
          </Link>
          <Link
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className={`transition ${
              currentPath === '/contact' ? 'border-b-2 dark:border-white border-gray-900' : ''
            } dark:hover:text-gray-300 hover:text-black`}
          >
            Contact Us
          </Link>
          <Link
            to="/faq"
            onClick={() => setMenuOpen(false)}
            className={`transition ${
              currentPath === '/faq' ? 'border-b-2 dark:border-white border-gray-900' : ''
            } dark:hover:text-gray-300 hover:text-black`}
          >
            FAQ
          </Link>
          <button
            onClick={goToLogin}
            className={`transition ${
              currentPath === '/auth/login' ? 'border-b-2 dark:border-white border-gray-900' : ''
            } text-blue-600 dark:hover:text-gray-300 hover:text-black font-medium`}
          >
            Login
          </button>
          <button
            onClick={goToRegister}
            className={`transition ${
              currentPath === '/auth/register'
                ? 'border-b-2 dark:border-white border-gray-900'
                : ''
            } text-blue-600 dark:hover:text-gray-300 hover:text-black font-medium`}
          >
            Signup
          </button>
          <ThemeToggle />
        </div>
      )}
    </>
  );
}
