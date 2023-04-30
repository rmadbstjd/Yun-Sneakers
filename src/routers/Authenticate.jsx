import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";
import userInfoStore from "../store/userInfoStore";
import userApi from "../api/user";

const AuthenticateRoute = ({ children }) => {
  const { user } = userInfoStore();
  const { data, refetch } = useQuery(["isAuth"], () => userApi.authToken());
  const postToRefreshToken = async () => {
    await userApi.refreshToken();
    refetch();
  };
  if (data) {
    if (data?.isAuth === "forbidden") {
      postToRefreshToken();
    }
    if (data?.isAuth === false) {
      return <Navigate to="/login" />;
    } else if (data?.isAuth === true) {
      return children;
    }
  }
};

export default AuthenticateRoute;
