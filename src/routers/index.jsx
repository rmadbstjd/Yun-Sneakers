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
import NewProducts from "../pages/NewProduct";
import userInfoStore from "../store/userInfoStore";
import authenticate from "../hooks/authenticate";
import AuthenticateRoute from "./Authenticate";
const Router = () => {
  const { setNickName, setUserId } = userInfoStore();
  const isAuthenticated = localStorage.getItem("isLogin") === "true";
  useEffect(() => {
    authenticate(setNickName, setUserId);
  }, [setNickName, setUserId]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/join" element={<Join />} />
        <Route
          path="/login"
          element={<Login isAuthenticated={isAuthenticated} />}
        />
        <Route path="/new" element={<NewProducts />} />
        <Route path="/search" element={<SearchPage />} />
        <Route
          path="/mypage/*"
          element={
            <AuthenticateRoute isAuthenticated={isAuthenticated}>
              <MyPageRoute />
            </AuthenticateRoute>
          }
        />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route
          path="/products"
          element={
            <AuthenticateRoute isAuthenticated={isAuthenticated}>
              <Like />
            </AuthenticateRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <AuthenticateRoute isAuthenticated={isAuthenticated}>
              <Cart />
            </AuthenticateRoute>
          }
        />
        <Route
          path="/shipment"
          element={
            <AuthenticateRoute isAuthenticated={isAuthenticated}>
              <Shipment />
            </AuthenticateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
