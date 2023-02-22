import React from "react";
import { Navigate } from "react-router-dom";

const AuthenticateRoute = ({ isAuthenticated, children }) => {
  console.log("Children", children);
  console.log("Auth@", isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  } else return children;
};

export default AuthenticateRoute;
