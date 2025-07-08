import axios from 'axios';
import React, { useState } from 'react';
import { useAuthContext } from '../../context/AuthContext';

const initialState = { email: "" };

export default function ForgotPassword() {
  const { themeState, ThemeToggle } = useAuthContext()
  const [state, setState] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => setState(s => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email } = state;

    //==== Email validation ====
    if (!email) return window.toastify("Please Enter Your Email", "error");

    setIsLoading(true);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/forgotPassword`, { email });


      window.toastify(response?.data?.message || "Check your email", "success");
    } catch (error) {

      const errorMessage = error?.response?.data?.message || "Something went wrong!";
      window.toastify(errorMessage, "error");
    } finally {

      setIsLoading(false);
      setState("")
    }
  };


  return (
    <main className="flex flex-col lg:flex-row min-h-screen font-raleway">
      {/*==== Left Side Image Section ====*/}
      <div className="hidden lg:block lg:w-1/2">
        <img
          src={themeState === 'dark' ? "/Assets/image/ForgotDark.png" : "/Assets/image/Forgot.png"}
          alt="Register"
          className="h-screen w-full object-cover"
        />
      </div>



      {/*==== Right Side Form Section ====*/}
      <div className="flex justify-center flex-col items-center w-full lg:w-1/2 min-h-screen relative dashboard-bg ">
        <div className="absolute top-1 left-4">
          <ThemeToggle />
        </div>
        <div className="w-full max-w-md ">
          <h2 className="text-3xl text-center font-bold mb-4">Forgot Password</h2>
          <p className="text-center mb-6 text-blue-600">Enter Your Registered email address.we'll send you a code to reset your password.</p>
          <form onSubmit={handleSubmit} className="w-full card-bg">

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

            <button
              type="submit"
              onClick={handleSubmit}
              disabled={isLoading}
              className="bg-blue-600 rounded-md text-white w-full disabled:opacity-50 font-medium hover:bg-blue-700 py-2 transition"
            >
              {isLoading ? <span className="loading loading-spinner loading-xl"></span> : 'Send Email'}
            </button>
          </form>
        </div>
      </div>
    </main>


  )
}  