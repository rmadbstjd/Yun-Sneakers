import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import cartStore from "../../../../store/cartStore";
import searchStore from "../../../../store/searchStore";
import userApi from "../../../../api/user";
import { useGetUserInfo } from "../../../../hooks/useGetUserInfo";
import UINavbar from "../UINavbar";
import { useGetUserCart } from "../../../../hooks/useGetUserCart";
import { useUpdateScroll } from "../../../../hooks/useUpdateScroll";
import CheckIsAdmin from "../../../../utils/checkIsAdmin";
const Navbar = ({ searchKeyword, sort, collectionName, priceOrder }) => {
  const navigate = useNavigate();
  const isAdmin = CheckIsAdmin();
  const { cartCount } = cartStore();
  const { setSearchWord, setShowBar, showNavbar, setShowNavbar } =
    searchStore();
  const [showSearch, setShowSearch] = useState(false);
  const { scrollPosition } = useUpdateScroll();
  const { nickName, userId } = useGetUserInfo();
  useGetUserCart(userId);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    userApi.logout();
  };

  const clickToSearch = () => {
    setSearchWord(null);
    setShowSearch((prev) => !prev);
    setShowNavbar(false);
  };
  if (isAdmin === false) return <div>에러 ㅋ</div>;
  return (
    <UINavbar
      showNavbar={showNavbar}
      scrollPosition={scrollPosition}
      setShowSearch={setShowSearch}
      navigate={navigate}
      isAdmin={isAdmin}
      searchKeyword={searchKeyword}
      sort={sort}
      collectionName={collectionName}
      priceOrder={priceOrder}
      setShowNavbar={setShowNavbar}
      setShowBar={setShowBar}
      cartCount={cartCount}
      nickName={nickName}
      userId={userId}
      handleLogin={handleLogin}
      handleLogout={handleLogout}
      clickToSearch={clickToSearch}
      showSearch={showSearch}
    />
  );
};

export default Navbar;
