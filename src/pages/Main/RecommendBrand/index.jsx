import React from "react";
import * as Style from "./styles";
import { useNavigate } from "react-router-dom";
import nikeLogo from "../../../images/brands/nike.png";
import jordanLogo from "../../../images/brands/jordan.png";
import adidasLogo from "../../../images/brands/adidas.png";
import crocsLogo from "../../../images/brands/crocs.png";
import newbalanceLogo from "../../../images/brands/newbalance.png";
const brandArr = [
  {
    name: "조던",
    img: jordanLogo,
    width: "70px",
    height: "57px",
    marginTop: "8px",
  },
  {
    name: "뉴발란스",
    img: newbalanceLogo,
    width: "80px",
    height: "45px",
    marginTop: "12px",
  },
  {
    name: "아디다스",
    img: adidasLogo,
    width: "90px",
    height: "55px",
    marginTop: "5px",
  },
  {
    name: "크록스",
    img: crocsLogo,
    width: "80px",
    height: "80px",
    marginTop: "-2px",
  },
  {
    name: "나이키",
    img: nikeLogo,
    width: "110px",
    height: "50px",
    marginTop: "12px",
  },
];
const RecommendBrand = () => {
  const navigate = useNavigate();
  const goToDetail = (item) => {
    navigate(`/search?keyword=${item}`);
  };
  return (
    <Style.Container>
      <Style.ProductsContainer>
        <Style.TitleENG>Recommend Brand</Style.TitleENG>
        <Style.TitleKOR>추천 브랜드</Style.TitleKOR>
        {brandArr.map((item) => (
          <Style.BrandLogoContainer
            key={item.name}
            onClick={() => {
              goToDetail(item.name);
            }}
          >
            <Style.Img
              width={item.width}
              height={item.height}
              marginTop={item.marginTop}
              alt="로고"
              src={item.img}
            ></Style.Img>
          </Style.BrandLogoContainer>
        ))}
      </Style.ProductsContainer>
    </Style.Container>
  );
};

export default RecommendBrand;
