import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import authenticate from "../utils/authenticate";

const PublicRoute = () => {
  const isAuth = authenticate();
  return isAuth ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoute;
