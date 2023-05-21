import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import checkIsAdmin from "../utils/checkIsAdmin";

const AdminRoute = () => {
  const isAdmin = checkIsAdmin();
  return isAdmin ? <Outlet /> : <Navigate to="/"></Navigate>;
};

export default AdminRoute;
