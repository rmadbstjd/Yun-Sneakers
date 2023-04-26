import React, { useEffect, useState } from "react";
import { BsFillCartFill } from "react-icons/bs";
import { AiFillFileAdd } from "react-icons/ai";
import { RiQuestionAnswerFill } from "react-icons/ri";
import { GiConverseShoe } from "react-icons/gi";
import { FiSearch } from "react-icons/fi";
import { BsHeartFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { AiTwotoneShopping } from "react-icons/ai";
import { RiFileEditFill } from "react-icons/ri";
import * as Style from "./styles";
import { useNavigate } from "react-router-dom";
import Search from "../../Search";
import userInfoStore from "../../../store/userInfoStore";
import cartStore from "../../../store/cartStore";
import searchStore from "./../../../store/searchStore";
import { useQuery } from "@tanstack/react-query";
import jwt_decode from "jwt-decode";
import ScrollToTop from "../../../hooks/scrollToTop";
const Navbar = ({ searchKeyword, sort, collectionName, priceOrder }) => {
  const navigate = useNavigate();
  const { cart, nickName, userId, user } = userInfoStore();
  const { cartCount, initCartCount, plusCartCount } = cartStore();
  const { setSearchWord, setShowBar, showNavbar, setShowNavbar } =
    searchStore();
  const isLogin = localStorage.getItem("isLogin") === "true";
  const token = localStorage.getItem("accessToken");
  const [showSearch, setShowSearch] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const info = token && jwt_decode(token);
  const isAdmin = useState(
    (info && info.id === process.env.REACT_APP_ADMIN_ID) || false
  );

  const { data: cartProducts } = useQuery([userId], () => cart.getUserCarts());
  useEffect(() => {
    initCartCount();
    if (cartProducts) {
      plusCartCount(cartProducts.products.length);
    }
  }, [cartProducts]);
  const handleLogin = async () => {
    navigate("/login");
  };
  const handleLogout = () => {
    user.logout();
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
    window.addEventListener("scroll", updateScroll);
  }, []);

  useEffect(() => {}, [nickName]);

  return (
    <>
      <ScrollToTop />
      {showNavbar && (
        <Style.Container isScrolled={scrollPosition > 100 ? true : false}>
          <Style.NavbarContainer>
            <Style.NavbarLeftContainer
              onClick={() => {
                navigate("/");
                setShowSearch(false);
              }}
            >
              <GiConverseShoe size={45} />
              <Style.ShopName>Yun's Sneakers</Style.ShopName>
            </Style.NavbarLeftContainer>
            <Style.NavbarRightContainer>
              <AiTwotoneShopping
                style={{
                  marginTop: "10px",
                  marginRight: "3px",
                  cursor: "pointer",
                  width: "21px",
                  height: "21px",
                }}
                onClick={() => {
                  if (searchKeyword === undefined) {
                    navigate("/search");
                  } else {
                    navigate(
                      `/search?keyword=${searchKeyword}&sort=${sort}&collectionName=${collectionName}&priceOrder=${priceOrder}`
                    );
                    setShowSearch(false);
                    setShowBar(false);
                  }
                }}
              />
              <Style.MyPage
                onClick={() => {
                  if (searchKeyword === undefined) {
                    navigate("/search");
                  } else {
                    navigate(
                      `/search?keyword=${searchKeyword}&sort=${sort}&collectionName=${collectionName}&priceOrder=${priceOrder}`
                    );
                    setShowSearch(false);
                    setShowBar(false);
                  }
                }}
              >
                SHOP
              </Style.MyPage>
              {!isAdmin && (
                <FaUser
                  style={{
                    marginTop: "13px",
                    marginRight: "3px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    navigate("/mypage/order");
                    setShowSearch(false);
                  }}
                />
              )}
              {!isAdmin && (
                <Style.MyPage
                  onClick={() => {
                    navigate("/mypage/order");
                    setShowSearch(false);
                  }}
                >
                  MY PAGE
                </Style.MyPage>
              )}

              {!isAdmin && (
                <BsHeartFill
                  style={{
                    marginTop: "15px",
                    marginRight: "3px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    navigate("/products");
                    setShowSearch(false);
                  }}
                />
              )}
              {!isAdmin && (
                <Style.Products
                  onClick={() => {
                    navigate("/products");
                    setShowSearch(false);
                  }}
                >
                  MY LIKE
                </Style.Products>
              )}
              {!isAdmin && (
                <BsFillCartFill
                  style={{
                    marginTop: "10px",
                    marginRight: "3px",
                    cursor: "pointer",
                  }}
                  size={20}
                  onClick={() => {
                    navigate("/cart");
                    setShowSearch(false);
                  }}
                />
              )}
              {!isAdmin && (
                <Style.ShoppingBag
                  onClick={() => {
                    navigate("/cart");
                    setShowSearch(false);
                  }}
                >
                  {isLogin && <Style.Count>{cartCount}</Style.Count>}
                  <Style.Products>MY CART</Style.Products>
                </Style.ShoppingBag>
              )}
              {isAdmin && (
                <RiFileEditFill
                  size={19}
                  style={{
                    marginTop: "12px",
                    marginRight: "3px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    navigate("/admin/manage");
                    setShowSearch(false);
                  }}
                />
              )}
              {isAdmin && (
                <Style.Products
                  onClick={() => {
                    navigate("/admin/manage");
                    setShowSearch(false);
                  }}
                >
                  상품 관리
                </Style.Products>
              )}
              {isAdmin && (
                <RiQuestionAnswerFill
                  size={20}
                  style={{
                    marginTop: "11px",
                    marginRight: "3px",
                    cursor: "pointer",
                  }}
                />
              )}
              {isAdmin && (
                <Style.Products
                  onClick={() => {
                    navigate("/admin/qna");
                    setShowSearch(false);
                  }}
                >
                  Q&A
                </Style.Products>
              )}
              {isAdmin && (
                <AiFillFileAdd
                  size={20}
                  style={{
                    marginTop: "11px",
                    marginRight: "3px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    navigate("/admin/new");
                    setShowSearch(false);
                  }}
                />
              )}
              {isAdmin && (
                <Style.Products
                  onClick={() => {
                    navigate("/admin/new");
                    setShowSearch(false);
                  }}
                >
                  상품 추가
                </Style.Products>
              )}
              <Style.Nickname>
                {isAdmin === true
                  ? "관리자"
                  : nickName.length !== 0
                  ? nickName
                  : "GUEST"}
              </Style.Nickname>

              {!isLogin ? (
                <Style.Btn onClick={handleLogin}>Login</Style.Btn>
              ) : (
                <Style.Btn onClick={handleLogout}>Logout</Style.Btn>
              )}
              <FiSearch
                style={{
                  margin: "7px 2px 0px 10px",
                  width: "30px",
                  height: "30px",
                  cursor: "pointer",
                }}
                onClick={clickToSearch}
              />
            </Style.NavbarRightContainer>
          </Style.NavbarContainer>
        </Style.Container>
      )}
      {showSearch && <Search setShowSearch={setShowSearch} />}
    </>
  );
};

export default Navbar;
