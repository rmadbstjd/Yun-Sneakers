import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Join from "../pages/Join";
import Login from "../pages/Login";
import Main from "../pages/Main";
import ProductDetail from "../pages/Detail";
import Cart from "../pages/Cart";
import Like from "../pages/Like";
import MyPageRoute from "./MyPageRoute";
import Shipment from "../pages/Shipment";
import SearchPage from "../pages/Search";
import AdminRoute from "./AdminRoute";
import NotFound from "../pages/NotFound";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import NewProducts from "../pages/Admin/NewProduct";
import EditProduct from "../pages/Admin/EditProduct";
import ManageProducts from "../pages/Admin/ManageProducts";
import QnA from "../pages/Admin/QnA";
import userInfoStore from "../store/userInfoStore";
import jwt_decode from "jwt-decode";
const Router = () => {
  const { setNickName, setUserId } = userInfoStore();
  const token = localStorage.getItem("accessToken");
  const info = token && jwt_decode(token);

  useEffect(() => {
    setNickName(info?.nickname || "GUEST");
    setUserId(info?.id);
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/cart" element={<Cart />} />
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
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path={"*"} element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
