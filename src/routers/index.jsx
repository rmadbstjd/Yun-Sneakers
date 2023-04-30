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
import userInfoStore from "../store/userInfoStore";
import authenticate from "../utils/authenticate";
import AuthenticateRoute from "./Authenticate";
import IsAdmin from "./IsAdmin";
import AdminRoute from "./AdminRoute";
import NotFound from "../pages/NotFound";
const Router = () => {
  const { setNickName, setUserId } = userInfoStore();
  useEffect(() => {
    authenticate(setNickName, setUserId);
  }, [setNickName, setUserId]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/join" element={<Join />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<SearchPage />} />
        <Route
          path="/admin/*"
          element={
            <IsAdmin>
              <AdminRoute />
            </IsAdmin>
          }
        />
        <Route
          path="/mypage/*"
          element={
            <AuthenticateRoute>
              <MyPageRoute />
            </AuthenticateRoute>
          }
        />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route
          path="/products"
          element={
            <AuthenticateRoute>
              <Like />
            </AuthenticateRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <AuthenticateRoute>
              <Cart />
            </AuthenticateRoute>
          }
        />
        <Route
          path="/shipment"
          element={
            <AuthenticateRoute>
              <Shipment />
            </AuthenticateRoute>
          }
        />
        <Route path={"*"} element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
