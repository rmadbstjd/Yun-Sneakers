import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";
import userInfoStore from "../store/userInfoStore";
import Swal from "sweetalert2";
const IsAdmin = ({ children }) => {
  const { user } = userInfoStore();
  const { data } = useQuery(["isAdmin"], () => user.isAdmin());
  if (data && data.isAdmin === true) return children;
  else if (data && data.isAuth === false) {
    Swal.fire({
      title: "관리자 계정으로 로그인바랍니다. ",
      confirmButtonColor: "black",
    });
    return <Navigate to="/login" />;
  }
};

export default IsAdmin;
