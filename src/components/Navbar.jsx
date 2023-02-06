import React, { useEffect, useState } from "react";

import { BsFillPencilFill, BsFillCartFill } from "react-icons/bs";
import { GiConverseShoe } from "react-icons/gi";
import { FiSearch } from "react-icons/fi";
import { BsHeartFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import styles from "./css/Navbar.module.css";
import { useNavigate } from "react-router-dom";
import Search from "../components/Search";
import useStore from "../store";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const Navbar = () => {
  const navigate = useNavigate();
  const {
    cartCount,
    initCartCount,
    plusCartCount,
    setText,
    cart,
    nickName,
    userId,
  } = useStore();
  const isLogin = localStorage.getItem("isLogin") === "true";
  const [token, setToken] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [admin] = useState("");
  const {
    isLoading,
    error,
    data: cartProducts,
  } = useQuery([userId], () => cart.getCartsTest());
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
    console.log("로그아웃");
    axios({
      url: "http://localhost:3001/logout",
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
    setText(null);
    setShowSearch((prev) => !prev);
  };
  const updateScroll = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  };
  useEffect(() => {
    console.log("테스트");
    window.addEventListener("scroll", updateScroll);
  }, []);

  return (
    <div>
      <div
        className={
          scrollPosition > 100 ? styles.scrolledContainer : styles.container
        }
      >
        <div className={styles.navbarContainer}>
          <div
            className={styles.navbarLeftContainer}
            onClick={() => {
              navigate("/");
              setShowSearch(false);
            }}
          >
            <GiConverseShoe size={45} />
            <div className={styles.shopName}>Yun's Premium Sneakers</div>
          </div>
          <div className={styles.navbarRightContainer}>
            <FaUser
              className={styles.mypageImg}
              onClick={() => {
                navigate("/mypage");
                setShowSearch(false);
              }}
            />
            <div
              onClick={() => {
                navigate("/mypage");
                setShowSearch(false);
              }}
              className={styles.mypage}
            >
              MY PAGE
            </div>
            <BsHeartFill
              className={styles.heartImg}
              onClick={() => {
                navigate("/products");
                setShowSearch(false);
              }}
            />
            <div
              onClick={() => {
                navigate("/products");
                setShowSearch(false);
              }}
              className={styles.products}
            >
              MY LIKE
            </div>
            <BsFillCartFill
              className={styles.cartImg}
              size={20}
              onClick={() => {
                navigate("/cart");
                setShowSearch(false);
              }}
            />
            <div
              className={styles.shoppingBag}
              onClick={() => {
                navigate("/cart");
                setShowSearch(false);
              }}
            >
              {isLogin && <div className={styles.count}>{cartCount}</div>}
              <div className={styles.products}>MY CART</div>
            </div>

            {
              <BsFillPencilFill
                size={28}
                className={styles.pencilImg}
                onClick={() => {
                  navigate("/new");
                  setShowSearch(false);
                }}
              />
            }
            {nickName && <span className={styles.nickName}> {nickName}</span>}
            {!isLogin ? (
              <button onClick={handleLogin} className={styles.button}>
                Login
              </button>
            ) : (
              <button onClick={handleLogout} className={styles.button}>
                Logout
              </button>
            )}
            <FiSearch className={styles.search} onClick={clickToSearch} />
          </div>
        </div>
      </div>
      {showSearch && <Search setShowSearch={setShowSearch} />}
    </div>
  );
};

export default Navbar;
