import React from "react";
import * as Style from "./styles";
import Navbar from "../../../components/common/Navbar/Container";
import HorizonLine from "../../../components/common/HorizonLine";
import Button from "../../../components/common/button";
const EmptyCartPrdoucts = ({ navigate }) => {
  return (
    <>
      <Navbar />
      <Style.NullProductContainer>
        <Style.NullProductContentLayout>
          <HorizonLine
            width={"98%"}
            border={"5px"}
            margin={"8% 0px 0px 0px"}
            color={"black"}
          />
          <Style.NullText>장바구니에 담긴 상품이 없습니다.</Style.NullText>
          <Style.NullBoxContainer>
            <Button
              style={{
                border: "solid gray 1px",
                width: "350px",
                height: "60px",
                padding: "20px",
                fontSize: "25px",
                color: "#3a3b3c",
                fontWeight: "bold",
                hoverBackground: "black",
                hoverColor: "white",
              }}
              onClick={() => {
                navigate("/");
              }}
            >
              CONTINUE SHOPPING
            </Button>
          </Style.NullBoxContainer>
          <HorizonLine
            width={"98%"}
            border={"3px"}
            color={"gray"}
            margin={"3% 0px 0px 0px"}
          />
        </Style.NullProductContentLayout>
      </Style.NullProductContainer>
    </>
  );
};

export default EmptyCartPrdoucts;
