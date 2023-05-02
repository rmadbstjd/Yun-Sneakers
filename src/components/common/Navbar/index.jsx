import React, { useEffect, useState } from "react";
import { FaShoppingCart } from "@react-icons/all-files/fa/FaShoppingCart";
import { AiFillFileAdd } from "@react-icons/all-files/ai/AiFillFileAdd";
import { RiQuestionAnswerFill } from "@react-icons/all-files/ri/RiQuestionAnswerFill";
import { GiConverseShoe } from "@react-icons/all-files/gi/GiConverseShoe";
import { FiSearch } from "@react-icons/all-files/fi/FiSearch";
import { BsHeartFill } from "@react-icons/all-files/bs/BsHeartFill";
import { FaUser } from "@react-icons/all-files/fa/FaUser";
import { AiTwotoneShopping } from "@react-icons/all-files/ai/AiTwotoneShopping";
import { RiFileEditFill } from "@react-icons/all-files/ri/RiFileEditFill";
import { useQuery } from "@tanstack/react-query";
import * as Style from "./styles";
import { useNavigate } from "react-router-dom";
import Search from "../../Search";
import userInfoStore from "../../../store/userInfoStore";
import cartStore from "../../../store/cartStore";
import searchStore from "./../../../store/searchStore";
import userApi from "../../../api/user";
import jwt_decode from "jwt-decode";
import ScrollToTop from "../../../utils/scrollToTop";
import { getUserCarts } from "../../../api/cart";
import Button from "../Button";
const Navbar = ({ searchKeyword, sort, collectionName, priceOrder }) => {
  const navigate = useNavigate();
  const { nickName, userId } = userInfoStore();
  const { cartCount, initCartCount, plusCartCount } = cartStore();
  const { setSearchWord, setShowBar, showNavbar, setShowNavbar } =
    searchStore();
  const isLogin = localStorage.getItem("isLogin") === "true";
  const token = localStorage.getItem("accessToken");
  const [showSearch, setShowSearch] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const info = token && jwt_decode(token);
  const [isAdmin] = useState(
    (info && info.id === process.env.REACT_APP_ADMIN_ID) || false
  );

  const { data: cartProducts } = useQuery([userId], () => getUserCarts());
  useEffect(() => {
    initCartCount();
    if (cartProducts) {
      plusCartCount(cartProducts?.products?.length);
    }
  }, [cartProducts]);
  const handleLogin = async () => {
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
    window.addEventListener("scroll", updateScroll);
  }, []);

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
                <FaShoppingCart
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
                {isAdmin
                  ? "관리자"
                  : nickName.length !== 0
                  ? nickName
                  : "GUEST"}
              </Style.Nickname>

              {!isLogin ? (
                <Button
                  border={"solid black 0px"}
                  width={"60px"}
                  height={"24px"}
                  borderRadius={"5px"}
                  margin={"10px 0px 0px 0px"}
                  background={"#fafafa"}
                  hoverFontWeight={"bolder"}
                  onClick={handleLogin}
                >
                  Login
                </Button>
              ) : (
                <Button
                  border={"solid black 0px"}
                  width={"60px"}
                  height={"24px"}
                  borderRadius={"5px"}
                  margin={"10px 0px 0px 0px"}
                  background={"#fafafa"}
                  hoverFontWeight={"bolder"}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
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
