import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import userApi from "../api/user";
const IsAdmin = ({ children }) => {
  const { data } = useQuery(["isAdmin"], () => userApi.isAdmin());
  if (data?.isAdmin) return children;
  else {
    Swal.fire({
      title: "관리자 계정으로 로그인바랍니다. ",
      confirmButtonColor: "black",
    });
    return <Navigate to="/login" />;
  }
};

export default IsAdmin;
