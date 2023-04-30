import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import isAdmin from "../api/user";
const IsAdmin = ({ children }) => {
  const { data } = useQuery(["isAdmin"], () => isAdmin());
  if (data?.isAdmin === true) return children;
  else if (data?.isAuth === false) {
    Swal.fire({
      title: "관리자 계정으로 로그인바랍니다. ",
      confirmButtonColor: "black",
    });
    return <Navigate to="/login" />;
  }
};

export default IsAdmin;
