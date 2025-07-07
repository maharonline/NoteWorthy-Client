import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const initialState = { email: '', password: '' };

export default function Login() {
  const navigate = useNavigate();
  const { getUser, themeState, ThemeToggle } = useAuthContext();

  const [state, setState] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [blockMessage, setBlockMessage] = useState('');
  const [blockTimer, setBlockTimer] = useState(0);

  const handleChange = (e) =>
    setState((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = state;

    if (!email || !password) {
      return window.toastify('Please enter your details', 'error');
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        'http://localhost:8000/api/auth/login',
        { email, password },
        { withCredentials: true }
      );

      if (response.status === 200) {
        window.toastify(response.data.message, 'success');
        const user = await getUser();

        const isTeacher =
          user?.roles === 'Teacher' ||
          (Array.isArray(user?.roles) && user?.roles.includes('Teacher'));

        if (isTeacher && user?.status === 'pending') {
          navigate('/auth/pending');
        } else if (!user?.isEmailVerified) {
          navigate('/auth/otp');
        } else {
          navigate('/dashboard');
        }
      } else {
        window.toastify('Invalid credentials', 'error');
      }
    } catch (err) {
      const status = err.response?.status;
      const message = err.response?.data?.message;

      if (status === 403) {
        //==== Extract message from backend message like "Try again in 60 seconds ===="
        const seconds = parseInt(message?.match(/\d+/)?.[0]) || 60;
        setBlockTimer(seconds);
        setBlockMessage(message);
        window.toastify(message, 'error');
      } else if (message) {
        window.toastify(message, 'error');
      } else {
        window.toastify('An unknown error occurred', 'error');
      }
    } finally {
      setIsLoading(false);
    }
  };

  //==== Countdown timer effect=====
  useEffect(() => {
    if (blockTimer <= 0) return;

    const interval = setInterval(() => {
      setBlockTimer((prev) => {
        if (prev <= 1) {
          setBlockMessage('');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [blockTimer]);

  return (
    <main className="flex flex-col lg:flex-row min-h-screen dashboard-bg">
      {/*==== Left Side Image Section ====*/}
      <div className="hidden lg:block lg:w-1/2">
        <img
          src={
            themeState === 'dark'
              ? '/Assets/image/LoginDark.png'
              : '/Assets/image/Login.png'
          }
          alt="Login"
          className="h-screen w-full object-cover"
        />
      </div>

      {/*==== Right Side Form Section ==== */}
      <div className="flex justify-center flex-col items-center w-full lg:w-1/2 min-h-screen relative dashboard-bg font-raleway">
        <div className="absolute top-1 left-4">
          <ThemeToggle />
        </div>
        <h2 className="text-3xl font-bold mb-4">Login To Your Account</h2>
        <p className="mb-6 text-blue-600">
          Please enter your Email & Password
        </p>
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md p-6 sm:p-8 rounded-xl border border-blue-600 shadow-md card-bg"
        >
          <div className="mb-4">
            <label htmlFor="email" className="text-sm block font-semibold mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={state.email}
              onChange={handleChange}
              className="auth-input"
            />
          </div>

          <div>
            <div className="flex justify-between items-center">
              <label
                htmlFor="password"
                className="dark:text-white text-sm block font-semibold"
              >
                Password
              </label>
              <div className="text-sm">
                <Link
                  className="text-blue-600 font-semibold hover:text-blue-500"
                  to="/auth/forgotPassword"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
            <div className="mb-4 mt-2">
              <input
                id="password"
                name="password"
                value={state.password}
                placeholder="Password"
                onChange={handleChange}
                type="password"
                autoComplete="current-password"
                required
                className="auth-input"
              />
            </div>
          </div>

           {/*==== Block message ===== */}
          {blockTimer > 0 && (
            <p className="text-red-600 text-sm text-center mb-3">
              {blockMessage} {blockTimer} seconds.
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading || blockTimer > 0}
            className="bg-blue-600 rounded-md text-white w-full disabled:opacity-50 font-medium hover:bg-blue-700 py-2 transition"
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-xl"></span>
            ) : (
              'Login'
            )}
          </button>

          <p className="text-center text-sm mt-4">
            Don't have an account?{' '}
            <Link className="text-blue-600 hover:text-blue-800" to="/auth/register">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}
