import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import Otp from './Otp'
import ForgotPassword from './ForgotPassword'
import ResetPassword from './ResetPassword'
import RegisterTeacher from './RegisterTeacher'



export default function Auth() {
  return (
    <>
    <Routes>
        <Route path='login' element={<Login/>}/>
        <Route path='register' element={<Register/>}/>
        <Route path='registerTeacher' element={<RegisterTeacher/>}/>
        <Route path='forgotPassword' element={<ForgotPassword/>}/>
        <Route path='otp' element={<Otp/>}/>
        <Route path='resetPassword' element={<ResetPassword/>}/>
        
        
        
        
    </Routes>
    </>
  )
}
