import React from "react";
import { Routes, Route } from "react-router-dom";
import Order from "../pages/MyPage/Order";
import Wish from "../pages/MyPage/Wish";
import Address from "../pages/MyPage/Address";
import Review from "../pages/MyPage/Review";
const MyPageRoute = ({ isAuthenticated }) => {
  return (
    <Routes>
      <Route
        path="/review"
        element={<Review isAuthenticated={isAuthenticated} />}
      ></Route>
      <Route
        path="/order"
        element={<Order isAuthenticated={isAuthenticated} />}
      ></Route>
      <Route
        path="/wish"
        element={<Wish isAuthenticated={isAuthenticated} />}
      ></Route>
      <Route
        path="/address"
        element={<Address isAuthenticated={isAuthenticated} />}
      ></Route>
    </Routes>
  );
};

export default MyPageRoute;
