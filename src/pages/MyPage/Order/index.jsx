import React from "react";
import * as Style from "./styles";
import OrderPageNavbar from "../../../components/OrderPageNavbar";
import MypageSide from "../../../components/MypageSide";
import Navbar from "./../../../components/common/Navbar/index";
const Order = () => {
  return (
    <>
      <Navbar />
      <Style.MyPageContainer>
        <MypageSide />
        <Style.MainContainer>
          <OrderPageNavbar />
        </Style.MainContainer>
      </Style.MyPageContainer>
    </>
  );
};

export default Order;
