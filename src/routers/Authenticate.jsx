import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";
import userInfoStore from "../store/userInfoStore";

const AuthenticateRoute = ({ children }) => {
  const { user } = userInfoStore();
  const { data, refetch } = useQuery(["isAuth"], () => user.authToken());
  const test = async () => {
    await user.refreshToken();
    refetch();
  };
  if (data) {
    if (data && data.isAuth === "forbidden") {
      test();
    }
    if (data && data.isAuth === false) {
      return <Navigate to="/login" />;
    } else if (data && data.isAuth === true) {
      return children;
    }
  }
};

export default AuthenticateRoute;
