import React from "react";
import * as Style from "./styles";
import { useNavigate } from "react-router-dom";
const CartModal = () => {
  const navigate = useNavigate();
  const goCartPage = () => {
    navigate("/cart");
  };
  return (
    <Style.Modal>
      <Style.Container>
        <div>장바구니에 추가되었습니다.</div>
        <Style.Btn onClick={goCartPage}>바로가기</Style.Btn>
      </Style.Container>
    </Style.Modal>
  );
};

export default CartModal;
