import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Auth from "./Auth";
import Frontend from "./Frontend";
import { useAuthContext } from "../context/AuthContext";
import PrivateRoute from "../components/PrivateRoute";
// import Navbar from "../components/Navbar";
import ScreenLoader from "../components/ScreenLoader/ScreenLoader";
import Dashboard from "./Dashboard";

export default function Index() {
  const { isAuthenticated, users, isAppLoading } = useAuthContext();

  if (isAppLoading) {
    return <ScreenLoader/>;
  }

  let isEmailVerified = users?.isEmailVerified;
  

  return (
    <>
      {/* <Navbar /> */}
      <Routes>
        <Route path='/*' element={<Frontend />}/>

        <Route path="auth/*" element={!isAuthenticated || !isEmailVerified  ? (<Auth />) : (<Navigate to="/dashboard" />)} />

      <Route path='dashboard/*' element={isAuthenticated && isEmailVerified  ? (<PrivateRoute Component={Dashboard} />) : (<Navigate to="/auth/login" />)}/>
      


      </Routes>
    </>
  );
}
