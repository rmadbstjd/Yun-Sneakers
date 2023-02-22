import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Join from "../pages/Join";
import Login from "../pages/Login";
import Main from "../pages/Main";
import ProductDetail from "../pages/Detail";
import Cart from "../pages/Cart";
import LikeProducts from "../pages/Like";
import Order from "../pages/MyPage/Order";
import Wish from "../pages/MyPage/Wish";
import Address from "../pages/MyPage/Address";
import Review from "../pages/MyPage/Review";
import Shipment from "../pages/Shipment";
import SearchPage from "../pages/Search";
import NewProducts from "../pages/NewProduct";
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/join" element={<Join />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mypage/order" element={<Order />} />
        <Route path="/mypage/address" element={<Address />} />
        <Route path="/mypage/wish" element={<Wish />} />
        <Route path="/mypage/review" element={<Review />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/products" element={<LikeProducts />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shipment" element={<Shipment />} />
        <Route path="/new" element={<NewProducts />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
