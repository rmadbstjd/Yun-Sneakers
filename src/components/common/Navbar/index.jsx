import React, { useEffect, useState } from "react";
import { BsFillPencilFill, BsFillCartFill } from "react-icons/bs";
import { GiConverseShoe } from "react-icons/gi";
import { FiSearch } from "react-icons/fi";
import { BsHeartFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { AiTwotoneShopping } from "react-icons/ai";
import * as Style from "./styles";
import { useNavigate } from "react-router-dom";
import Search from "../../Search";
import userInfoStore from "../../../store/userInfoStore";
import cartStore from "../../../store/cartStore";
import searchStore from "./../../../store/searchStore";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const Navbar = () => {
  const navigate = useNavigate();
  const { cart, nickName, userId } = userInfoStore();
  const { cartCount, initCartCount, plusCartCount } = cartStore();
  const { setSearchWord } = searchStore();
  const isLogin = localStorage.getItem("isLogin") === "true";
  const [token, setToken] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [admin] = useState("");
  const { data: cartProducts } = useQuery([userId], () => cart.getUserCarts());
  useEffect(() => {
    initCartCount();
    if (cartProducts) {
      plusCartCount(cartProducts.products.length);
    }
    setToken(localStorage.getItem("token"));
  }, [token, admin, cartProducts]);
  const handleLogin = async () => {
    navigate("/login");
  };
  const handleLogout = () => {
    axios({
      url: "https://weeklyrun.site/logout",
      method: "POST",
      withCredentials: "true",
    }).then((result) => {
      if (result.status === 200) {
        localStorage.setItem("isLogin", false);
        window.location.replace("/");
      }
    });
  };
  const clickToSearch = () => {
    setSearchWord(null);
    setShowSearch((prev) => !prev);
  };
  const updateScroll = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  };
  useEffect(() => {
    window.addEventListener("scroll", updateScroll);
  }, []);

  useEffect(() => {}, [nickName]);
  return (
    <div>
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
                navigate("/search");
                setShowSearch(false);
              }}
            />
            <Style.MyPage
              onClick={() => {
                navigate("/search");
                setShowSearch(false);
              }}
            >
              SHOP
            </Style.MyPage>
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
            <Style.MyPage
              onClick={() => {
                navigate("/mypage/order");
                setShowSearch(false);
              }}
            >
              MY PAGE
            </Style.MyPage>
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
            <Style.Products
              onClick={() => {
                navigate("/products");
                setShowSearch(false);
              }}
            >
              MY LIKE
            </Style.Products>
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
            <Style.ShoppingBag
              onClick={() => {
                navigate("/cart");
                setShowSearch(false);
              }}
            >
              {isLogin && <Style.Count>{cartCount}</Style.Count>}
              <Style.Products>MY CART</Style.Products>
            </Style.ShoppingBag>

            {
              <BsFillPencilFill
                size={28}
                style={{
                  marginTop: "10px",
                  marginRight: "10px",
                  cursor: "pointer",
                  display: "none",
                }}
                onClick={() => {
                  navigate("/new");
                  setShowSearch(false);
                }}
              />
            }
            {nickName && <Style.Nickname> {nickName}</Style.Nickname>}
            {!nickName && <Style.Nickname>GUEST</Style.Nickname>}
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
      {showSearch && <Search setShowSearch={setShowSearch} />}
    </div>
  );
};

export default Navbar;
