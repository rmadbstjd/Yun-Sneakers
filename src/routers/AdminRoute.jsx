import React from "react";
import { Routes, Route } from "react-router-dom";
import NewProducts from "../pages/Admin/NewProduct";
import QnA from "../pages/Admin/QnA";
import EditProduct from "../pages/Admin/EditProduct";
import ManageProducts from "../pages/Admin/ManageProducts";
import NotFound from "../pages/NotFound";
const AdminRoute = ({ isAdmin }) => {
  return (
    <Routes>
      <Route path="/new" element={<NewProducts isAdmin={isAdmin} />}></Route>
      <Route path="/edit" element={<EditProduct isAdmin={isAdmin} />}></Route>
      <Route path="/qna" element={<QnA isAdmin={isAdmin} />}></Route>
      <Route
        path="/manage"
        element={<ManageProducts isAdmin={isAdmin} />}
      ></Route>
      <Route path={"*"} element={<NotFound />} />
    </Routes>
  );
};

export default AdminRoute;
