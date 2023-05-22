import React, { useEffect, useState } from "react";
import { GiConverseShoe } from "@react-icons/all-files/gi/GiConverseShoe";
import { FiSearch } from "@react-icons/all-files/fi/FiSearch";
import { useQuery } from "@tanstack/react-query";
import { getUserCarts } from "../../../api/cart";
import { useNavigate } from "react-router-dom";
import * as Style from "./styles";
import SearchModal from "../Modal/SearchModal";
import userInfoStore from "../../../store/userInfoStore";
import cartStore from "../../../store/cartStore";
import searchStore from "./../../../store/searchStore";
import userApi from "../../../api/user";
import ScrollToTop from "../../../utils/scrollToTop";
import Button from "../button";
import jwt_decode from "jwt-decode";
import AdminNavbar from "./AdminNavbar/AdminNavbar";
import UserNavbar from "./UserNavbar/UserNavbar";

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
    <>
      <ScrollToTop />
      {showNavbar && (
        <Style.Container isScrolled={scrollPosition > 100}>
          <Style.NavbarContainer>
            <Style.NavbarLeftContainer
              onClick={() => {
                navigate("/");
                setShowSearch(false);
              }}
            >
              <GiConverseShoe
                size={45}
                style={{ marginLeft: "6px", marginRight: "6px" }}
              />
              <Style.ShopName
                onClick={() => {
                  navigate("/");
                  setShowSearch(false);
                }}
              >
                Yun'Sneakers
              </Style.ShopName>
            </Style.NavbarLeftContainer>

            <Style.NavbarRightContainer>
              {isAdmin ? (
                <AdminNavbar
                  navigate={navigate}
                  setShowSearch={setShowSearch}
                />
              ) : (
                <UserNavbar
                  searchKeyword={searchKeyword}
                  sort={sort}
                  collectionName={collectionName}
                  priceOrder={priceOrder}
                  setShowSearch={setShowSearch}
                  setShowNavbar={setShowNavbar}
                  setShowBar={setShowBar}
                  cartCount={cartCount}
                />
              )}
              {<Style.Nickname>{nickName}</Style.Nickname>}
              {!userId ? (
                <Button
                  style={{
                    border: "solid black 0px",
                    width: "60px",
                    height: "24px",
                    borderRadius: "5px",
                    margin: "10px 0px 0px 0px",
                    background: "#fafafa",
                    hoverFontWeight: "bolder",
                  }}
                  onClick={handleLogin}
                >
                  LOGIN
                </Button>
              ) : (
                <Button
                  style={{
                    border: "solid black 0px",
                    width: "60px",
                    height: "24px",
                    borderRadius: "5px",
                    margin: "10px 0px 0px 0px",
                    background: "#fafafa",
                    hoverFontWeight: "bolder",
                  }}
                  onClick={handleLogout}
                >
                  LOGOUT
                </Button>
              )}
              <Style.SearchIconContainer onClick={clickToSearch}>
                <FiSearch
                  style={{
                    margin: "5px 2px 0px 10px",
                    width: "30px",
                    height: "30px",
                    cursor: "pointer",
                  }}
                />
              </Style.SearchIconContainer>
            </Style.NavbarRightContainer>
          </Style.NavbarContainer>
        </Style.Container>
      )}
      {showSearch && (
        <SearchModal
          searchKeyword={searchKeyword}
          sort={sort}
          collectionName={collectionName}
          priceOrder={priceOrder}
          setShowSearch={setShowSearch}
          setShowNavbar={setShowNavbar}
          setShowBar={setShowBar}
        />
      )}
    </>
  );
};

export default Navbar;
