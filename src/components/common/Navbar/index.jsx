import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserCarts } from "../../../api/cart";
import { useNavigate } from "react-router-dom";
import userInfoStore from "../../../store/userInfoStore";
import cartStore from "../../../store/cartStore";
import searchStore from "./../../../store/searchStore";
import userApi from "../../../api/user";
import jwt_decode from "jwt-decode";

import Layout from "./Layout";
const Navbar = ({ searchKeyword, sort, collectionName, priceOrder }) => {
  const navigate = useNavigate();
  const { nickName, userId, setNickName, setUserId } = userInfoStore();
  const { cartCount, initCartCount, plusCartCount } = cartStore();
  const { setSearchWord, setShowBar, showNavbar, setShowNavbar } =
    searchStore();
  const { data: cartProducts } = useQuery(["cart", userId], () =>
    getUserCarts()
  );
  const [showSearch, setShowSearch] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const token = localStorage.getItem("accessToken");
  const info = token && jwt_decode(token);
  let { data: isAdmin } = useQuery(["admin"], () => userApi.isAdmin());
  isAdmin = isAdmin?.isAdmin;
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

  const updateScroll = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  };

  useEffect(() => {
    setNickName(info?.nickname || "GUEST");
    setUserId(info?.id);
  }, [nickName]);

  useEffect(() => {
    initCartCount();
    if (cartProducts) {
      plusCartCount(cartProducts?.products?.length);
    }
  }, [cartProducts]);

  useEffect(() => {
    window.addEventListener("scroll", updateScroll);
    return () => {
      window.removeEventListener("scroll", updateScroll);
    };
  }, []);

  return (
    <Layout
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
