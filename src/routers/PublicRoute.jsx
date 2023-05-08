import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import authenticate from "../utils/authenticate";

const PublicRoute = () => {
  const auth = authenticate();
  return auth ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoute;
