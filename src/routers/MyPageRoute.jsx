import React from "react";
import { Routes, Route } from "react-router-dom";
import OrderPage from "../pages/MyPage/Order/Container";
import WishPage from "../pages/MyPage/Wish/Container";
import AddressPage from "../pages/MyPage/Address/Container";
import Review from "../pages/MyPage/Review/Container";
import QnAPage from "../pages/MyPage/QnA/Container/index";
import NotFound from "../pages/NotFound";
const MyPageRoute = ({ isAuthenticated }) => {
  return (
    <Routes>
      <Route
        path="/review"
        element={<Review isAuthenticated={isAuthenticated} />}
      ></Route>
      <Route
        path="/order"
        element={<OrderPage isAuthenticated={isAuthenticated} />}
      ></Route>
      <Route
        path="/wish"
        element={<WishPage isAuthenticated={isAuthenticated} />}
      ></Route>
      <Route
        path="/address"
        element={<AddressPage isAuthenticated={isAuthenticated} />}
      ></Route>
      <Route
        path="/qna"
        element={<QnAPage isAuthenticated={isAuthenticated} />}
      ></Route>
      <Route path={"*"} element={<NotFound />} />
    </Routes>
  );
};

export default MyPageRoute;
