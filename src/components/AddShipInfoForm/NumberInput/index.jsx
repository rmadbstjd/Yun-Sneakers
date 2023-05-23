import React from "react";
import * as Style from "./styles";
import { AiOutlineMinus } from "@react-icons/all-files/ai/AiOutlineMinus";
const NumberInput = ({
  title,
  first,
  middle,
  last,
  validateFirstPhoneNum,
  validateMiddlePhoeNum,
  validateLastPhoneNum,
}) => {
  return (
    <Style.Container>
      <Style.Title>{title}</Style.Title>
      <Style.Input type="text" value={first} onChange={validateFirstPhoneNum} />
      <AiOutlineMinus
        style={{ width: "15px", height: "15px", margin: "10px 1px 0px 3px" }}
      />
      <Style.Input
        type="text"
        value={middle}
        onChange={validateMiddlePhoeNum}
      />
      <AiOutlineMinus
        style={{ width: "15px", height: "15px", margin: "10px 1px 0px 3px" }}
      />
      <Style.Input type="text" value={last} onChange={validateLastPhoneNum} />
    </Style.Container>
  );
};

export default NumberInput;
