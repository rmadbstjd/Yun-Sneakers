import React from "react";
import * as Style from "./styles";
import { useNavigate } from "react-router-dom";
import { SiNike, SiJordan, SiNewbalance, SiAdidas } from "react-icons/si";
import { GiConverseShoe } from "react-icons/gi";
const brandArr = [
  {
    name: "나이키",
    img: <SiNike color={"white"} size={45} />,
  },
  { name: "조던", img: <SiJordan color={"white"} size={45} /> },
  { name: "뉴발란스", img: <SiNewbalance color={"white"} size={45} /> },
  { name: "아디다스", img: <SiAdidas color={"white"} size={45} /> },
  {
    name: "미하라 야스히로",
    img: <GiConverseShoe color={"white"} size={45} />,
  },
];
const Brand = () => {
  const navigate = useNavigate();
  const goToDetail = (item) => {
    navigate(`/search?keyword=${item}`);
  };

  return (
    <Style.Container>
      <Style.ProductsContainer>
        <Style.TitleENG>Recommend Brand</Style.TitleENG>
        <Style.TitleKOR>추천 브랜드</Style.TitleKOR>
        {brandArr?.map((item) => (
          <Style.BrandContainer
            key={item.name}
            onClick={() => {
              goToDetail(item.name);
            }}
          >
            {item.img}
            {item.name}
          </Style.BrandContainer>
        ))}
      </Style.ProductsContainer>
    </Style.Container>
  );
};

export default Brand;
