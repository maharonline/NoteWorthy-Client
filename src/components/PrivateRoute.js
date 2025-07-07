import React from "react";
import { useAuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import LoadingNotes from "./Loaders/LoadingNotes";

export default function PrivateRoute({ Component }) {
  const { isAuthenticated, users, isAppLoading } = useAuthContext();

  if (isAppLoading) {
    return <div><LoadingNotes/></div>; 
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" />;
  }

  if (users && !users?.isEmailVerified) {
    return <Navigate to="/auth/otp" />;
  }


  return <Component />;
}


