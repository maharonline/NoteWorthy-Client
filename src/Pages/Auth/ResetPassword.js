import React, { useState } from 'react';
import { useSearchParams, useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import { useAuthContext } from '../../context/AuthContext';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false)
  const { ThemeToggle } = useAuthContext()

  const token = searchParams.get('token');
  const userId = searchParams.get('id');



  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  if (!token || !userId) {
    return <Navigate to="/forgotPassword" />;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return window.toastify('Passwords do not match', 'error');
    }

    setisLoading(true)
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/resetpassword`, { userId, token, password });
      window.toastify(res?.data?.message, 'success')

      navigate('/auth/login')

    } catch (err) {
      window.toastify(err.response?.data?.message || 'Something went wrong', 'error')

    } finally {
      setisLoading(false)
    }
  };

  return (
    <>{searchParams ?
      <div className="flex items-center justify-center min-h-screen dashboard-bg px-4">
        <div className='absolute top-0 right-0'><ThemeToggle /></div>
        <div className="card-bg p-6  w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-4 text-center">Reset Your Password</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-blue-600 dark:bg-[#1e293b] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-blue-600 dark:bg-[#1e293b] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200"
            >
              {isLoading ? (
                <span className="loading loading-spinner loading-xl"></span>
              ) : (
                "Reset Password"
              )}
            </button>
          </form>

        </div>
      </div>
      : <h1>Cannot Access This Page</h1>
    }
    </>
  );
};

export default ResetPassword;
