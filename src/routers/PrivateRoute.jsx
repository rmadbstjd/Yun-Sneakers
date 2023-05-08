import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import userApi from "../api/user";
const PrivateRoute = () => {
  const { data, refetch } = useQuery(["isAuth"], () => userApi.authToken());
  const postToRefreshToken = async () => {
    await userApi.refreshToken();
    refetch();
  };

  if (data) {
    if (data.isAuth === "forbidden") postToRefreshToken();
    else if (!data.isAuth) return <Navigate to="/login" />;
    else return <Outlet />;
  }
};

export default PrivateRoute;
