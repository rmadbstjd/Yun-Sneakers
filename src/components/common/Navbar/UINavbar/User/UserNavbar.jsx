import React from "react";
import { FaUser } from "@react-icons/all-files/fa/FaUser";
import { BsHeartFill } from "@react-icons/all-files/bs/BsHeartFill";
import { FaShoppingCart } from "@react-icons/all-files/fa/FaShoppingCart";
import { AiTwotoneShopping } from "@react-icons/all-files/ai/AiTwotoneShopping";
import * as Style from "./styles";
import { useNavigate } from "react-router-dom";
const UserNavbar = ({
  setShowSearch,
  searchKeyword,
  sort,
  collectionName,
  priceOrder,
  setShowBar,
  cartCount,
}) => {
  const navigate = useNavigate();
  return (
    <>
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
      <Style.NavbarItemLayout
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
      </Style.NavbarItemLayout>
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
      <Style.NavbarItemLayout
        onClick={() => {
          navigate("/mypage/order");
          setShowSearch(false);
        }}
      >
        MY PAGE
      </Style.NavbarItemLayout>

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
      <Style.NavbarItemLayout
        onClick={() => {
          navigate("/products");
          setShowSearch(false);
        }}
      >
        MY LIKE
      </Style.NavbarItemLayout>

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

      <Style.NavbarItemLayout
        onClick={() => {
          navigate("/cart");
          setShowSearch(false);
        }}
      >
        <Style.Count>{cartCount}</Style.Count>
        MY CART
      </Style.NavbarItemLayout>
    </>
  );
};

export default UserNavbar;
