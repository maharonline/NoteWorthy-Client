import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';



const initialstate = { userName: "", email: "", password: "", rollno: "", semester: "" };

export default function Register() {
  const navigate = useNavigate();
  const [state, setstate] = useState(initialstate);
  const [isLoading, setisLoading] = useState(false);
  const { themeState, ThemeToggle } = useAuthContext()
  const handleChange = (e) => setstate(s => ({ ...s, [e.target.name]: e.target.value }));

  const goTeacherRegistrationPage = () => {
    navigate("/auth/registerTeacher")
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { userName, email, password, rollno, semester,  } = state;
    if (!email || !password) return window.toastify("Please Enter Your Details", "error");

    setisLoading(true);
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, { userName, email, password, rollno, semester, department:"Bs Computer Science " }, { withCredentials: true });
      window.toastify(res?.data?.message, "success");


      navigate("/auth/otp");
    } catch (error) {
      window.toastify("Registration Failed", "error");
      console.error(error);
    } finally {
      setisLoading(false);
    }
  };




  return (
    <main className="flex flex-col lg:flex-row min-h-screen bg-base-100 text-base-content font-raleway dark:text-white">
      {/*==== Left Side Image Section ====*/}
      
      <div className="hidden lg:block lg:w-1/2">
        <img src={themeState === 'dark' ? "/Assets/image/RegisterDark.png" : "/Assets/image/RegisterLight.png"}
          alt="Register"
          className="h-screen w-full object-cover"/>
      </div>

      {/*==== Right Side Form Section ====*/}
      <div className="flex justify-center flex-col items-center w-full lg:w-1/2 min-h-screen relative dashboard-bg ">

        <div className="absolute top-1 left-4">
          <ThemeToggle />
        </div>
        <div className="absolute top-0.5 right-4" >
          <button className="px-4 py-2 text-sm border border-blue-500 text-blue-600 rounded hover:bg-blue-600 hover:text-white" onClick={goTeacherRegistrationPage}>
            Register as a Teacher
          </button>
        </div>

        

          <h2 className="text-3xl font-bold mt-10 ">Create New Account</h2>
          <p className="mb-6">Please enter your details</p>
        
        <form onSubmit={handleSubmit} className="w-full max-w-md  p-6 sm:p-8 rounded-xl border border-blue-600 card-bg shadow-md">
          <div className="mb-2">
            <label htmlFor="userName" className="text-sm block font-semibold mb-1">UserName</label>
            <input
              type="text"
              id="userName"
              name="userName"
              placeholder="User Name"
              value={state.userName}
              onChange={handleChange}
              className="auth-input"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="email" className="text-sm block font-semibold mb-1">Email</label>
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
          <div className="mb-2">
            <label htmlFor="password" className="text-sm block font-semibold mb-1">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={state.password}
              onChange={handleChange}
              className="auth-input"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="rollno" className="text-sm block font-semibold mb-1">Roll No</label>
            <input
              minLength={5}
              maxLength={5}
              id="rollno"
              name="rollno"
              placeholder="Roll No"
              value={state.rollno}
              required
              onChange={handleChange}
              className="auth-input"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="semester" className="text-sm block font-semibold mb-1">Semester</label>
            <select
              className="auth-input"
              onChange={handleChange}
              name="semester"
              value={state.semester}
            >
              <option disabled value="">Pick Semester</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="department" className="text-sm block font-semibold mb-1">Department</label>
            <input
              type="text"
              id="department"
              name="department"
              placeholder="Department"
              value={state.department}
              defaultValue="Bs Computer Science "
              disabled
              onChange={handleChange}
              className="auth-input"
            /></div>
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 rounded-md text-white w-full disabled:opacity-50 font-semibold  py-2 transition"
          >
            {isLoading ? <span className="loading loading-spinner loading-xl"></span> : 'Register'}
          </button>
          <p className="text-center text-sm mt-4">
            Already have an account?{' '}
            <Link className="text-blue-600 hover:text-blue-800" to="/auth/login">Login</Link>
          </p>

        </form>
      </div>
    </main>
  );
}
