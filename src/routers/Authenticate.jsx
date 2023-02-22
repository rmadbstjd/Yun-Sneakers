import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import authenticate from "../hooks/authenticate";
import userInfoStore from "../store/userInfoStore";
const AuthenticateRoute = ({ children }) => {
  const { setNickName, setUserId } = userInfoStore();
  const isAuthenticated = localStorage.getItem("isLogin") === "true";
  useEffect(() => {
    authenticate(setNickName, setUserId);
  }, [setNickName, setUserId]);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  } else return children;
};

export default AuthenticateRoute;
