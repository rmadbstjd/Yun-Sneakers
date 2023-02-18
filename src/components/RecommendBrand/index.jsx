import React from "react";
import styles from "./RecommendBrand.module.css";
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
    <div className={styles.container}>
      <div className={styles.productsContainer}>
        <div className={styles.new}>Recommend Brand</div>
        <div className={styles.new2}>추천 브랜드</div>
        {brandArr.map((item, index) => (
          <div
            key={index}
            className={styles.brandContainer}
            onClick={() => {
              goToDetail(item.name);
            }}
          >
            {item.img}
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Brand;
