import React from "react";
import * as Style from "./styles";
import { GrClose } from "react-icons/gr";
import FilterContent from "../FilterContent";
const Filter = ({ setHamburger, setShow }) => {
  const closeHamburger = () => {
    setHamburger(false);
    setShow(true);
  };

  return (
    <Style.Container>
      <Style.NavbarContainer>
        <Style.NavbarTitle>필터</Style.NavbarTitle>
        <GrClose
          style={{
            width: "25px",
            height: "25px",
            margin: "18px 15px 0px 0px",
            cursor: "pointer",
          }}
          onClick={closeHamburger}
        />
      </Style.NavbarContainer>

      <div>
        <FilterContent />
      </div>
      <Style.Footer onClick={closeHamburger}>적용하기</Style.Footer>
    </Style.Container>
  );
};

export default Filter;
