import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import CheckIsAdmin from "../utils/checkIsAdmin";

const AdminRoute = () => {
  const isAdmin = CheckIsAdmin();
  return isAdmin ? <Outlet /> : <Navigate to="/"></Navigate>;
};

export default AdminRoute;
