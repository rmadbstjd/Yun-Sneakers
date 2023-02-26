import React from "react";
import * as Style from "./styles";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
const Arrow = ({ currentPage, setCurrentPage }) => {
  const plusCurrent = () => {
    if (currentPage >= 4) return;

    setCurrentPage((prev) => prev + 1);
  };
  const minusCurrent = () => {
    if (currentPage <= 1) return;
    setCurrentPage((prev) => prev - 1);
  };
  return (
    <Style.Container>
      <Style.Size>
        <Style.Left
          abled={currentPage === 1 ? false : true}
          onClick={minusCurrent}
        >
          <AiOutlineLeft></AiOutlineLeft>
        </Style.Left>
        <Style.Layout>
          <Style.Current> {currentPage} &nbsp; </Style.Current> &nbsp;/ &nbsp;4
        </Style.Layout>
        <Style.Right
          abled={currentPage === 4 ? false : true}
          onClick={plusCurrent}
        >
          <AiOutlineRight />
        </Style.Right>
      </Style.Size>
    </Style.Container>
  );
};

export default Arrow;
