import React from "react";
import { Routes, Route } from "react-router-dom";
import Order from "../pages/MyPage/Order/index";
import Wish from "../pages/MyPage/Wish/index";
import Address from "../pages/MyPage/Address/index";
import Review from "../pages/MyPage/Review/index";
import QnA from "../pages/MyPage/QnA/index";
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
      <Route
        path="/qna"
        element={<QnA isAuthenticated={isAuthenticated} />}
      ></Route>
      <Route path={"*"} element={<NotFound />} />
    </Routes>
  );
};

export default MyPageRoute;
