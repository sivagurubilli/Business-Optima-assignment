import React from "react";

import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
  const user = localStorage.getItem("userdata");
  if (user) {
    return true;
  } else {
    return false;
  }
};

const ProtectedRoutes = (props) => {
  const auth = useAuth();
  console.log(auth)
  return auth ? <Outlet /> : <Navigate to="/auth/sign-in" />;
};

export default ProtectedRoutes;