import React from "react";
import * as Style from "./styles";
import Navbar from "../../components/common/Navbar/Container";
import { useNavigate } from "react-router-dom";
import Button from "../../components/common/button";
const NotFound = () => {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <Style.Container>
        <Style.Text>
          <Style.TextTitle>요청하신 페이지를 찾을수 없습니다.</Style.TextTitle>
          <Style.TextTitle>불편을 드려 죄송합니다.</Style.TextTitle>
          <Style.TextContent>
            방문하시려는 페이지의 주소가 잘못 입력되었거나
            <Style.TextContent>
              페이지의 주소가 변경 혹은 삭제되어 요청하신 페이지를 찾을 수
              없습니다.
            </Style.TextContent>
            입력하신 주소가 정확한지 다시 한번 확인해주시기 바랍니다.
          </Style.TextContent>
        </Style.Text>
        <Button
          style={{
            border: "none",
            width: "250px",
            height: "50px",
            background: "black",
            color: "white",
            hoverColor: "white",
            hoverBackground: "black",
          }}
          onClick={() => {
            navigate("/");
          }}
        >
          홈으로 가기
        </Button>
      </Style.Container>
    </>
  );
};

export default NotFound;
