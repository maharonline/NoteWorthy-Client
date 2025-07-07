import React, {  useEffect } from 'react'
import {  Route, Routes, useNavigate } from 'react-router-dom'
import HomePage from './Home/Home.js'
import { useAuthContext } from '../../context/AuthContext.js';
import AboutUs from './About/index.js';
import ContactUs from './Contact/index.js';
import FaqPage from './FAQ/index.js';
import Navbar from '../../components/Navbar/index.js';


export default function Frontend() {
  const { isAuthenticated } = useAuthContext()

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);
  return (
   <>
    
   <Navbar/>


   <Routes>
    
    <Route index element={<HomePage/>}/>
    <Route path='about' element={<AboutUs/>}/>
    <Route path='contact' element={<ContactUs/>}/>
    <Route path='faq' element={<FaqPage/>}/>
    
   </Routes>
   </>
  )
}
