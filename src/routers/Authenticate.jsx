import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";
import userInfoStore from "../store/userInfoStore";

const AuthenticateRoute = ({ children }) => {
  console.log("테스트");
  const { user } = userInfoStore();
  const { data, refetch } = useQuery(["isAuth"], () => user.authToken());
  const postToRefreshToken = async () => {
    await user.refreshToken();
    refetch();
  };
  if (data) {
    if (data && data.isAuth === "forbidden") {
      postToRefreshToken();
    }
    if (data && data.isAuth === false) {
      return <Navigate to="/login" />;
    } else if (data && data.isAuth === true) {
      return children;
    }
  }
};

export default AuthenticateRoute;
