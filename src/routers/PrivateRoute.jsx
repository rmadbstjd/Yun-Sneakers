import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import userApi from "../api/user";
import userInfoStore from "../store/userInfoStore";
const PrivateRoute = () => {
  const { userId } = userInfoStore();
  const { data, refetch } = useQuery(["isAuth"], () =>
    userApi.verifyAccessToken()
  );

  const sendRefreshToken = async () => {
    await userApi.sendRefreshToken(userId);
    refetch();
  };

  if (data) {
    if (data.isAuth === "forbidden") sendRefreshToken();
    else if (!data.isAuth) return <Navigate to="/login" />;
    else return <Outlet />;
  }
};

export default PrivateRoute;
