import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Join from "../pages/Join";
import Login from "../pages/Login";
import Main from "../pages/Main";
import DetailPage from "../pages/Detail/DetailPage/Container";
import CartPage from "../pages/Cart/CartPage/Container";
import Like from "../pages/Like";
import MyPageRoute from "./MyPageRoute";
import Shipment from "../pages/Shipment";
import SearchPage from "../pages/Search";
import AdminRoute from "./AdminRoute";
import NotFound from "../pages/NotFound";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import NewProducts from "../pages/Admin/NewProduct";
import EditProduct from "../pages/Admin/EditProduct/Container";
import ManageProducts from "../pages/Admin/ManageProducts/Container";
import QnA from "../pages/Admin/QnA";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/cart" element={<CartPage />} />
          <Route path="/mypage/*" element={<MyPageRoute />} />
          <Route path="/products" element={<Like />} />
          <Route path="/shipment" element={<Shipment />} />
        </Route>
        <Route element={<PublicRoute />}>
          <Route path="/join" element={<Join />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<AdminRoute />}>
          <Route path="/admin/new" element={<NewProducts />}></Route>
          <Route path="/admin/manage" element={<ManageProducts />}></Route>
          <Route path="/admin/edit" element={<EditProduct />}></Route>
          <Route path="/admin/qna" element={<QnA />}></Route>
        </Route>
        <Route path="/" element={<Main />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/products/:id" element={<DetailPage />} />
        <Route path={"*"} element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
