import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Signup from "./comoponents/Signup";
import ProtectedRoutes from "./ProtestedRoutes";
import Login from "./comoponents/Login";
import Profile from "./comoponents/Profile";



function App() {
  return (

    <Routes>
        <Route path="/login"  element={<Login />} />
        <Route path="/register" element={<Signup />} />
      <Route  element={<ProtectedRoutes />}>
     
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route  element={<ProtectedRoutes />}>
     
     <Route path="/editprofile" element={<Profile />} />
   </Route>
    </Routes>


  );//
}

export default App;
