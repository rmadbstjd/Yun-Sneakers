import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";
import userApi from "../api/user";

const AuthenticateRoute = ({ children }) => {
  const { data, refetch } = useQuery(["isAuth"], () => userApi.authToken());
  const postToRefreshToken = async () => {
    await userApi.refreshToken();
    refetch();
  };
  if (data) {
    if (data?.isAuth === "forbidden") {
      postToRefreshToken();
    }
    if (!data?.isAuth) {
      return <Navigate to="/login" />;
    } else if (data?.isAuth) {
      return children;
    }
  }
};

export default AuthenticateRoute;
